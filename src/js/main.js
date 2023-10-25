;(function () {
  'use strict'
  
const navToggler = document.querySelector('.nav__toggler')
const navList = document.querySelector('.nav__list')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const main = document.querySelector('.main')
const bodyElement = document.querySelector('.body')
const barsIcon = document.querySelector('.nav__icon--bars')
const timesIcon = document.querySelector('.nav__icon--times')

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

const toggleNav = () => {
  const headerHeight = header.getBoundingClientRect().height
  const height = '100vh'
  const mainTranslateDistance = height

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
    navList.style.height = height
    main.style.transform = `translateY(${mainTranslateDistance})`
    barsIcon.style.display = 'none'
    timesIcon.style.display = 'block'
    bodyElement.classList.add('no-scroll')
  }
}

const resetNav = () => {
  if (nav.classList.contains('nav-active')) {
    nav.classList.remove('nav-active')
    main.style.transform = ''
    barsIcon.style.display = 'block'
    timesIcon.style.display = 'none'
    bodyElement.classList.remove('no-scroll')
    navList.style.height = ''
  }
}

const handleResize = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)

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
}

navToggler.addEventListener('click', toggleNav)
main.addEventListener('transitionend', () => {
  if (!nav.classList.contains('nav-active')) {
    main.style.transform = ''
  }
})
window.addEventListener('resize', handleResize)
window.addEventListener('orientationchange', resetNav)
createFaviconFromH1()
})()
