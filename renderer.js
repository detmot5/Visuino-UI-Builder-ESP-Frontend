

const renderData = ({data}) => {
  console.log(data.elements);
  const elements = data.elements;
  elements.forEach((el) => {
    const element = getElementIfIsRendered(el); // check the element is already rendered (by name)
    if(el.type === 'boolean'){
      if(element === null){
        const newLength = valueDisplays.push(
          new ValueDisplayBoolean({
            name: el.name,
            value: el.value,   // convert logic value in string to boolean
        }));
        content.appendChild(valueDisplays[newLength-1].create());
      } else {
        // there we know the privided element is rendered, then we have to get it from array
        //const found = valueDisplays.find(element => element.name === el.name);
        element.setValue(el.value);
      } 
    } else if(el.type === 'number'){
      if(element === null){
        const newLength = valueDisplays.push(
          new ValueDisplayNumeric({
            name: el.name,
            value: parseFloat(el.value),     
        }));
        content.appendChild(valueDisplays[newLength-1].create());
      } else {
        element.setValue(parseFloat(el.value));
      } 
      
    }
  });
}


const getElementIfIsRendered = (elementToCheck) => {
  let element = null;
  valueDisplays.forEach((el) => {
    if(el.name === elementToCheck.name) element = el;
  })
  return element;
}
