"use strict";

export const gridHero = document.querySelector(".grid-hero");
export const title = document.querySelector(".grid-hero .heading");
console.log(gridHero, title);

const options = {
  root: gridHero,
  rootMargin: "0px",
  threshold: 1.0,
};

export const gridObserver = new IntersectionObserver(displayGridHero, options);

export const displayGridHero = function (entries, observer) {
  console.log(entries);
};

// HEADER OBSERVER

const header = document.querySelector(".header");

const headerOptions = {
  root: null,
  threshold: 1,
  rootMargin: "0px 0px 0px 0px",
};

export const headerObserver = new IntersectionObserver(
  makeHeaderSticky,
  headerOptions
);

const makeHeaderSticky = function (changes, observer) {
  const change = changes[0];

  console.log(change);
  console.log(change.isIntersecting);
};

headerObserver.observe(header);

// SECTION OBSERVER

const allSections = document.querySelectorAll("section");

console.log(allSections);
