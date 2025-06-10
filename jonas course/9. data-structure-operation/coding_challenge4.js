'use strict';

const underscoreToCamel = function (texts){

  for (const text of texts ){
    const [first, second] = text.toLowerCase()
    // newText = i.oLowerCase().trim().split('_');
    console.log(text);
    const capitalizedText = newText.replace(newText[0], newText[0].toUpperCase());
    // console.log(capitalizedText);

    output.push(capitalizedText);
  }
  console.log(output.join(''));
}


document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn =  document.querySelector('button');

btn.addEventListener('click', function (){
  const texts = document.querySelector('textarea').value;
  // console.log(texts.split('\n'));
  underscoreToCamel(texts.split('\n'));
  
})



// underscoreToCamel('first_name');
// underscoreToCamel('      calculate_AGE');