"use strict";

const navToggler = document.querySelector(".nav__toggler");
const navList = document.querySelector(".nav__list");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const main = document.querySelector(".main");






navToggler.addEventListener("click", () => {
  const navListHeight = navList.getBoundingClientRect().height;

  if (nav.classList.contains("nav-active")) {
    nav.classList.remove("nav-active");
    

    main.style.transform = "";
    navList.style.transform = `translateY(-${navListHeight}px)`;
  } else {
    nav.classList.add("nav-active");
    

    navList.style.transform = "translateY(0)";
  }
});

window.addEventListener("resize", () => {
  if (nav.classList.contains("nav-active")) {
    const navListHeight = navList.getBoundingClientRect().height;
    main.style.transform = `translateY(${navListHeight}px)`;
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
