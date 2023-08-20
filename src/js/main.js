"use strict";

const navToggler = document.querySelector(".nav__toggler");
const navList = document.querySelector(".nav__list");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const main = document.querySelector(".main");

// Select the icon elements
const barsIcon = document.querySelector(".nav__icon--bars");
const timesIcon = document.querySelector(".nav__icon--times");

navToggler.addEventListener("click", () => {
  const navListHeight = navList.getBoundingClientRect().height;
  const headerHeight = header.getBoundingClientRect().height;

  if (nav.classList.contains("nav-active")) {
    nav.classList.remove("nav-active");
    main.style.transform = "";
    navList.style.transform = "translateY(-100%)";
    barsIcon.style.display = "block";
    timesIcon.style.display = "none";
  } else {
    nav.classList.add("nav-active");
    main.style.transform = `translateY(${navListHeight - headerHeight}px)`;
    navList.style.transform = "translateY(0)";
    barsIcon.style.display = "none";
    timesIcon.style.display = "block";
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 600px)").matches) {
    /* The viewport is less than, or equal to, 600 pixels wide */
    /* implement your mobile-specific JavaScript code here */
  } else {
    /* The viewport is greater than 600 pixels wide */
    /* implement your desktop-specific JavaScript code here */
  }

  if (nav.classList.contains("nav-active")) {
    const navListHeight = navList.getBoundingClientRect().height;
    const headerHeight = header.getBoundingClientRect().height;
    main.style.transform = `translateY(${navListHeight - headerHeight}px)`;
  }
});

main.addEventListener("transitionend", function () {
  if (!nav.classList.contains("nav-active")) {
    this.style.transform = "";
  }
});

window.addEventListener("DOMContentLoaded", (event) => {
  const tiles = document.querySelectorAll(".projects__tile");
  const animations = [
    "--slideInLeft",
    "--slideInRight",
    "--slideInTop",
    "--slideInBottom",
  ];

  tiles.forEach((tile) => {
    let randomIndex = Math.floor(Math.random() * animations.length);
    let animation = animations[randomIndex];
    tile.classList.add("projects__tile" + animation);
  });
});
