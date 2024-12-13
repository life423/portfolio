document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle')
    const mainNav = document.querySelector('.main-nav')

    menuToggle.addEventListener('click', () => {
        mainNav.style.display =
            mainNav.style.display === 'block' ? 'none' : 'block'
    })
})
