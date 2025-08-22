'use strict';

// Create class for workout (parent) and cycling and running (both as child class)

class Workout {
  id = (Date.now() + '').slice(-10);
  date = new Date();
  clicks= 0;

  constructor(distance, duration, coords) {
    this.distance = distance; //km
    this.duration = duration; // mins
    this.coords = coords; // [lat ,lng]
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }

  click(){
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;

    // set the value
    this.calcPace();
    // inherited from parent class and set in child class
    this._setDescription()
  }

  calcPace() {
    this.pace = this.duration / this.distance; // min/km
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSPeed();
    // inherited from parent class, set in child class
    this._setDescription();
  }

  calcSPeed() {
    this.speed = this.distance / (this.duration / 60); // km/hr
    return this.speed;
  }
}

const run1 = new Running([8.55, 6.55], 120, 30, 45);
const cycle1 = new Cycling([8.55, 6.55], 120, 30, 45);
console.log(run1, cycle1);

// Application Architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13
  #workouts = [];

  constructor() {
    this._getPosition();

    // local storage
    this._getLocalStorage();

    // add event listeners
    // listens to the `Submit` event on the form
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField.bind(this));

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // get call on success
        function () {
          alert('Could not get your location');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coord = [latitude, longitude];

    console.log(this);

    this.#map = L.map('map').setView(coord, this.#mapZoomLevel); // the second parameter is the zoom level
    // const currentLocationLink = `https://www.google.com/maps/@${latitude},${longitude}`;

    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: `© OpenStreetMap Contributors. Tiles courtesy of 
                    Humanitarian OpenStreetMap Team (HOT)`,
      maxZoom: 20,
    }).addTo(this.#map);

    // L.circleMarker(coord, {
    //   radius: 10,
    //   color: 'red',
    //   fillColor: '#f03',
    //   fillOpacity: 0.5,
    // })
    //   .addTo(map)
    //   .bindPopup('You are here');

    // add tracker to map on click event
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(workout => this._renderWorkoutMarker(workout) )

  }

  _showForm(mapE) {
    this.#mapEvent = mapE;

    // show form when user click the map
    form.classList.remove('hidden');
    // focus on the distance field so user can input
    inputDistance.focus();
  }

  _hideForm(){

    const removeFocus = (...fields)=> fields.forEach(field => field.blur())
    // clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // to use smooth animation 
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(()=> form.style.display = 'grid', 1000);
   
    removeFocus(inputDistance,inputDuration,inputCadence,inputElevation);
  }

  _toggleElevationField(e) {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // function to validate fields
    const validateInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // adding new workout:
    //1. Take input
    const type = inputType.value;
    const duration = +inputDuration.value;
    const distance = +inputDistance.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //validate input and take input for specific workout field
    if (type === 'running') {
      const cadence = +inputCadence.value;

      if (
        !validateInputs(cadence, duration, distance) ||
        !allPositive(cadence, duration, distance)
      ) {
        return alert(`Input must be positive numbers greater then 0!`);
      }
      // create new workout(running)
      workout = new Running([lat, lng], distance, duration, cadence);
    };

    if (type === 'cycling') {
      const elevGain = +inputElevation.value;

      if (
        !validateInputs(elevGain, duration, distance) ||
        !allPositive(duration, distance)
      ) {
        return alert(`Input must be positive numbers greater then 0!`);
      }
      // create new workout(running)
      workout = new Cycling([lat, lng], distance, duration, elevGain);
    }

    // add workout to Array
    this.#workouts.push(workout);

    // Display Maker
    this._renderWorkoutMarker(workout);

    // add workout to array 
    this._renderWorkout(workout);

    // hide form 
    this._hideForm();

    // add workout to localstorage
    this._setLocalStorage();
  }


  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxwidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}-popup`,
        })
      )
      .setPopupContent(`${workout.description}`)
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            } </span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          
    `;

    if (workout.type === 'running'){
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${
             workout.pace.toFixed(1)
            } </span>
            <span class="workout__unit">'min/km' </span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;
    }
    if (workout.type === 'cycling'){
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;
    };

    form.insertAdjacentHTML('afterend', html)
  };

  _moveToPopup(e){
    const workoutEl = e.target.closest('.workout');
    
    if (!workoutEl) return;
    
    const workout = this.#workouts.find(workout => workout.id === workoutEl.dataset.id )

    this.#map.setView(workout.coords, this.#mapZoomLevel,{
      animate:true, pan:{duration:1,}
    });
    workout.click(); // this get lost when we retrieve object from localstorage
  }

  _setLocalStorage(){
    // key value paris
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  };

  _getLocalStorage(){
    // retrieve data from local storage and convert to object
    const data = JSON.parse(localStorage.getItem('workouts'));
    if(!data) return;

    // this.#workouts = data;
    // add the coord retrieved from localstorage to list
    // this.#workouts.forEach(workout => this._renderWorkout(workout));
    // console.log(this.#workouts)

    data.forEach(workout => {
      const type = workout.type;
      const duration = workout.duration;
      const distance = workout.distance;
      const coord = workout.coords ;

      if (type === 'running'){
        workout = new Running(coord, distance, duration, workout.cadence);
      };
      if (type === 'cycling'){
        workout = new Cycling(coord, distance, duration, workout.elevGain);
      };
      this.#workouts.push(workout)
    });

    this.#workouts.forEach(workout=> this._renderWorkout(workout));

    console.log(this.#workouts)
  
  }

  resetLocalStorage(){
    localStorage.removeItem('workouts')
    location.reload()
  }
}

const app = new App();
