document.querySelector(".Mahtabfiles").addEventListener('click', () => {
    document.querySelector(".left").classList.toggle('d-initial');
    if(!document.querySelector(".left").classList.contains('d-initial')){
         document.querySelector(".left").style.display = 'none';
    }
});
