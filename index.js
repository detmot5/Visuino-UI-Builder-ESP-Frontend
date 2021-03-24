//const url = window.location.href;
const url = "http://localhost:3000/";
const connectedStr = "Connected";
const disconnectedStr = "Disconnected";

const components = [];
const tabs = {};
let currentTab = null;

const content = document.getElementById('content');
const title = document.getElementById('title');
const loadingInfo = document.getElementById('info');
const isConnectedDiv = document.getElementById('isConnected');
const tabBarDiv = document.getElementById('tab-bar');
const HttpCodes = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  PAYLOAD_TOO_LARGE: 413,
};

console.log(content.style.width);



const appendTab = (name) => {
  const content = document.createDocumentFragment();
  const button = document.createElement('button');
  button.innerHTML = name;
  button.classList.add("tab-button");
  button.addEventListener('click', (e) => {
    const name = e.path[0].innerHTML;
    console.log(e);
    if (!e.path[0].disabled) onTabSwitch(name);
  });
  tabBarDiv.appendChild(button);
  tabs[name] = {button, content};
}

const setTabButtonIsDisabled = (tab, isDisabled) => {
  console.log(tab);
  if(isDisabled) tab.button.classList.remove("tab-button-disabled");
  else tab.button.classList.add("tab-button-disabled");
}

const onTabSwitch = (name) => {
  console.log(tabs[name]);
  if (tabs[name] !== currentTab){
    currentTab.button.disabled = false;
    setTabButtonIsDisabled(currentTab, true);
    setTabButtonIsDisabled(tabs[name], false);
    currentTab = tabs[name];
    currentTab.button.disabled = true;
  } 
}

appendTab("dupa");
currentTab = tabs["dupa"];

appendTab("apud");

appendTab("test")
onTabSwitch("test")

const initialFetch = async () => {
  fetch(`${url}init`)
    .then(response => {
      return response.text();
    })
    .then(data => {
      console.log(data);
      title.innerHTML = data.toString();
      document.title = data.toString();
    })
}






const getData = async () => {
  await fetch(`${url}input`)
    .then(response => {
      if(response.status === HttpCodes.OK){
        console.log("OK");
        return response.json();
      }
      else if(response.status === HttpCodes.NO_CONTENT){
        return null;
      }
    })
    .then(data => {
      if(data === null) return;
      console.log(data);
      renderData(data);
      isConnectedDiv.innerHTML = connectedStr;
      isConnectedDiv.style.color = '#00a103';
      loadingInfo.innerHTML = "";
      components.forEach(el => {
        const element = document.getElementById(el.name);
        if(element === null) content.appendChild(el.render());
      });
    })
    .catch(error => {
      console.log(error);
      isConnectedDiv.innerHTML = disconnectedStr;
      isConnectedDiv.style.color = '#a10000';
    })
  setTimeout(getData, 500);
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
      case "image": 
        if(existing === null) {
          components.push(new ImageComponent({
            name: el.name,
            componentType: el.componentType,
            posX: el.posX,
            posY: el.posY,
            width: el.width,
            height: el.height,
            fileName: el.fileName,
          }));
        } // image doesn't have state
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
getData();

