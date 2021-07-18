let modal = null
const focusableSelector= 'button, a , input, textarea'

const openModal = function(e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    focusables[0].focus()
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function(e) {
    if (modal == null) return
    e.preventDefault()

    /*Ajout d'un delai pour laisser l'animation de frmeture s'executer*/
    window.setTimeout(function (){
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.removeAttribute('aria-modal')
    modal.setAttribute('aria-hidden', 'true')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
}

const stopPropagation = function(e) {
    e.stopPropagation();
}

/* Créer la liste de tous les éléments focusable dans la modal (conserve le focus a l'interieur de la modal)*/
const focusInModal = function(e) {
    e.preventDefault();
    let index = focusables.findIndex( f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true){
        index--
    } else {
        index++
    }

    if(index >= focusables.length){
        index = 0
    }

    if(index < 0 ){
        index = focusables.length -1
    }
    focusables[index].focus();

}

document.querySelectorAll('.js-modal').forEach(a=> {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function(e) {
    if(e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }

    if(e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
})