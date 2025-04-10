let indentNum = 4;


AreaCSS = document.querySelector('#CSSCodeInput');

AreaCSS.addEventListener('keydown', (e) => {
    setCssIndent(e)
});

['keydown', 'click'].forEach(event => {
    TextArea.addEventListener(event, setingInden);
});


function setingInden(e) {

    let lastIN = TextArea.selectionStart;
    let lineNumber = TextArea.value.slice(0, lastIN).split('\n').length;
    let lineDiv = document.querySelectorAll('.Hrline')[lineNumber - 1];


    let prev = lineDiv.innerText.match(/<[^<]+>/g);

    prev = prev ? prev[0] : '';


    let beforeSpace = 0;

    if (e.key === 'Enter') {
        textarea.style.caretColor = 'transparent';

        let LastIndixe = TextArea.selectionStart;
        const firstPart = TextArea.value.slice(0, LastIndixe);
        const lastpart = TextArea.value.slice(LastIndixe);
        let spaceIndend = '';
        let additionalIndend = '    ';
        let extramoove = 0;

        let prevTag = firstPart.match(/<[^<]+>/g);
        let nextTag = lastpart.match(/<[^<]+>/g);
        let LinenextTag = lineDiv.innerText.match(/<[^<]+>/g);
        LinenextTag = LinenextTag ? LinenextTag[LinenextTag.length - 1] : ''

        for (let i = 2; i < prevTag.length; i++) {
            if (TagTypeditector(prevTag[i].trim()) === "Closing tag") {
                beforeSpace -= indentNum;
            } else if (TagTypeditector(prevTag[i].trim()) === "Self-closing tag") {
                beforeSpace += 0;
            }

            else {
                beforeSpace += indentNum;
            }
        }

        prevTag = prevTag[prevTag.length - 1];
        nextTag = nextTag ? nextTag[0] : '';

        if (beforeSpace < 0) {
            beforeSpace = 0;
        }

        let Lastline = firstPart.split('\n')[firstPart.split('\n').length - 1].length;

        let remainingPart = lineDiv.innerText.slice(Lastline).match(/<[^<]+>/g);

        remainingPart = remainingPart ? remainingPart[0] : '';

        if (TagTypeditector(remainingPart.trim()) === "Closing tag") {
            let befor = beforeSpace - indentNum;
            if (befor < 0) {
                befor = 0;
            }

            extramoove = 1 + ' '.repeat(befor).length;
            spaceIndend = ' '.repeat(beforeSpace) + '\n' + ' '.repeat(befor);


        }
        else if (TagTypeditector(prevTag.trim()) === "Closing tag" || TagTypeditector(prevTag.trim()) === "Self-closing tag" || prev.trim() === '') {
            spaceIndend = ' '.repeat(beforeSpace);
        } else {
            spaceIndend = ` `.repeat(beforeSpace); + additionalIndend;
        }

        const middlePart = spaceIndend;

        TextArea.value = firstPart + middlePart + lastpart;
        updateEditor()
        TextArea.setSelectionRange(LastIndixe, LastIndixe);


        setTimeout(() => {
            setIndend(LastIndixe + spaceIndend.length - extramoove);
            textarea.style.caretColor = 'red';


        }, 0.000)

        openingFlag = false
        EnteropeningFlag = false;

    }


}

function setIndend(LastIndixe) {
    TextArea.focus()
    TextArea.setSelectionRange(LastIndixe + 1, LastIndixe + 1);
}


function extractTag(str) {
    const match = str.match(/^<\s*([^\s>]+)/);
    return match ? match[0] : null;
}

function setCssIndent(e) {
    let LastIndixe = AreaCSS.selectionStart;
    const firstPart = AreaCSS.value.slice(0, LastIndixe);

    const lastpart = AreaCSS.value.slice(LastIndixe);
    let extramoove = 0;
    let space = '' 



    if (e.key === '{') {
        AreaCSS.value = firstPart + '\n     \n}' + lastpart;
        AreaCSS.style.caretColor = 'transparent';
        AreaCSS.setSelectionRange(LastIndixe, LastIndixe);

        setTimeout(() => {
            AreaCSS.setSelectionRange(LastIndixe + indentNum + 2, LastIndixe + indentNum + 2);

            AreaCSS.style.caretColor = 'red';

        }, 1)

    }


    if (e.key === 'Enter') {

        AreaCSS.style.caretColor = 'transparent';


        // space = space ? space[space.length-1]:''

        if ((firstPart.trim().endsWith(';') || firstPart.trim().endsWith('{'))) {
            space = ' '.repeat(indentNum)
        }
        if (lastpart.startsWith('}')) {
            space += '\n';
            extramoove = -1;
        }

        const middlePart = space;

        AreaCSS.value = firstPart + middlePart + lastpart;
        updateEditor()
        AreaCSS.setSelectionRange(LastIndixe, LastIndixe);


        setTimeout(() => {
            AreaCSS.setSelectionRange(LastIndixe + space.length + 1 + extramoove, LastIndixe + space.length + 1 + extramoove);

            AreaCSS.style.caretColor = 'red';


        }, 10)


    }
}




function formateCode() {
    let sum = '';
    let linestring = '';
    let In = 0;
    let lines = textarea.value.split('\n');
    let results = lines[0] + '\n' + lines[1] + '\n';

    for (let j = 2; j < lines.length; j++) {


        if (lines[j].trim()==='') {
            continue;
        }

        let n = getTextIndentation(sum);


        lines[j] = lines[j].trim();
        let parts = extractHTMLParts(lines[j]);

        for (let i = 0; i < parts.length; i++) {
            if (TagTypeditector(parts[i]) === "Opening tag") {

                linestring += parts[i];



            }
            else if (TagTypeditector(parts[i]) === "Content") {
                linestring += parts[i]


            }
            else if (TagTypeditector(parts[i]) === "Self-closing tag") {
                linestring += parts[i]

            } else {

                linestring += parts[i];
                if (parts.length === 1) {
                    In = -indentNum;

                }

            }





        }

        sum += linestring;
        n = n + In;
        if (n < 0) {
            n = 0;
        }

        results += ' '.repeat(n) + linestring + '\n';
        linestring = '';
        In = 0;


    }

    return results;
}



function getTextIndentation(str) {

    let RS = 0;
    let Resparts = extractHTMLParts(str);

    for (let k = 0; k < Resparts.length; k++) {

        if (TagTypeditector(Resparts[k]) === "Opening tag") {
            RS += indentNum;

        }

        if (TagTypeditector(Resparts[k]) === "Closing tag") {
            RS -= indentNum;

        }
    }

    if (RS < 0) {
        RS = 0;
    }

    return RS;

}

document.querySelector('.formateDiv').addEventListener('click' , ()=>{
    TextArea.value = formateCode();
    updateEditor();
})
