// Emmet system
// .anything_anystr

let codeditor = textarea;
let str = '';

codeditor.addEventListener("input" , (e)=>{
  str +=e.key;

  // class adiding
  if(str.charAt(0) === "." && e.key === "Enter"){
    let out = `<div class=${str.slice(1)}></div>`;
   }
});


function emmetGenerator(str){

  let sign = str.replace(/[\w]+/g , "").split("");
  let tagName = str.match(/[\w]+/g);
  let attr = "class";
  let content = "content"
  
  function TagtGenerator(tagName, attr , content ){
    let element = document.createElement(tagName);
    element.append(content);
  }
  
  
}
