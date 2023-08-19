"use strict";

var navToggler = document.querySelector(".nav__toggler");
var navList = document.querySelector(".nav__list");
var nav = document.querySelector(".nav");
var header = document.querySelector(".header");
var main = document.querySelector(".main");
navToggler.addEventListener("click", function () {
  var navListHeight = navList.getBoundingClientRect().height;
  var headerHeight = header.getBoundingClientRect().height;
  if (nav.classList.contains("nav-active")) {
    nav.classList.remove("nav-active");
    main.style.transform = "";
  } else {
    nav.classList.add("nav-active");
    main.style.transform = "translateY(".concat(navListHeight - headerHeight, "px)");
  }
});
window.addEventListener("resize", function () {
  if (window.matchMedia("(max-width: 600px)").matches) {
    /* The viewport is less than, or equal to, 600 pixels wide */
    /* implement your mobile-specific JavaScript code here */
  } else {
    /* The viewport is greater than 600 pixels wide */
    /* implement your desktop-specific JavaScript code here */
  }
  if (nav.classList.contains("nav-active")) {
    var navListHeight = navList.getBoundingClientRect().height;
    var headerHeight = header.getBoundingClientRect().height;
    main.style.transform = "translateY(".concat(navListHeight - headerHeight, "px)");
  }
});
main.addEventListener("transitionend", function () {
  if (!nav.classList.contains("nav-active")) {
    this.style.transform = "";
  }
});
window.addEventListener("DOMContentLoaded", function (event) {
  var tiles = document.querySelectorAll(".projects__tile");
  var animations = ["--slideInLeft", "--slideInRight", "--slideInTop", "--slideInBottom"];
  tiles.forEach(function (tile) {
    var randomIndex = Math.floor(Math.random() * animations.length);
    var animation = animations[randomIndex];
    tile.classList.add("projects__tile" + animation);
  });
});