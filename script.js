let menu=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-x')
    navbar.classList.toggle('active')
}

window.onscroll = () => {
    menu.classList.remove('fa-x')
    navbar.classList.remove('active')
}