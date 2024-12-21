styleCSSpre = document.querySelector('pre.styleCSS');
let AllCSSPreference = document.querySelectorAll('.MslistOfCss2PropAto span');
let CSSPrefListContainer = document.querySelector('.MslistOfCss2PropAto');


let CSSstr = '';

AreaCSS.addEventListener('keydown', (e) => {

   
    if (e.key === 'Tab' && (CSSPrefListContainer.classList.contains('MsactiveCssList'))) {
        addCSSPrefrece(document.querySelectorAll('.MslistOfCss2PropAto span')[0], 0);
        CSSstr = '';


    }



    // alert(nowWritten)
});

AreaCSS.addEventListener('input', (e) => {

    CSSPrefListContainer.classList.add('MsactiveCssList');

    if (e.data === ';') {

        if (CSSPrefListContainer.classList.contains('MsactiveCssList')) {
            CSSPrefListContainer.classList.remove('MsactiveCssList');
        }

        CSSstr = '';
    }
    else if (e.inputType === 'deleteContentBackward') {
        CSSstr = CSSstr.slice(0, -1);
    } else if (e.inputType === 'insertLineBreak') {
        CSSstr += '\n';

    }else if(e.data === '{'|| e.data === '}'){
        if (CSSPrefListContainer.classList.contains('MsactiveCssList')) {
            CSSPrefListContainer.classList.remove('MsactiveCssList');
        }
        CSSstr = '';

    } else if(e.data) {
        CSSstr += e.data;
    }

    let nowWritten = CSSstr.split('\n');

    nowWritten = nowWritten ? nowWritten[nowWritten.length - 1] : '';
    // console.log(CSSstr, nowWritten , e)
    searchCSSProperty(nowWritten);


})

AllCSSPreference.forEach(s => {

    s.addEventListener('click', () => {
        AreaCSS.style.caretColor = 'transparent';
        addCSSPrefrece(s, 0);

    })
})



function addCSSPrefrece(s, n) {
    let LastIndixe = AreaCSS.selectionStart;
    let nowWritten = CSSstr.split('\n');

    nowWritten = nowWritten ? nowWritten[nowWritten.length - 1] : '';
    let firstPart = AreaCSS.value.slice(0, LastIndixe - nowWritten.length);
    CSSstr = '';
    const lastpart = AreaCSS.value.slice(LastIndixe);
    let middlePart = ' '.repeat(n)+ s.innerText;


    AreaCSS.value = firstPart + middlePart + '\n    ' + lastpart;
    PreareaCss.innerHTML = MahtabCsshighlightCSSWithEntities(AreaCSS.value)
    updateEditor()
    AreaCSS.setSelectionRange(LastIndixe + 1, LastIndixe + 1)

    setTimeout(() => {
        AreaCSS.focus()

        AreaCSS.setSelectionRange(LastIndixe + s.innerText.length + 5 + n - nowWritten.length, LastIndixe + 5 + n + s.innerText.length - nowWritten.length)
        AreaCSS.style.caretColor = 'red';

    }, 0);

    // StrTag = '';

    CSSPrefListContainer.classList.remove('MsactiveCssList');



}


function MahtabCsshighlightCSSWithEntities(input) {

    let Linedivs = input.split('\n');
    let file = document.createElement('div');
    Linedivs.forEach(line => {
        let lineDiv = document.createElement('div');
        lineDiv.classList.add('Hrline')
        lineDiv.innerText = line || ' ';
        lineDiv = HighlightCSSLineDiv(lineDiv);
        file.appendChild(lineDiv);

    });
    return file.innerHTML;
}

function MahtabCssescapeHTML(str) {
    return str
        .replace(/&/g, '&amp;') // Escape '&'
        .replace(/</g, '&lt;') // Escape '<'
        .replace(/>/g, '&gt;') // Escape '>'
        .replace(/"/g, '&quot;') // Escape '"'
        .replace(/'/g, '&#039;'); // Escape "'"
}


function MahtabCssupdateEditor() {
    const text = OnFileText.value.replace(/{/g, '{').replace(/}/g, '}');
    OnFilePre.innerHTML = MahtabCsshighlightCSSWithEntities(text);
}


function HighlightCSSLineDiv(lineDiv) {

    lineDiv.innerText.replace(/([^]+{)|([^{;]+\s*:\s*)([^:]+;}?)/g, (match, selector, property, value) => {
        if (selector) {
            lineDiv.innerHTML = `<span class="selector">${selector}</span>`

        } else if (property && value) {
            lineDiv.innerHTML = `<span class="property">${property}</span><span class="value">${value}</span>`

        }
    })

    if (lineDiv.innerText.trim() === '}') {
        lineDiv.innerHTML = `<span class="bracket">${lineDiv.innerText}</span>`;

    }
    return lineDiv;
}


function searchCSSProperty(text) {
    let matches = [];
    AllCSSPreference.forEach((suggestion) => {
        let matchLength = text.length;

        if (suggestion.innerText.substr(0, matchLength) === text) {
            matches.push(suggestion.innerText);

            // Move matched suggestions to the top
            CSSPrefListContainer.insertBefore(suggestion, CSSPrefListContainer.children[0]);
        }
    });
    return matches.length > 0 ? matches[0] : text;
}


// Initialize editor with default content
styleCSSpre.innerHTML = MahtabCsshighlightCSSWithEntities(`body{
    background-color: #e6e6e6;
    outline-style: dotted;
    
}

h1{
    color: #3444f5;
    font-family: sans-serif;
    font-size: 36px;
    padding-left: 20px;
}

p{
    font-family: sans-serif;
    padding-left: 20px;
         
}
`);


