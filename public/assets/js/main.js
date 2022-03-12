"use strict";

// import * as IntersectionObserver from "./api/intersectionObserver";

// import { headerObserver } from "./api/intersectionObserver";

// MENU

const menu = document.querySelector(".menu");
const header = document.querySelector("header");
const mobileNav = document.querySelector("nav.mobile");
const cards = document.querySelector(".cards");

menu.addEventListener("click", function (e) {
  // For Menu Animation
  this.classList.toggle("active");
  // To make header active
  header.classList.toggle("active");
  // To hide mobile navigation
  mobileNav.classList.toggle("hidden");
});

// SLIDER

const slider = document.querySelector(".slider");
// console.log(Array.from(slider.children)[0].dataset.test);

const slides = slider?.querySelectorAll(".slide");

slides?.forEach((slide, index) => {
  // console.log(slide, index);
  slide.style.transform = `translateX(${index * 100}%)`;
  // console.log(slide);
});

let currSlide = 0;
const maxSlide = slides?.length - 1;

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const moveToNext = function (e) {
  if (currSlide === maxSlide) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  slides.forEach((slide, index) => {
    slide.style.transform = `translatex(${(index - currSlide) * 100}%)`;
  });
};

const moveToPrev = function (e) {
  if (currSlide === 0) {
    currSlide = maxSlide;
  } else {
    currSlide--;
  }
  slides.forEach((slide, index) => {
    slide.style.transform = `translatex(${(index - currSlide) * 100}%)`;
  });
};

next?.addEventListener("click", moveToNext);

prev?.addEventListener("click", moveToPrev);

//////// // INTERSECTION OBSERVER

// const gridHero = document.querySelector(".grid-hero");
// const title = document.querySelector(".grid-hero .heading");
// console.log(title);

// const options = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 1.0,
// };

// const displayGridHero = function (changes) {
//   // entries.forEach((entry) => {
//   //   console.log(entry);
//   // });
//   console.log(changes.length);
//   changes.forEach((change) => {
//     console.log(change);
//     if (change.intersectionRatio > 0.1) {
//       const figure = change.target.querySelector("img");
//       console.log(figure);
//       figure.classList.remove("invisible");
//       figure.classList.add("visible");
//     }
//   });
// };

// const observer = new IntersectionObserver(displayGridHero, options);

// observer.observe(gridHero);

// HEADER OBSERVER

// const header = document.querySelector(".header");

const headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: "0px",
};

const makeHeaderSticky = function (changes, observer) {
  const change = changes[0];

  console.log(change);
  console.log(change.isIntersecting);

  if (!change.isIntersecting) {
    header.classList.add("stickyHeader");
  } else {
    header.classList.remove("stickyHeader");
  }
};

const sliderObserver = new IntersectionObserver(
  makeHeaderSticky,
  headerOptions
);

if (slider) sliderObserver.observe(slider);

// // SECTION OBSERVER

// const hiddenSections = document.querySelectorAll(
//   "main section:not(:first-child)"
// );

// const displaySections = function (changes) {
//   const change = changes[0];

//   console.log(change);
//   console.log(change.isIntersecting);

//   if (!change.isIntersecting) return;

//   // change.target.style.visibility = "visible";
//   change.target.classList.remove("invisible");

//   change.target.classList.add("visible");

//   sectionObserver.unobserve(change.target);
// };

// const sectionObserver = new IntersectionObserver(displaySections, {
//   root: null,
//   threshold: 0.6,
// });

// hiddenSections.forEach((section) => {
//   console.log(section);
//   // section.style.visibility = "hidden";
//   section.classList.add("invisible");

//   sectionObserver.observe(section);
// });

// console.log(hiddenSections);

// CHECK AND RUN THIS ONLY IF WORKING ON FRONTEND. THIS WILL NOT WORK ON NODE
console.log(window.location.href);
const frontend =
  window.location.href.indexOf("http://127.0.0.1:5500/shop.html") > -1;
console.log(frontend);

if (frontend) {
  const opticianProducts = fetch(
    "http://localhost:8010/proxy/wp-json/wc/store/products"
  )
    .then((response) => response.json())
    .then((products) => {
      const template = document.querySelector("template");
      console.log(products);
      products.forEach((product, i) => {
        const img = product.images[0].src;

        const newCard = template.content.cloneNode(true).children[0];

        let originalImage = newCard.querySelector("img");
        let productName = newCard.querySelector(".card__product-name");
        let brand = newCard.querySelector(".card__brand");
        let description = newCard.querySelector(".card__description");
        let price = newCard.querySelector(".card__price");

        originalImage.src = product.images[3].src;
        productName.textContent = product.name;
        brand.textContent = "R Kumar";
        description.innerHTML = product.description;
        price.textContent = `${product.prices.currency_symbol} ${product.prices.price}`;
        // console.log(originalImage);
        console.log(newCard);

        // console.log(product.images[0].src);
        cards.appendChild(newCard);
      });
    });
}

// console.log(products);
