// Emmet system
// .anything_anystr

let codeditor = textarea;
let str = '';

codeditor.addEventListener("input" , (e)=>{
  str +=e.key;

  if(str.charAt(0) === "." && e.key === "Enter"){
    let out = `<div class=${str.slice(1)}></div>`;
   }
})
