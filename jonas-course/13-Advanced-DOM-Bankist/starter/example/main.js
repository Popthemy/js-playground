const randInt = (min, max) => Math.trunc(Math.random() * (max - min + 1) + min);

const randColor = () =>`rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;
;

const colorBox = document.querySelector('.color-box');
let colorValue;

document.querySelector('.change-color').addEventListener('click', function () {
  
  const color2 = randColor();
  const color1 = randColor();
  console.log('was pressed', color1,color2);
  
  colorBox.style.background = `linear-gradient(to left, ${color1}, ${color2})`;
});
