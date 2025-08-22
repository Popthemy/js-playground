'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const headerNav = document.querySelector('.nav');
const headerNavLink = document.querySelectorAll('.nav__link');
const headerNavLinks = document.querySelector('.nav__links');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// open modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// implement smooth scrolling
// first method
btnScrollTo.addEventListener('click', function (e) {
  // get coordinate including x,y, height , width on the page
  const section1Coordinate = section1.getBoundingClientRect();
  const btnScrollToCoordinate = e.target.getBoundingClientRect(); //btnScrollTo.getBoundingClientRect();
  // y : is always relative to the view port
  // console.log(
  //   'btnScrollTo / section1Coordinate',
  //   btnScrollToCoordinate,
  //   section1Coordinate
  // );

  // get scroll position
  // pageYoffset is the distance from the top of the page to the current position
  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  // scrolling
  // first arg is left: add both rect left and window x to get the left position
  //second arg is top: add both top and pagYOffset to get the distance from the top of the page
  // note: getBoundingCLientReact Left is relative to view port
  // PageXOffset is from the top of the page
  // we also use the coordinate of the section we want to move to on the page

  // console.log(
  //   `left ${section1Coordinate.left}  ${window.pageXOffset},
  //     top : ${section1Coordinate.top}  ${window.pageYOffset}
  //   }`
  // );
  // window.scrollTo(
  //   section1Coordinate.left + window.pageXOffset,
  //   section1Coordinate.top + window.pageYOffset
  // )
  // window.scrollTo({
  //   left: section1Coordinate.left + window.pageXOffset,
  //   top: section1Coordinate.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  // option 2 for scrolling applicable in modern browser
  section1.scrollIntoView({ behavior: 'smooth' });
});

// header scrolling
// headerNavLink.forEach(btn => {
//   btn.addEventListener('click', function (e) {
//     e.preventDefault();

//     // this approach isn't scalable
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//     // this.style.background = randColor();
//     // to stop propagation: this will cause the action to be handled only once during target phase
//     // e.stopPropagation();
//   });
// });

// Event Delegation: help us to listen on the parent element site of event target to handle event that is specific to the target .
// to perform delegation: 1.Add event listener to the parent 2. Determine the target (e.target) and what the action to perform is.

headerNavLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // return quick when we click outside the button
  if (!clicked) return;
  console.log(clicked);

  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  const dataTab = clicked.dataset.tab;

  tabsContent.forEach(el => {
    el.classList.contains(`operations__content--${dataTab}`);

    if (el.classList.contains(`operations__content--${dataTab}`)) {
      el.classList.add('operations__content--active');
    } else {
      el.classList.remove('operations__content--active');
    }
  });
});

// menu animation
// mouseenter doesn't bubble and the opposite if mouseleave (used to undo mouse enter action)
// mouseover does bubble with opposite mouseout

const nav = document.querySelector('.nav');
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // find all the other nav link nav child element
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// do to undo use mouseout
// passing argument into the handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

// undo effect of mouseover
nav.addEventListener('mouseout', handleHover.bind(1));

