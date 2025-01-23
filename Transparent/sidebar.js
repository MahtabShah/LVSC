const leftSide = document.querySelector(".left");
leftSide.style.display = 'none';
document.querySelector(".Mahtabfiles").addEventListener('click', () => {
    leftSide.classList.toggle('d-initial');
    if(!leftSide.classList.contains('d-initial')){
        leftSide.style.display = 'none';
    }
});
