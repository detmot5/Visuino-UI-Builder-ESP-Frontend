

const renderData = (data) => {
  console.log("render")
  console.log(data.elements);
  const elements = data.elements;


  elements.forEach((el) => {
    if (el.componentType === 'switch') {
      console.log("exist")
      const existing = getElementIfIsRendered(el);
      if(existing === null){
        components.push(new Switch({
          name: el.name,
          dataType: el.dataType,
          componentType: el.componentType,
          posX: el.posX,
          posY: el.posY,
          width: el.width,
          height: el.height,
          state: el.value,
          desktopScale: el.desktopScale,
        }
        ));
      } else {
        console.log("notexist")
        existing.setState(el.value);
      }

    }

  });


}


const getElementIfIsRendered = (elementToCheck) => {
  let element = null;
  components.forEach((el) => {
    if(el.name === elementToCheck.name) element = el;
  })
  return element;
}
