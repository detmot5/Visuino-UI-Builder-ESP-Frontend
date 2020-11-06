


const renderComponent = (component) => {
}





const renderData = ({elements}) => {
  console.log("render")

  console.log(elements)
  elements.forEach((el) => {
    const existing = getElementIfIsRendered(el);
    if(existing === null){
      switch (el.componentType){
        case 'switch':
          components.push(new SwitchComponent({
            name: el.name,
            componentType: el.componentType,
            size: el.size,
            posX: el.posX,
            posY: el.posY,
            state: el.value,
            color: el.color,
            desktopScale: el.desktopScale,
          }));
          break;

        case 'label':
          components.push(new Label({
            name: el.name,
            componentType: el.componentType,
            posX: el.posX,
            posY: el.posY,
            width: el.width,
            height: el.height,
            state: el.value,
            desktopScale: el.desktopScale,
            fontSize: el.fontSize,
            color: el.color,
          }));
          break;

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
