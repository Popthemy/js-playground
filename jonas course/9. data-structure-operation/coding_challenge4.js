'use strict';

const underscoreToCamel = function (texts){
  
  const output = [];
  let tempOutput = [];
  for (const [i, text] of texts.entries() ){

    const [first, ...others] = text.trim().toLowerCase().split('_');

    for (const other of others){
      const capitalizedText = other.replace(other[0], other[0]?.toUpperCase());
      tempOutput.push(capitalizedText);
    }

    tempOutput.unshift(first);
    output.push(`${tempOutput. join('').padEnd(20, ' ')} ${'✔️'.repeat(i + 1)}`);
    tempOutput = [];
  }
  console.log(output.join('\n'));
} 

// Da_ta 
// Struc_tures 
// and_Modern 
// Opera_tors


document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn =  document.querySelector('button');

btn.addEventListener('click', function (){
  const texts = document.querySelector('textarea').value;
  console.log(texts.split('\n'));
  underscoreToCamel(texts.split('\n'));
  
})