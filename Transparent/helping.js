let HTMLSuggestions = document.querySelectorAll('.MslistOfhtm2PropAto span');
let HTMLlistContainer = document.querySelector('.MslistOfhtm2PropAto');
let AllHtmlPreference = document.querySelectorAll('.helpinglist span')

let TextArea = document.getElementById("codeInput");
const preElement = document.querySelector(".ch-Div");
let openingFlag = false;
let EnteropeningFlag = false;
let StrTag = '';
let Tagdatastr = '';
let BackSpacepermission = true;


TextArea.addEventListener('input', (e) => {

    inputclick(e);
    searchHTMLTags(StrTag.trim());

})

TextArea.addEventListener("mousemove" , ()=>{
    BackSpacepermission = false;
});

TextArea.addEventListener('keydown', (e) => {

    if ((e.key === "Tab")) {

        if (HTMLlistContainer.classList.contains('MsactiveCssList')) {

            addTagsPrefrece(document.querySelector('.helpinglist span'));

        } else {
            if (searchLine()[1].trim() === '') {

                setCaretWith(5);
                // alert('jj')
            } else {
                setCaretWith(0)
            }
        }
    }


    if (e.key === 'Backspace' && BackSpacepermission) {
        if (searchLine()[0].trim() === '' && searchLine()[0].length > 3) {
            setCaretWith(-3);
        }
    }

    if (e.key !== 'Backspace') {
        BackSpacepermission = true;
    }



})


preElement.addEventListener("click", (event) => {
    // Get the bounding rectangle of the pre element
    const rect = preElement.getBoundingClientRect();

    if (HTMLlistContainer.classList.contains('MsactiveCssList')) {
        HTMLlistContainer.classList.remove('MsactiveCssList');

    }
    // Calculate the click position relative to the pre element
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Log the click position
    // console.log(`Clicked position: X: ${x}, Y: ${y}`);
    HTMLlistContainer.style.left = `${x + 90}px`;
    HTMLlistContainer.style.top = `${y + 40}px`;


})

function searchHTMLTags(text) {

    HTMLSuggestions.forEach((suggestion) => {
        let matchLength = text.length;

        if (suggestion.innerText.substr(0, matchLength) === text) {

            HTMLlistContainer.insertBefore(suggestion, HTMLlistContainer.children[0]);
        }

    });
    return HTMLlistContainer.children[0].innerText;
}


AllHtmlPreference.forEach(s => {

    s.addEventListener('click', () => {
        addTagsPrefrece(s);

    })
})


function addTagsPrefrece(s) {
    let LastIndixe = TextArea.selectionStart;
    let nowWritten = StrTag.trim();
    let firstPart = TextArea.value.slice(0, LastIndixe - nowWritten.length);
    // console.log(firstPart, nowWritten);
    const lastpart = TextArea.value.slice(LastIndixe);

    let lastIN = TextArea.selectionStart;
    let lineNumber = TextArea.value.slice(0, lastIN).split('\n').length;
    let lineDiv = document.querySelectorAll('.Hrline')[lineNumber - 1];


    let LinenextTag = lineDiv.innerText.match(/\s+/g);
    LinenextTag = LinenextTag ? LinenextTag[0] : '';
    let middlePart = s.innerText;

    // console.log("midlle", extractTag(middlePart))

    TextArea.value = firstPart + middlePart + lastpart;
    updateEditor()

    setTimeout(() => {
        setIndend(firstPart.length + extractTag(s.innerText).length + 1);

    }, 1);

    StrTag = '';

    HTMLlistContainer.classList.remove('MsactiveCssList');



}


function inputclick(e) {

    if (e.inputType === 'deleteContentBackward') {
        StrTag = StrTag.slice(0, -1);

    }

    else if (e.inputType === 'insertText') {
        StrTag += e.data;

    }

    else if (e.inputType === 'insertLineBreak') {
        let lastIN = TextArea.selectionStart;
        let lineNumber = TextArea.value.slice(0, lastIN).split('\n').length;
        let lineDiv = document.querySelectorAll('.Hrline')[lineNumber - 2];
        let LinenextTag = lineDiv.innerText.match(/\s+/g);
        LinenextTag = LinenextTag ? LinenextTag[0] : '';

        StrTag += LinenextTag + '\n';
    }

    if (e.data === "<") {

        // Tagdatastr = '';
        openingFlag = true;
        EnteropeningFlag = true;

        HTMLlistContainer.classList.add('MsactiveCssList');

    }


    if (StrTag.trim() === '' && HTMLlistContainer.classList.contains('MsactiveCssList')) {
        HTMLlistContainer.classList.remove('MsactiveCssList');

    }

    if (e.data === ">") {

        let openingTag = StrTag.match(/<[^<]+>/g);
        openingTag = openingTag ? openingTag[0] : '</close>';

        if (TagTypeditector(openingTag) !== "Closing tag") {

            let LastIndixe = TextArea.selectionStart;
            let closinfTag = openingTag.replace('<', '</');

            const firstPart = TextArea.value.slice(0, LastIndixe);

            const middlePart = `${closinfTag}`;

            const lastpart = TextArea.value.slice(LastIndixe);




            TextArea.value = firstPart + middlePart + lastpart;
            updateEditor()

            TextArea.focus()
            TextArea.setSelectionRange(LastIndixe, LastIndixe);

            console.log(openingTag, closinfTag);
            openingFlag = false
            EnteropeningFlag = false;

        }
        HTMLlistContainer.classList.remove('MsactiveCssList');

        StrTag = '';
    }

}

function searchLine() {
    let lastIN = TextArea.selectionStart;

    let lineNumber = TextArea.value.slice(0, lastIN).split('\n').length;
    let lineDiv = document.querySelectorAll('.Hrline')[lineNumber - 1];



    let LastIndixe = TextArea.selectionStart;
    const firstPart = TextArea.value.slice(0, LastIndixe);


    let Lastline = firstPart.split('\n')[firstPart.split('\n').length - 1]
    let remainingPart = lineDiv.innerText.slice(Lastline).match(/<[^<]+>/g);

    remainingPart = remainingPart ? remainingPart[0] : '';


    return [Lastline, remainingPart];
}


function setCaretWith(n) {
    let LastIndixe = TextArea.selectionStart;
    const lastpart = TextArea.value.slice(LastIndixe);

    if (n < 0) {
        const firstPart = TextArea.value.slice(0, LastIndixe + n);
        TextArea.value = firstPart + lastpart;
        TextArea.setSelectionRange(LastIndixe + n, LastIndixe + n);

    } else {
        const firstPart = TextArea.value.slice(0, LastIndixe) + ' '.repeat(n);
        TextArea.value = firstPart + lastpart;
        setTimeout(() => {
            TextArea.setSelectionRange(LastIndixe + n, LastIndixe + n);
            // alert("jjjkkk")
        }, 10)
    }

}
