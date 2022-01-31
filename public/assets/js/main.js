/* MENU SHOW Y HIDDEN */

const navMenu = document.getElementById('nav-menu'), 
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');


/* SHOW MENU */
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* HIDE MENU */
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/* REMOVE MENU MOBILE ON CLICK OF ICON*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ACCORDION SKILLS */

const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills() {
    let itemClass = this.parentNode.className

    for(let i = 0; i < skillsContent.length; i++) skillsContent[i].className = 'skills__content skills__close'
    if (itemClass === 'skills__content skills__close') this.parentNode.className = 'skills__content skills__open'
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/* QUALIFICATION TABS */
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/* SERVICES MODAL */

const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'), 
      modalCloses = document.querySelectorAll('.services__modal-close'), 
      servicesModals = document.querySelectorAll('.services__modal'),
      servicesModalContent = document.querySelectorAll('.services__modal-content')

const modal = modalClick => {
    modalViews[modalClick].classList.add('active-modal') 
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

// To be Reviewed
// servicesModals.forEach((servicesModal) => {
//     servicesModal.addEventListener('click', () => {
//         if (servicesModalContent.clicked === true) {
//             alert('You are Clicking Me')
//         }        
//         else {
//             modalViews.forEach((modalView) => {
//                 modalView.classList.remove('active-modal')
//             })
//         }
//     })
// })


/* PORTFOLIO SWIPER  */


/* TESTIMONIAL */


/* SCROLL SECTIONS ACTIVE LINK */


/* CHANGE BACKGROUND HEADER */ 


/* SHOW SCROLL UP */ 


/* DARK LIGHT THEME */ 