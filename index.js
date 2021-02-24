const url = window.location.href;
const connectedStr = "Connected";
const disconnectedStr = "Disconnected";

const components = [];
const content = document.getElementById('content');
const title = document.getElementById('title');
const loadingInfo = document.getElementById('info');
const isConnectedDiv = document.getElementById('isConnected');
const succesIndicatorDiv = document.getElementById('successIndicator');

content.style.overflow = 'scroll';
console.log(content.style.width);

const blinkSuccessIndicator = () => {
  succesIndicatorDiv.style.visibility = "visible";
  setTimeout(() => {
    succesIndicatorDiv.style.visibility = "hidden";
  }, 100);
}



const initialFetch = async () => {
  fetch(`init.txt`)
    .then(response => {
      return response.text();
    })
    .then(data => {
      console.log(data);
      title.innerHTML = data.toString();
      document.title = data.toString();
    })
}




const renderData = ({elements}) => {
  console.log("render");
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
            fontSize: el.fontSize,
            isVertical: el.isVertical,
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
      case "indicator":
        if(existing === null){
          components.push(new LedIndicatorComponent({
            name: el.name,
            componentType: el.componentType,
            posX: el.posX,
            posY: el.posY,
            size: el.size,
            color: el.color,
            value: el.value
          }));
        } else existing.setState(el);
          break;
      case "progressBar":
        if(existing === null){
          components.push(new ProgressBarComponent({
            name: el.name,
            componentType: el.componentType,
            posX: el.posX,
            posY: el.posY,
            width: el.width,
            height: el.height,
            color: el.color,
            isVertical: el.isVertical,
            value: el.value,
            minValue: el.minValue,
            maxValue: el.maxValue,
          }));
        } else existing.setState(el);
        break;
      case "field":
        if(existing === null){
          components.push(new ColorFieldComponent({
            name: el.name,
            componentType: el.componentType,
            posX: el.posX,
            posY: el.posY,
            width: el.width,
            height: el.height,
            color: el.color,
            outlineColor: el.outlineColor
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
          }));
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
          }));
        }
        break;
      case "button":
        if(existing === null){
          components.push(new ButtonComponent({
            name: el.name,
            componentType: el.componentType,
            posX: el.posX,
            posY: el.posY,
            width: el.width,
            height: el.height,
            fontSize: el.fontSize,
            color: el.color,
            textColor: el.textColor,
            isVertical: el.isVertical,
            text: el.text,
          }));
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

initialFetch();


