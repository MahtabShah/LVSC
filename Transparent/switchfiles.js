
let editor = document.querySelector('.editor');
let PreHTML = document.querySelector('pre.editor');
const textarea = document.getElementById("codeInput");
const highlightedDiv = document.getElementById("highlightedCode");
const livePage = document.querySelector(".livePage iframe");
let prevInditation = -3;



let FilesClicker = document.querySelectorAll('.click-F');


let EditorArea = document.querySelector('.fillingLineArea');
let justClose = false;

let AreaCSS = document.querySelector('#CSSCodeInput');
let PreareaCss = document.querySelector('#highlightedCSSCodeInput');

let OnFileHide = document.querySelector('div#editor');
let OnFileText = document.querySelector('textarea.editor');
let OnFilePre = document.querySelector('pre.editor');

let styleCSStextArea = document.querySelector('textarea.styleCSS');
let styleCSSpre = document.querySelector('pre.styleCSS');

let scriptJStextArea = document.querySelector('textarea.scriptJS');
let scriptJSpre = document.querySelector('pre.scriptJS');

styleCSStextArea.value = `
body{
    background-color: #e6e6e6;
}

h1{
    color: #3444f5;
    font-family: sans-serif;
}`;

scriptJStextArea.value = `console.log("Hello")
const h1 = document.querySelector('h1');
h1.addEventListener('click' , (e)=>{
    h1.style.color = 'green';
})`;

scriptJSpre.innerHTML = scriptJStextArea.value;
styleCSSpre.innerHTML = styleCSStextArea.value;


OnFileHide.classList.add('OnFileeditorBTN');
OnFileText.classList.add('OnFileeditor');
OnFilePre.classList.add('OnFileeditor');


textarea.addEventListener("input", () => {
    updateEditor()
    prevInditation = -3;
});


AreaCSS.addEventListener('input', (e) => {
    updateEditor()
    styleCSSpre.innerHTML = MahtabCsshighlightCSSWithEntities(styleCSStextArea.value);
    Hrline(styleCSStextArea)
});


scriptJStextArea.addEventListener('input', (e) => {
    updateEditor()
    scriptJSpre.innerHTML = highlightedJSCode(scriptJStextArea.value);
    Hrline(scriptJStextArea)
});

AreaCSS.addEventListener('click', (e) => {
    updateEditor()
    styleCSSpre.innerHTML = MahtabCsshighlightCSSWithEntities(styleCSStextArea.value);
    Hrline(styleCSStextArea)
});


scriptJStextArea.addEventListener('click', (e) => {
    updateEditor()
    scriptJSpre.innerHTML = highlightedJSCode(scriptJStextArea.value);
    Hrline(scriptJStextArea)
});

FilesClicker.forEach(f => {
    f.addEventListener('click', () => {

        if (OnFileHide.classList.contains('OnFileeditorBTN')) {
            OnFileHide.classList.remove('OnFileeditorBTN');
            OnFileHide = f;
            OnFileHide.classList.add('OnFileeditorBTN');

        }

        if (OnFileText.classList.contains('OnFileeditor')) {
            OnFileText.classList.remove('OnFileeditor');
            OnFileText = document.querySelector(`textarea.${f.id.valueOf()}`)
            OnFileText.classList.add('OnFileeditor');

        }

        if (OnFilePre.classList.contains('OnFileeditor')) {
            OnFilePre.classList.remove('OnFileeditor');
            OnFilePre = document.querySelector(`pre.${f.id.valueOf()}`)
            OnFilePre.classList.add('OnFileeditor');

        }

    })
});



