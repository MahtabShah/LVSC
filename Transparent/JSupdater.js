
scriptJStextArea = document.querySelector('textarea.scriptJS');
scriptJSpre = document.querySelector('pre.scriptJS');

function highlightedJSCode(input) {
    let Typearr = tokenizeAndType(input);
    let allstring = findStringsBetweenQuotes(input);
    let isString = false;
    let isObj = false;
    input = '';
    Typearr.forEach(v => {
        if ((v.value === `'` | v.value === `"`) || isString) {
            input += `<span class="${v.type} String">${v.value}</span>`;

            if (((v.value === `'` | v.value === `"`) && isString)) {
                isString = false;

            } else {
                isString = true;
            }

        }       
        else if (typeof window[v.value] === 'object' && window[v.value] !== null) {
            input += `<span class="${v.type} Object">${v.value}</span>`;
        } else if (isJavaScriptNativeMethod(Object.prototype, v.value)) {
            input += `<span class="${v.type} JSMethod">${v.value}</span>`;
        } else if (isJavaScriptNativeMethod(document, v.value) || isJavaScriptNativeMethod(Element.prototype, v.value)) {
            input += `<span class="${v.type} DOMMethod">${v.value}</span>`;
        } else if (isJavaScriptNativeMethod(Array.prototype, v.value)) {
            input += `<span class="${v.type} JSMethod">${v.value}</span>`;
        } else if (isJavaScriptNativeMethod(window, v.value)) {
            input += `<span class="${v.type} JSMethod">${v.value}</span>`;
        } else if (isJavaScriptNativeMethod(String.prototype, v.value)) {
            input += `<span class="${v.type} JSMethod">${v.value}</span>`;
        } else if (isJavaScriptNativeProperty(document, v.value)) {
            input += `<span class="${v.type} DOMProperty">${v.value}</span>`;
        } else if (isJavaScriptNativeProperty(window, v.value)) {
            input += `<span class="${v.type} JSProperty">${v.value}</span>`;
        } else {
            input += `<span class="${v.type}">${v.value}</span>`;
        }

    })
    // console.log(input)
    return input;
}


function tokenizeAndType(str) {
    const tokens = str.match(/(\b\w+\b|\S)|(\s*)\n*/g); // Extract words and symbols
    const types = [];

    tokens.forEach(token => {
        if (['let', 'const', 'if', 'else', 'for', 'while', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'class', 'extends', 'import', 'export', 'typeof', 'instanceof', 'delete'].includes(token)) {
            types.push({ type: 'Keyword', value: token });
        } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
            types.push({ type: 'Identifier', value: token });
        } else if (/^[=\+\-\*\/<>!]+$/.test(token)) {
            types.push({ type: 'Operator', value: token });
        } else if (['.', ',', ';', ':', '(', ')', '{', '}'].includes(token)) {
            types.push({ type: 'Punctuator', value: token });
        } else if (/^\d+$/.test(token) || /^['"`].*['"`]$/.test(token)) {
            types.push({ type: 'Literal', value: token });
        } else {
            types.push({ type: 'Unknown', value: token });
        }
    });

    return types;
}


function findStringsBetweenQuotes(input) {
    let results = [], quoteChar = null, currentString = "";

    for (let char of input) {
        if (char === "'" || char === '"') {
            if (quoteChar === char) results.push(currentString), quoteChar = null, currentString = "";
            else if (!quoteChar) quoteChar = char;
            else currentString += char;
        } else if (quoteChar) currentString += char;
    }

    return results;
}


function isJSMethod(obj, methodName) {
    return typeof obj[methodName] === 'function';
}


function isJavaScriptNativeMethod(obj, methodName) {
    try {
        if (typeof obj[methodName] === 'function') {
            return Function.prototype.toString.call(obj[methodName]).includes('[native code]');
        }
    } catch (error) {
        return false;

    }

}


function isJavaScriptNativeProperty(target, propertyName) {
    return target && typeof target[propertyName] !== 'undefined' && typeof target[propertyName] !== 'function';
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
