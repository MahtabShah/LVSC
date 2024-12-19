const Mahtabfiles = document.querySelector(".Mahtabfiles");

let count = 1;

let leftNav = document.querySelector(".left");

Mahtabfiles.addEventListener('click', () => {

    if (count % 2 == 0) {
        leftNav.style.display = 'none';
    } else {
        leftNav.style.display = 'initial';

    }

    count++;

})
