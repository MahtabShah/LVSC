styleCSSpre = document.querySelector('pre.styleCSS');


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
    cssSuggestions.forEach((suggestion) => {
        let matchLength = text.length;

        if (suggestion.innerText.substr(0, matchLength) === text) {
            matches.push(suggestion.innerText);

            // Move matched suggestions to the top
            listContainer.insertBefore(suggestion, listContainer.children[0]);
        }
    });
    return matches.length > 0 ? matches[0] : text;
}


// Initialize editor with default content
styleCSSpre.innerHTML = MahtabCsshighlightCSSWithEntities(`
body{
    background-color: #e6e6e6;
}

h1{
    color: #3444f5;
    font-family: sans-serif;
}
`);