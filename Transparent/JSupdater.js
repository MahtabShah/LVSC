
scriptJStextArea = document.querySelector('textarea.scriptJS');
scriptJSpre = document.querySelector('pre.scriptJS');

function highlightedJSCode(input) {
    return input
        // Highlight keywords
        .replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|import|export|typeof|instanceof|delete)\b/g, 
            '<span class="keyword">$1</span>')
        // Highlight numbers
        .replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$&</span>')
        .replace(/\.([\w]+)\(/g, '.<span class="method">$1</span>(')
        // // Highlight strings
      
        // // Highlight booleans
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="boolean">$1</span>')
        // Highlight brackets
        .replace(/([{}()\[\]])/g, '<span class="bracket">$1</span>')
        .replace(/\.([\w]+)\./g, '.<span class="object">$1</span>.')
        .replace(/([^>\()]+['"])+[$<\))]/g , `<span class="str">$1</span><`)
        .replace(/(\.([\w])+\s*[$\=])/g, '<span class="property">$1</span>')
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