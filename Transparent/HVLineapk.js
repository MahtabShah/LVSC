let Lineactive = document.querySelector('span');
Lineactive.classList.add('activeLine')
let add = 0




function Hrline(TextAr) {

    let lastIN = TextAr.selectionStart;
    let lineNumber = TextAr.value.slice(0, lastIN).split('\n').length;
    try {
        if (Lineactive.classList.contains('activeLine')) {

            Lineactive.classList.remove('activeLine');
            Lineactive = document.querySelectorAll('.overline')[lineNumber];
            Lineactive.classList.add('activeLine');
        }
    } catch (error) {

    }


    let hrline = document.createElement('div');
    hrline.classList.add('overline');
    document.querySelector('.divvvvv').appendChild(hrline);




}




TextArea.addEventListener('input', (e) => {
    // setTimeout(Hrline, 0.0000);
    Hrline(TextArea);
});

TextArea.addEventListener('click', (e) => {
    // setTimeout(Hrline, 0.000);
    Hrline(TextArea);

})
