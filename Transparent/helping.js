let HTMLSuggestions = document.querySelectorAll('.MslistOfhtm2PropAto span');
let HTMLlistContainer = document.querySelector('.MslistOfhtm2PropAto');
let AllHtmlPreference = document.querySelectorAll('.helpinglist span')

let TextArea = document.getElementById("codeInput");
const preElement = document.querySelector(".ch-Div");
let openingFlag = false;
let EnteropeningFlag = false;
let StrTag = '';

TextArea.addEventListener('input', (e) => {

    console.log('===>' ,StrTag)
    inputclick(e);
    searchHTMLTags(StrTag.trim());

    console.log(e, StrTag)


    
})


TextArea.addEventListener('keydown', (e) => {

    // inputclick(e);
    // console.log(e, StrTag)

    if ((e.key === "Tab" )) {

        if (HTMLlistContainer.classList.contains('MsactiveCssList')) {

            addTagsPrefrece(document.querySelector('.helpinglist span'));

        }
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
    console.log(`Clicked position: X: ${x}, Y: ${y}`);
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


function TagTypeditector(lineText) {

    // console.log(lineText)
    if (lineText.trim().replaceAll('\n', '').startsWith('</') || lineText.trim().replaceAll('\n', '').endsWith('/>')) {
        return 'closingTag';

    } else if (lineText.trim().startsWith('<')) {
        return 'openingTag';

    } else {

        return 'content';
    }
}




AllHtmlPreference.forEach(s => {

    s.addEventListener('click', () => {
        addTagsPrefrece(s);

    })
})


function addTagsPrefrece(s) {
    let LastIndixe = TextArea.selectionStart;

    // alert(TagTypeditector(StrTag.trim()))
    // if (TagTypeditector(StrTag.trim().slice(0 , -1)) === "Opening tag") {
    //     StrTag = '';
    // }

    let nowWritten = StrTag.trim();

    const firstPart = TextArea.value.slice(0, LastIndixe - nowWritten.length);
    console.log(StrTag)
    console.log(firstPart);
    const lastpart = TextArea.value.slice(LastIndixe);

    let middlePart = s.innerText;

    console.log("midlle", extractTag(middlePart))

    TextArea.value = firstPart + middlePart + lastpart;
    updateEditor(TextArea.value)

    setTimeout(() => {
        setIndend(firstPart.length + extractTag(middlePart).length + 1);

    }, 10);

    StrTag = ' ';

    HTMLlistContainer.classList.remove('MsactiveCssList');



}


function inputclick(e) {
    if (e.inputType === 'deleteContentBackward') {
        StrTag = StrTag.slice(0, -1);
    } else if (e.inputType === 'insertText') {
        StrTag += e.data;

    }




    if (e.inputType === 'deleteContentBackward') {
        Tagdatastr = Tagdatastr.slice(0, -1)
    }

    if (e.data === "<") {

        Tagdatastr = '';
        openingFlag = true;
        EnteropeningFlag = true;

        HTMLlistContainer.classList.add('MsactiveCssList');
        // setTimeout(() => {
        //     if (HTMLlistContainer.classList.contains('MsactiveCssList')) {
        //         HTMLlistContainer.classList.remove('MsactiveCssList');

        //     }

        // }, 3000)

    }
    // textarea.selectionStart
    if (openingFlag) {
        if (!e.data) {
            Tagdatastr += '';
        } else {
            Tagdatastr += e.data;

        }

    }


    if (e.data === ">") {
        if (TagTypeditector(Tagdatastr) !== 'closingTag') {

            let LastIndixe = TextArea.selectionStart;
            let openingTag = TextArea.value.slice(LastIndixe - Tagdatastr.length, LastIndixe);

            let closinfTag = openingTag.replace('<', '</');

            const firstPart = TextArea.value.slice(0, LastIndixe);

            const middlePart = `${closinfTag}`;

            const lastpart = TextArea.value.slice(LastIndixe);




            TextArea.value = firstPart + middlePart + lastpart;
            updateEditor(TextArea.value)

            TextArea.focus()
            TextArea.setSelectionRange(LastIndixe, LastIndixe);

            console.log(openingTag, closinfTag);
            openingFlag = false
            EnteropeningFlag = false;
            console.log(Tagdatastr)
            Tagdatastr = '';
        }

    }



}
