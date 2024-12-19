styleCSSpre = document.querySelector('pre.styleCSS');


function MahtabCsshighlightCSSWithEntities(input) {
    // Escape '<' and '>' for HTML safety
    const escapedInput = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return escapedInput.replace(
        /([\w-]+)\s*:\s*([^;]+;?)|([\w.#][^{]*){|}/g,
        (match, property, value, selector) => {




            if (selector) {
                // Highlight selectors
                console.log("selector", selector);
                return `<span class="selector">${MahtabCssescapeHTML(selector)}{</span>`;
            } else if (property && value) {
                // Ensure the value ends at the first semicolon
                const trimmedValue = value.trim().endsWith(';')
                    ? value.trim()
                    : `${value.trim()};`;
                return `<span class="property">${MahtabCssescapeHTML(property)}</span>: <span class="value">${MahtabCssescapeHTML(trimmedValue)}</span>`;
            } else if (match === '}') {
                // Highlight closing brace

                return `<span class="brace">}</span>`;
            }
            return match;
        }
    );
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



// Csseditor.addEventListener('keydown', (event) => {
   
//     let listContainer = document.querySelector('.MslistOfCss2PropAto');
//     let cssSuggestions = document.querySelectorAll('.MslistOfCss2PropAto span');



//     function searchCSSProperty(text) {
//         let matches = [];
//         cssSuggestions.forEach((suggestion) => {
//             let matchLength = text.length;

//             if (suggestion.innerText.substr(0, matchLength) === text) {
//                 matches.push(suggestion.innerText);

//                 // Move matched suggestions to the top
//                 listContainer.insertBefore(suggestion, listContainer.children[0]);
//             }
//         });
//         return matches.length > 0 ? matches[0] : text;
//     }


//      listContainer.classList.add('MsactiveCssList');


//     if (event.key === "}") {
//         if (listContainer.classList.contains('MsactiveCssList')) {
//             listContainer.classList.remove('MsactiveCssList');

//         }

//     }

//     const trimmedText = cursorNode.textContent.trim();
//     const matchedText = searchCSSProperty(trimmedText);

//     if (event.key === '/') {

//         cursorNode.nodeValue = `\n    ${matchedText}\n`;
//         cursorNode.textContent = `\n    ${matchedText}\n`;
//         const newCursorOffset = cursorNode.nodeValue.length - 1;
//         const newRange = document.createRange();
//         newRange.setStart(cursorNode, newCursorOffset);
//         newRange.collapse(true);
//         selection.removeAllRanges();
//         selection.addRange(newRange);
//         event.preventDefault();

//         if (listContainer.classList.contains('MsactiveCssList')) {
//             listContainer.classList.remove('MsactiveCssList');

//         }

//     }



//     if (cursorNode.nodeType === Node.TEXT_NODE) {





//         const text = cursorNode.textContent;
//         const beforeCursor = text.slice(0, cursorOffset);



//         // Auto-insert closing curly braces
//         if (beforeCursor.endsWith('{')) {
//             const afterCursor = text.slice(cursorOffset);
//             cursorNode.textContent = beforeCursor;


//             if (!beforeCursor.trim().endsWith('}')) {

//                 cursorNode.textContent += '\n\n}'
//             }

//             cursorNode.textContent += afterCursor;

//             // Set cursor inside the braces
//             const newCursorOffset = beforeCursor.length + 60;
//             const newRange = document.createRange();
//             newRange.setStart(cursorNode, newCursorOffset);
//             newRange.collapse(true);
//             selection.removeAllRanges();
//             selection.addRange(newRange);
//         }

//         // Auto-insert semicolon for CSS properties
//         const propertyMatch = beforeCursor.match(/([a-zA-Z0-9-]+):$/);
//         if (propertyMatch) {
//             const afterCursor = text.slice(cursorOffset);
//             cursorNode.textContent = beforeCursor + ' ;' + afterCursor;

//             // Set cursor after the semicolon
//             const newCursorOffset = beforeCursor.length + 1;
//             const newRange = document.createRange();
//             newRange.setStart(cursorNode, newCursorOffset);
//             newRange.collapse(true);
//             selection.removeAllRanges();
//             selection.addRange(newRange);
//         }
//     }

//     MahtabCssupdateEditor();
// });



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