/*
// selecting document
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// selecting element
console.log(document.querySelector('.btn')); // select the first btn class on the page, here we are searching by class (.) , id uses (#)

console.log(document.querySelectorAll('.btn')); // selects all the btn

console.log(document.getElementById('section--3'));
console.log(document.getElementsByClassName('slide'));

// creating, selecting and inserting elements
const header = document.querySelector('header');
// using .insertAdjacentHtml

const html = `
<div class="cookie-message">
  <p>We use cookies to improve functionality and analytics.</p>
  <button class="btn btn--close-cookie">Got it!</button>
</div>`;
// header.insertAdjacentHTML("afterEnd", html);

// removing element
// const cookieMessage = document.querySelector('.cookie-message');
const btnCCookieClose = document.querySelector('.btn--close-cookie');

btnCCookieClose.addEventListener('click', function (){
  console.log('pressed');
  cookieMessage.remove();
})

// using create element
const cookieMessage = document.createElement('div')
cookieMessage.classList.add('cookie-message')
// use either of these 2 to add text to it
// cookieMessage.textContent = `
// <p> We use cookies to improve functionality and analytics.</p>
//   <button class="btn btn--close-cookie">Got it!</button>`;
cookieMessage.innerHTML = `
<p> We use cookies to improve functionality and analytics.</p>
  <button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(cookieMessage) // add as the first child element
header.append(cookieMessage) // add as the last child element

// to apply same element to show twice
// header.prepend(cookieMessage.cloneNode(true)) // add as the last child element

// to add as sibling
// header.after(cookieMessage) // add as the last child element
// header.before(cookieMessage) // add as the last child element

// remove element
const btnCookie = document.querySelectorAll('.btn--close-cookie')
btnCookie.forEach(btn=> btn.addEventListener('click', function () {
  console.log('pressed');
  cookieMessage.remove();
  // old way of removing element through DOM traversing
  cookieMessage.parentElement.removeChild(cookieMessage);
}));


// styles 
cookieMessage.style.backgroundColor = '#34383d';
console.log(getComputedStyle(cookieMessage));
console.log(getComputedStyle(cookieMessage).color); // get a targeted style

// set css variable (variable specified from css root) from js 
document.documentElement.style.setProperty('--color-primary', 'white')

// attribute
const logo = document.querySelector('.nav__logo')
console.log(logo.alt)
console.log(logo.src) // get the absolute url to the image
console.log(logo.getAttribute('src')) // get relative attr

// we can only access standard attribute that way
console.log(logo.getAttribute('designer'));

// to set the attribute
logo.alt = 'Simplistic logo for bankist'
console.log(logo.alt)

// to get data from data attr (attr that start with data);
console.log(logo.dataset.logoNumber) // used to store data in the html template

// working with class use .add(), .toggle(), .remove(), .contain()


// how to get client viewport height and width
console.log(
  'height/ width',
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);

// implement smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// first method
btnScrollTo.addEventListener('click', function (e) {
  // get coordinate including x,y, height , width on the page
  const section1Coordinate = section1.getBoundingClientRect();
  const btnScrollToCoordinate = e.target.getBoundingClientRect(); //btnScrollTo.getBoundingClientRect();
  // y : is always relative to the view port
  // console.log(
  //   'btnScrollTo / section1Coordinate',
  //   btnScrollToCoordinate,
  //   section1Coordinate
  // );

  // get scroll position
  // pageYoffset is the distance from the top of the page to the current position
  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  // scrolling
  // first arg is left: add both rect left and window x to get the left position
  //second arg is top: add both top and pagYOffset to get the distance from the top of the page
  // note: getBoundingCLientReact Left is relative to view port
  // PageXOffset is from the top of the page
  // we also use the coordinate of the section we want to move to on the page

  // console.log(
  //   `left ${section1Coordinate.left}  ${window.pageXOffset},
  //     top : ${section1Coordinate.top}  ${window.pageYOffset}
  //   }`
  // );
  // window.scrollTo(
  //   section1Coordinate.left + window.pageXOffset,
  //   section1Coordinate.top + window.pageYOffset
  // )
  // window.scrollTo({
  //   left: section1Coordinate.left + window.pageXOffset,
  //   top: section1Coordinate.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  // option 2 for scrolling applicable in modern browser
  section1.scrollIntoView({ behavior: smooth });
});

// event: are signal generated by a node on the DOM tree e.g mouse click 
// check MDN js event reference for full event list
// listening using eventlistener

const h1 = document.querySelector('h1');

const alertH1 = () => alert('Reading h1 element content tl:dr');

h1.addEventListener('mouseenter', alertH1)
// how to remove event so it only happen once
h1.removeEventListener('mouseenter', alertH1);


Event propagation - Capturing and Bubbling
When a click event occur it is generated at the root of the DO<
- Capturing phase : here the event travel down to the target element passing through the parent element
- Target phase : when the event get to its target element
- Bubbling phase : event bubble fro the target to the event root
This study is important to handle event during either capturing and bubbling phase.
Not all even have this phases
AddEvent listener listens to event that occur during target and bubbling phase by default.
to make addEvent listener respond to event during the capturing phase set the third parameter of the method to true



// random color generator

const randNumber = (min,max) => Math.floor(Math.random() * (max-min +1) +min);

const randColor = () => {
return `rgb(${randNumber(0, 255)}, ${randNumber(0, 255)}, ${randNumber(0, 255)})`}
;

console.log(randColor());

const headerNav = document.querySelector('.nav');
const headerNavLink = document.querySelectorAll('.nav__link');
const headerNavLinks = document.querySelector('.nav__links');

headerNavLink.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    this.style.background = randColor();
    // to stop propagation: this will cause the action to be handled only once during target phase
    // e.stopPropagation();
  });
})

headerNavLinks.addEventListener('click' , function(e){
  e.preventDefault();
  this.style.background = randColor();
})
headerNav.addEventListener('click' , function(e){
  e.preventDefault();
  this.style.background = randColor();
})



// Dom Traversing : searching the node of a dom either from child or parent node

const h1 = document.querySelector('h1');

console.log(h1.querySelectorAll('.highlight')); // h1 is the parent node
// get every node : a node can be anything e.g comment, element, document, ....
console.log(h1.childNodes) // give a list of all the nodes
console.log(h1.children) // get the child element

// selecting the first and last element
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';

// going upwards: parents
console.log(h1.parentElement);
console.log(h1.parentNode);

// closest find the parent element nearest
h1.closest('.header').style.background = 'var(--gradient-primary)';
// when the element which we call the closest matches the same element it is returned
h1.closest('h1').style.background = 'var(--gradient-secondary)';

// we can only access the next and previous sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// get parent from child
console.log(h1.parentNode.children);
[...h1.parentElement.children].forEach(el =>{
  if (el !== h1)el.style.transform = 'scale(0.5)'
})



// intersection observer api: helps observer how a certain element intersect another or the viewport
// the element to be intersected is specified in the option while the action is in the call back function
// both the option and callback are argument to the observer intersection method

const section2 = document.querySelector('#section--2');

// call back get called no matter if we are scrolling up or down
const obsCallback = function(entries, observer){
  entries.forEach(entry=> console.log(entry));
}

const obsOption = {
  root: null,// select what the target will intersect
  threshold: [0, 0.2] // at what point should they intersect either going in or out
};
const observer = new IntersectionObserver(obsCallback, obsCallback);
observer.observe(section1); // specify the target element
*/

