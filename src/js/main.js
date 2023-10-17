'use strict'

const navToggler = document.querySelector('.nav__toggler')
const navList = document.querySelector('.nav__list')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const main = document.querySelector('.main')
const bodyElement = document.querySelector('.body')

const barsIcon = document.querySelector('.nav__icon--bars')
const timesIcon = document.querySelector('.nav__icon--times')

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})

navToggler.addEventListener('click', () => {
  const headerHeight = header.getBoundingClientRect().height

  if (nav.classList.contains('nav-active')) {
    nav.classList.remove('nav-active')
    main.style.transform = ''
    navList.style.transform = ''
    navList.style.height = ''
    barsIcon.style.display = 'block'
    timesIcon.style.display = 'none'
    bodyElement.classList.remove('no-scroll')
  } else {
    nav.classList.add('nav-active')
    const height = '100vh'
    const mainTranslateDistance = height
    navList.style.height = height
    main.style.transform = `translateY(${mainTranslateDistance})`
    barsIcon.style.display = 'none'
    timesIcon.style.display = 'block'
    bodyElement.classList.add('no-scroll')
  }
})

window.addEventListener('resize', () => {
  if (nav.classList.contains('nav-active')) {
    const navListHeight = navList.getBoundingClientRect().height
    const headerHeight = header.getBoundingClientRect().height
    main.style.transform = `translateY(${Math.min(
      navListHeight,
      window.innerHeight - headerHeight
    )}px)`
  } else {
    main.style.transform = ''

    navList.style.transform = ''
  }
})

main.addEventListener('transitionend', function () {
  if (!nav.classList.contains('nav-active')) {
    this.style.transform = ''
  }
})

const createFaviconFromH1 = () => {
  const h1Text = document.querySelector('h1').textContent
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#28b42f'

  ctx.font = '10px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(h1Text, 8, 8)

  const link =
    document.querySelector('link[rel="icon"]') || document.createElement('link')
  link.rel = 'icon'
  link.href = canvas.toDataURL('image/x-icon')

  if (!document.querySelector('link[rel="icon"]')) {
    document.head.appendChild(link)
  }
}

// add event listener for device orientation change
window.addEventListener('orientationchange', () => {
  if (nav.classList.contains('nav-active')) {
    nav.classList.remove('nav-active')
    main.style.transform = ''
    barsIcon.style.display = 'block'
    timesIcon.style.display = 'none'
    bodyElement.classList.remove('no-scroll')

    // reset height of the navigation list
    navList.style.height = ''
  }
})

createFaviconFromH1()

// Function to alter classes
const checkScreenWidth = (e) => {
  // Get all download button containers
  const downloadButtonContainers = Array.from(
    document.querySelectorAll(
      '.projects__tile__front .projects__download-buttons'
    )
  )

  downloadButtonContainers.forEach((container) => {
    if (e.matches) {
      // If media query matches i.e., width is less than or equal to 944px
      container.classList.remove('hidden') // Remove 'hidden' class
      container.classList.add('visible') // Add 'visible' class
    } else {
      // If media query does not match i.e., width is more than 944px
      container.classList.remove('visible') // Remove 'visible' class
      container.classList.add('hidden') // Add 'hidden' class
    }
  })
}

// Create a MediaQueryList object
const breakpoint = window.matchMedia('(max-width: 944px)')

// Call listener function at run time
checkScreenWidth(breakpoint)

// Attach listener function on state changes
breakpoint.addEventListener('change', checkScreenWidth)


function setTileMargins() {
  const navbarHeight = document.querySelector('.header').offsetHeight
  const footerHeight = document.querySelector('.footer').offsetHeight
  const viewportHeight = window.innerHeight

  const availableSpace = viewportHeight - navbarHeight - footerHeight
  const margin = availableSpace / 2 // This is the equal white space above and below the tile.

  const tile = document.querySelector('.projects__tile')
  tile.style.marginTop = `${margin}px`
  tile.style.marginBottom = `${margin}px`
}

setTileMargins()

document.addEventListener('DOMContentLoaded', function () {


function setCardDimensions() {
  const navbarHeight = document.querySelector('.nav').offsetHeight
  const footerHeight = document.querySelector('.footer').offsetHeight
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  const availableSpace = viewportHeight - navbarHeight - footerHeight

  // Calculate margin as 2% of the available space for example
  const margin = availableSpace * 0.02

  // Calculate card dimensions based on a 1.4:1 ratio
  // Four cards, three margins between them, and margins on both ends
  const cardWidth = (viewportWidth - 6 * margin) / 4
  const cardHeight = cardWidth * 1.2

  // Get all tiles and set their dimensions and margins
  const tiles = document.querySelectorAll('.projects__tile')
  tiles.forEach((tile) => {
    tile.style.width = `${cardWidth}px`
    tile.style.height = `${cardHeight}px`
    tile.style.margin = `${margin}px`
  })
}



  setCardDimensions()
  window.addEventListener('resize', setCardDimensions)
})
