TextArea.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {

        let LastIndixe = TextArea.selectionStart;

        const firstPart = TextArea.value.slice(0, LastIndixe);
        const lastpart = TextArea.value.slice(LastIndixe);



        let spaceIndend = '';
        let additionalIndend = '    ';
        let permission = true;
        let extramoove = 0;

        spaceIndend = firstPart.split('\n')[firstPart.split('\n').length - 1].match(/\s*/)[0] || '';


        let prevTag = firstPart.slice(0, LastIndixe).replace(/>\s*[^<]+</g, '>.<').split('.');
        prevTag = prevTag[prevTag.length - 1];


        let nextTag = lastpart.replaceAll('\n', '').replace(/>\s*[^<]+</g, '>.<').split('.');

        // console.log("--->" , nextTag);

        if (TagTypeditector(nextTag[0].trim()) === 'closingTag' && (extractTag(nextTag[0].trim()).replace('/', '') === extractTag(prevTag)) && TextArea.value[LastIndixe] !== '\n') {
            permission = false;
            console.log("0000++--->=>")
            spaceIndend = additionalIndend + spaceIndend + '\n' + spaceIndend;
            extramoove = spaceIndend.length - 8;

        }


        if (TagTypeditector(prevTag) !== 'closingTag' && permission) {
            // spaceIndend = '\n' + spaceIndend;
            spaceIndend += additionalIndend;

            // permission = true;

        }


        const middlePart = spaceIndend;


        TextArea.value = firstPart + middlePart + lastpart;
        updateEditor(TextArea.value)
        TextArea.setSelectionRange(LastIndixe, LastIndixe);

        setTimeout(() => {
            setIndend(LastIndixe + spaceIndend.length - extramoove)

        }, 0)

        // console.log(openingTag + spaceIndend.length, closinfTag + spaceIndend.length);
        openingFlag = false
        EnteropeningFlag = false;
        // console.log(Tagdatastr)
        // Tagdatastr = '';
    }


    mooveBox()
})


function setIndend(LastIndixe) {
    TextArea.focus()
    TextArea.setSelectionRange(LastIndixe + 1, LastIndixe + 1);
}


function extractTag(str) {
    const match = str.match(/^<\s*([^\s>]+)/);
    return match ? match[1] : null;
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



