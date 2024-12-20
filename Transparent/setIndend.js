TextArea.addEventListener('keydown', (e) => {
    setingInden(e);
})



TextArea.addEventListener('click', (e) => { 
    setingInden(e);
});


function setingInden(e){

    let lastIN = TextArea.selectionStart;
    let lineNumber = TextArea.value.slice(0, lastIN).split('\n').length;
    let lineDiv = document.querySelectorAll('.Hrline')[lineNumber-1];

    
    let prev = lineDiv.innerText.match(/<[^<]+>/g);

    prev = prev? prev[0] : '';


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
        LinenextTag = LinenextTag ? LinenextTag[LinenextTag.length-1]:''
   
        for (let i = 2; i < prevTag.length; i++) {
            if (TagTypeditector(prevTag[i].trim()) === "Closing tag" ) {
                beforeSpace -= 4;
            }else if (TagTypeditector(prevTag[i].trim()) === "Self-closing tag") {
                beforeSpace += 0;
            }
            
            else{
                beforeSpace += 4;
            }
        }

        prevTag = prevTag[prevTag.length - 1];
        nextTag = nextTag? nextTag[0] : '';

        if (beforeSpace < 0) {
            beforeSpace = 0;
        }

        let Lastline = firstPart.split('\n')[firstPart.split('\n').length  - 1].length;

        let remainingPart = lineDiv.innerText.slice(Lastline).match(/<[^<]+>/g);

        remainingPart = remainingPart ? remainingPart[0] : '';

        if (TagTypeditector(remainingPart.trim()) === "Closing tag" ) {
            let befor = beforeSpace-4 ; 
            if (befor < 0) {
                befor = 0;
            }

            extramoove = 1 +  ' '.repeat(befor).length; 
            spaceIndend = ' '.repeat(beforeSpace) + '\n'+ ' '.repeat(befor);

            
        }
        else if (TagTypeditector(prevTag.trim()) === "Closing tag" || TagTypeditector(prevTag.trim()) === "Self-closing tag" ||  prev.trim() === '') {
            spaceIndend = ' '.repeat(beforeSpace);
        }else{
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

TextArea.addEventListener('click', (e) => {
    mooveBox()
})


function mooveBox() {
    let LastIndixe = TextArea.selectionStart;

    const firstPart = TextArea.value.slice(0, LastIndixe);
    const lastpart = TextArea.value.slice(LastIndixe);

    let prevTag = firstPart.slice(0, LastIndixe).replace(/>\s*[^<]+</g, '>.<').split('.');
    prevTag = prevTag[prevTag.length - 1];

    let aboveLine = firstPart.match(/\n/g).length

    let index = 0;

    try {
        index = lastpart.match(extractTag(prevTag)).index

    } catch (error) {
        index = 0;
    }

    let belowLine = '0';

    try {
        belowLine = lastpart.slice(0, index).match(/\n/g).length;


    }
    catch {
        belowLine = '0';

    }

    // alert(aboveLine)
    // alert(belowLine)




    const height = (belowLine) * 24;
    const top = aboveLine * 24;

    document.querySelector('.verline').style.height = `${height}px`;
    document.querySelector('.verline').style.top = `${11.6 + top + 12}px`;
}


AreaCSS = document.querySelector('#CSSCodeInput');

AreaCSS.addEventListener('keydown', (e) => {
    setCssIndent(e)
});


scriptJStextArea.addEventListener('input', (e) => {
   
});



function setCssIndent(e){
   

    if (e.key === 'Enter') {

        AreaCSS.style.caretColor = 'transparent';

        let LastIndixe = AreaCSS.selectionStart;
        const firstPart = AreaCSS.value.slice(0, LastIndixe);

        const lastpart = AreaCSS.value.slice(LastIndixe);
        let extramoove = 0;

        let space = ''
        // space = space ? space[space.length-1]:''
   
        if ((firstPart.endsWith(';')||firstPart.endsWith('{'))) {
            space = ' '.repeat(4)
        }
        if (lastpart.startsWith('}')) {
            space += '\n';
        }

        const middlePart = space;
    
        AreaCSS.value = firstPart + middlePart + lastpart;
        updateEditor()
        AreaCSS.setSelectionRange(LastIndixe, LastIndixe);


        setTimeout(() => {
            AreaCSS.setSelectionRange(LastIndixe+5, LastIndixe+5);

            AreaCSS.style.caretColor = 'red';


        }, 10)


    }
}