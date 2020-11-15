
const renderData = ({elements}) => {
  console.log("render")

  //console.log(elements)
  elements.forEach((el) => {
    const existing = getElementIfIsRendered(el);
      switch (el.componentType){
        case 'switch':
          if(existing === null) {
            components.push(new SwitchComponent({
              name: el.name,
              componentType: el.componentType,
              size: el.size,
              posX: el.posX,
              posY: el.posY,
              value: el.value,
              color: el.color,
              desktopScale: el.desktopScale,
            }));
          }
          break;

        case 'label':
          if(existing === null) {
            components.push(new Label({
              name: el.name,
              componentType: el.componentType,
              posX: el.posX,
              posY: el.posY,
              value: el.value,
              desktopScale: el.desktopScale,
              fontSize: el.fontSize,
              color: el.color,
            }));
          } else existing.setState(el);
          break;
        case 'gauge':
          if(existing === null){
            components.push(new GaugeComponent({
              name: el.name,
              componentType: el.componentType,
              posX: el.posX,
              posY: el.posY,
              width: el.width,
              height: el.height,
              color: el.color,
              maxValue: el.maxValue,
              minValue: el.minValue,
              value: el.value,
            }));
          } else existing.setState(el);
          break;
        case 'slider':
          if(existing === null){
            components.push(new SliderComponent({
              name: el.name,
              componentType: el.componentType,
              posX: el.posX,
              posY: el.posY,
              width: el.width,
              height: el.height,
              color: el.color,
              maxValue: el.maxValue,
              minValue: el.minValue,
              value: el.value
            }))
          }
          break;
        case "numberInput":
          if(existing === null){
            components.push(new NumberInputComponent({
              name: el.name,
              componentType: el.componentType,
              posX: el.posX,
              posY: el.posY,
              width: el.width,
              fontSize: el.fontSize,
              color: el.color,
              value: el.value
            }))
          } else
          break
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
