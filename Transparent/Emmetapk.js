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
  let AllTags = [];
  let Prelement =  document.createElement("div");    
  return TagtGenerator(tagName, Prelement , 0 , sign)

  
}


function TagtGenerator(tagName, j , Prelement , i , sign){

   if(j > tagName.length ){
      return "";
   }

   let element = document.createElement(tagName[j]); 
   
    if (sign[i] === ">") {
         element.append(TagtGenerator(tagName , j+1 , element , i+1 , sign));
    }else if(sign[i] === "+"){
        Prelement.append(TagtGenerator(tagName, j+1, element , i+1 , sign));
    }else if(sign[i] === "*"){
      for (let k = 0; k < tagName[j+1]; k++) {
        Prelement.append(TagtGenerator(tagName, j+2 , element , i+1 , sign));
      }
      
    }
   return element;
  }














