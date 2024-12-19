
scriptJStextArea = document.querySelector('textarea.scriptJS');
scriptJSpre = document.querySelector('pre.scriptJS');


function highlightedJSCode(input) {
    //    const functionreg = /(\b[a-zA-Z_][a-zA-Z0-9_]*\b))/g;
    //    let formatCode = input.replace(functionreg , `<span class="fxn">$1</span>`);
    //    formatCode = formatCode.replace(/(\(|\))/g , `<span class="bracket">$1</span>`);
    //    const methode = /(?<=\.)[a-zA-Z_][a-zA-Z0-9_]*/g
   return input
   .replace(/\((("|')[\w]+("|'))\)/g , '(<span class="parameter">$1</span>)').
    replace(/\.?([\w]+)\./g , `<span class="object">$1</span>.`)
   .replace(/\.?([\w]+)\(/g , `.<span class="methode">$1</span>(`)
   .replace(/\('"([^'";\)]+)/g , `<span class="parameter">$1</span>`)
   .replace(/(\))|({)|(})|(\()/g , `<span class="bracket">$1$2$3$4</span>`);
}



function JSupdateEditor() {
    const text = scriptJStextArea.value;
    scriptJSpre.innerHTML = highlightedJSCode(text);
}


// Initialize editor with default content
scriptJSpre.innerHTML = highlightedJSCode(`console.log("Hello")
const h1 = document.querySelector('h1');
h1.addEventListener('click' , (e)=>{
    h1.style.color = 'green';
})
`);