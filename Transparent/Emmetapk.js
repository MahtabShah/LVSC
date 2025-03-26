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
  let syntax = str.match(/[\w]+/g);
  
}
