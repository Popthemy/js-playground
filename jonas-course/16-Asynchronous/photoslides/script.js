'use-strict'

const imageContainer = document.querySelector(".images");
const img = imageContainer.querySelector("img");
const btn = imageContainer.querySelector(".btn-slideshow");
const aud = imageContainer.querySelector("audio");


const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    img.style.transform = "translateX(0)";
    img.src = imgPath;
    img.addEventListener("load", function () {
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error(`Couldn't load image`+img.src));
    });
  });
};

const selectImage = () => `img/img_${Math.floor(Math.random() * 12) + 1}.jpg`;

let slideShowInterval = null;

btn.addEventListener("click", function () {
  try{
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      aud.pause();
      clearInterval(slideShowInterval);
      slideShowInterval = null;
      btn.textContent = "Start Slideshow Display";

    } else {
      slideShowInterval = setInterval(async() => {
        const img =  await createImage(selectImage());
      }, 2000);

      btn.classList.add("active");
      btn.textContent = "stop....";
      aud.play();
      aud.volume = 0.5;
    }
  } catch(err){
    console.error(err)
  }
});

// createImage("img/img_1.jpg");
// const slideShow = async function()