function updateEditor() {

    let textContent = textarea.value;
    const text = textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace('/', '&#47;');

    PreHTML.innerHTML = highlightSyntax(text);

    textContent = textContent.split('</head>');

    // livePage.innerHTML = '';
    let style = textContent[0].match(/<style>[^]+/) ? textContent[0].match(/<style>[^]+/)[0].slice(7, -7).replace(/<\/?style>/g, '') : '';
    // livePage.contentDocument.body.innerHTML = textContent[1];


    const iframe = document.querySelector('.scriptIframe');

    const newIframe = iframe.cloneNode();

    iframe.parentNode.replaceChild(newIframe, iframe);


    const iframeDoc = newIframe.contentDocument || newIframe.contentWindow.document;
    iframeDoc.open()
    iframeDoc.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <style>${styleCSStextArea.value}</style>
       <style>${style}</style>
      
    </head>
    <body>
      ${textContent[1]}
      <script>
       ${scriptJStextArea.value}
      <\/script>
    <\/body>
    <\/html>`);

    iframeDoc.close();
}


function highlightSyntax() {

    let Linedivs = textarea.value.split('\n');
    // console.log(input)
    let file = document.createElement('div');
    Linedivs.forEach(line => {
        let lineDiv = document.createElement('div');
        lineDiv.classList.add('Hrline')
        lineDiv.innerText = line || ' ';
        // lineDiv = HighlightLineDiv(lineDiv);
        lineDiv.innerHTML = ff(lineDiv.innerHTML);
        console.log(ff(lineDiv.innerHTML))
        file.appendChild(lineDiv);

    })





    // return file.innerHTML;
    // return OnFilePre.innerHTML;

    function ff(input) {

        input = input.replace(/(&lt;\/?)(\w+)(.*?)(\/?&gt;)/g, (match, p1, p2, p3, p4) => {
            const attributes = p3.replace(/(\w+)=["'](.*?)["']/g, '<span class="attr">$1</span>=<span class="value">"$2"</span>');
            return `${p1}<span class="tag">${p2}</span>${attributes}${p4}`;
        });



        return input.replaceAll('&#47;&gt;', '<span class="Brace">/&gt;</span>').replaceAll('&lt;/', '&lt;<span class="Brace">/</span>').replaceAll('&lt;', '<span class="Brace">&lt;</span>').replaceAll('&gt;', '<span class="Brace">&gt;</span>');

    }


    console.log(file);
    return file.innerHTML;
}




textarea.addEventListener("scroll", () => {
    highlightedDiv.scrollTop = textarea.scrollTop; // Sync scrolling
    document.querySelector('.divvvvv').scrollTop = textarea.scrollTop;// Sync scrolling

});


function formatCode() {

    prevInditation = -3;

    TakingAllcodeRaw(textarea.value);
    for (let i = 0; i < EditorArea.children.length - 2; i++) {

        mergeThreeLine(EditorArea.children[i], EditorArea.children[i + 1], EditorArea.children[i + 2]);

    }

}


textarea.value = `<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8"/>
   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
   <title>Document</title>
   <link rel="stylesheet" href="style.css">

</head>
<body>

   <h1>Welcome to the Live Preview</h1>
   <p>Edit the code on the left to see changes instantly!</p>

<\/body>    
</html>   
`;



function HighlightLineDiv(lineDiv) {
    const text = lineDiv.innerText
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');


    lineDiv.innerHTML = lineDiv.innerHTML.replace(/(&lt;\/?)(\w+)(.*?)(\/?&gt;)|([^<>]+)/g, (match, p1, p2, p3, p4, content) => {
        let result = '';

        if (p1) {
            const attributes = p3.replace(/(\w+)=["'](.*?)["']/g, '<span class="attr">&nbsp;$1</span>=<span class="value">"$2"</span>');
            result = `${p1}<span class="tag">${p2}</span>${attributes}${p4}`;
        } else if (content) {
            result = `<span class="content">${content.trim()}</span>`;
        }

        return result;
    });


    lineDiv.innerHTML = lineDiv.innerHTML.replaceAll('&gt;', '<span class="Brace">&gt;</span>').replaceAll('&lt;/', '&lt;<span class="Brace">/</span>').replaceAll('&lt;', '<span class="Brace">&lt;</span>')

    return lineDiv;
}

function fillLineCode(linetext) {
    let lineDiv = document.createElement('div');
    lineDiv.classList.add('line')
    lineDiv.innerText = linetext;
    let type = TagTypeditector(lineDiv.innerText);
    let Inditation = getInditation(type);
    lineDiv = HighlightLineDiv(lineDiv);
    let space = '&nbsp'.repeat(prevInditation);
    try {


        if (TagTypeditector(lineDiv.innerText) === "Content") {
            lineDiv.querySelector('.content').innerHTML = lineDiv.querySelector('.content').innerHTML.replace('>', `>${space}`);

        } else {
            lineDiv.querySelector('.Brace').innerHTML = lineDiv.querySelector('.Brace').innerHTML.replace('&lt;', `${space}&lt;`);

        }
    } catch (error) {

    }


    // console.log(prevInditation)

    EditorArea.appendChild(lineDiv);
    // lineDiv.addEventListener('click')




}

function TakingAllcodeRaw(RawText) {
    let rawText = RawText.replaceAll('\n', '').replace(/>\s*</g, '><');

    let lineArr = extractHTMLParts(rawText);
    EditorArea.innerHTML = '';

    lineArr.forEach(line => {
        fillLineCode(line);
    });


}

function extractHTMLParts(rawText) {
    const regex = /(<[^>]+>)|([^<]+)|(<\/[^>]+>)/g;
    const results = [];

    let match;
    while ((match = regex.exec(rawText)) !== null) {
        if (match[1]) {
            results.push(match[1]); // Opening tag or self-closing tag
        } else if (match[2]) {
            results.push(match[2].trim()); // Content
        } else if (match[3]) {
            results.push(match[3]); // Closing tag
        }
    }

    return results;
}

function addSpacesBeforeLessThan(lineHtml, numSpaces) {
    const spaces = '&nbsp;'.repeat(numSpaces);
    return lineHtml.replace('<', '&nbsp;<');
}

function TagTypeditector(str) {

    str = str.trim(); // Remove extra spaces

    if (/^<\w+[^>]*\/>$/.test(str)) {
        return 'Self-closing tag'; // Matches self-closing tags like <img />, <br />, etc.
    } else if (/^<\w+[^>]*>$/.test(str)) {
        return 'Opening tag'; // Matches opening tags like <div>, <span>, etc.
    } else if (/^<\/\w+>$/.test(str)) {
        return 'Closing tag'; // Matches closing tags like </div>, </span>, etc.
    } else {
        return 'Content'; // Everything else (e.g., plain text or invalid tags)
    }


}

function getInditation(type) {

    if (type === 'openingTag') {
        if (justClose) {
            prevInditation -= 3;

        }
        prevInditation += 3;
        justClose = false;

    } else if (type === 'closingTag') {
        prevInditation -= 3;
        justClose = true;
    } else {
        prevInditation += 3;
    }

    if (prevInditation < 0) {
        prevInditation = 0;
    }

    return '&nbsp;'.repeat(prevInditation);
}

function mergeThreeLine(l1, l2, l3) {

    if (TagTypeditector(l1.innerText) === 'openingTag' && TagTypeditector(l3.innerText) === 'closingTag') {
        // console.log("call in if", l3.innerText)

        if (extractTag(l1.innerText.replaceAll('\n', '')) === extractTag(l3.innerText.replaceAll('\n', '').replace('/', ''))) {

            // console.log("Ente if")


            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = '16px monospace';

            let takingspaceTag = context.measureText(l1.innerText + l3.innerText.trim()).width;

            context.font = `${window.getComputedStyle(l2).font}`;
            let takingspaceContent = context.measureText(l2.innerText.trim()).width;

            console.log(takingspaceTag + takingspaceContent, l1.clientWidth)

            if (takingspaceTag + takingspaceContent < parseInt(window.getComputedStyle(EditorArea).width)) {
                // console.log("Enter comp if")
                l1.innerHTML = l1.innerHTML + l2.innerHTML + l3.innerHTML;
                l1.querySelectorAll('.Brace')[2].innerHTML = l1.querySelectorAll('.Brace')[2].innerHTML.replaceAll('&nbsp;', '')

                l2.remove();
                l3.remove();



            }

        }

    }
}

function extractTag(str) {
    const match = str.match(/^<\s*([^\s>]+)/);
    return match ? match[1] : null;
}

updateEditor();