// apply intersection effect to nav bar
const header = document.querySelector('.header');
const navHeight = headerNav.getBoundingClientRect().height;

const headerCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    // apply when we are no showing the header
    headerNav.classList.add('sticky');
  } else {
    // apply when we are showing header
    headerNav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(headerCallback, {
  root: null, // viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`, // the will be applied after the target element. if the height is 100 before it will 100 + root margin
});

headerObserver.observe(header);

// apply intersection effect to section

const sections = document.querySelectorAll('.section');

const sectCallback = function (entries, sectObserver) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  //unobserve after first loading
  sectObserver.unobserve(entry.target);
};

const sectObserver = new IntersectionObserver(sectCallback, {
  root: null,
  threshold: 0.2,
});

sections.forEach(section => {
  // section.classList.add('section--hidden');
  sectObserver.observe(section);
});

// lazy loading images with the data-src attr
const imgTargets = document.querySelectorAll('img[data-src]');

const imageCallback = function (entries, observer) {
  const [entry] = entries;
  const target = entry.target;
  console.log(target);

  if (!entry.isIntersecting) return;

  // swap data-src image for src and remove blur
  target.src = target.dataset.src;
  // target.setAttribute('src', target.dataset.src);

  // after the set occurred in the background and emit a `load` signal we can use to remove the blur
  // if we don't remove after the blur then the image won't be the standard one when we remove the blur
  // the load event fires when external source content are loaded completely

  
  target.addEventListener('load', function () {
    target.classList.remove('lazy-img');
  });

  observer.unobserve(target);
};

const imgObserver = new IntersectionObserver(imageCallback, {
  root: null,
  threshold: 0.2,
});

imgTargets.forEach(image => imgObserver.observe(image));

// slides
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');

  let curSlide = 0;
  const maxSlide = slides.length - 1;
  const dotContainer = document.querySelector('.dots');

  // insert the dot
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(function (s) {
      s.classList.remove('dots__dot--active');

      // add active to the single slide
      document
        .querySelector(`.dots__dot[data-slide="${slide}"`)
        .classList.add('dots__dot--active');
    });
  };

  const goToSlide = function (slideNum) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - slideNum)}%)`;
    });
    activateDots(slideNum);
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);

    // activate for default slide
    activateDots(0);
  };

  init();

  // event listeners
  // event delegation to show slide based on the number of circle clicked
  dotContainer.addEventListener('click', function (e) {
    // console.log(this)
    if (!e.target) return;

    const target = e.target;
    goToSlide(e.target.dataset.slide);
  });

  btnRight.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e.key);
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
    // operation chaining
    e.key === 'ArrowLeft' && prevSlide();
  });

  btnLeft.addEventListener('click', prevSlide);
};

slider(); // keep out code un-polluted

// lifecyle DOM events
// The  events that happened right from the time an event got accessed to when they are closed by the user.
// first event: the DOMcontentLoaded happen when the entire html has been completely parsed
// it doesn't wait for wait external resources and images to be loaded. just html and js 

document.addEventListener('DOMContentLoaded', function(e){
  console.log(e);
});

// load event: fired by window when html or image or other external resources are loaded
window.addEventListener('load', function(e) {
  console.log('page fully load', e)
})

// beforeload: created immediately before a user leaves the page

// window.addEventListener('beforeunload', function(e){
//   // beforeunload can be used to ask user if they are sure they want to leave the page
//   e.preventDefault(); // some page require it 
//   console.log(e);
//   e.returnValue = '';

// })

// this is an HTML 5 feature
// diff ways of loading the script from the head and the body
// regular way but the end is the best for optimal
// async: the  async attr, only make send in the end. use when order of script execution doesn't matters
// takes: the defer attr, only make send in the end. use when order of script execution matters



// 

