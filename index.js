//const url = window.location.href;
const url = "http://localhost:3000/";
const connectedStr = "Connected";
const disconnectedStr = "Disconnected";

const components = [];
const tabs = {};
let currentTab = null;

const contentDiv = document.getElementById('content');
const titleDiv = document.getElementById('title');
const loadingInfoDiv = document.getElementById('info');
const isConnectedDiv = document.getElementById('isConnected');
const tabBarDiv = document.getElementById('tab-bar');
const HttpCodes = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  PAYLOAD_TOO_LARGE: 413,
};
contentDiv.style.overflow = "scroll";
console.log(contentDiv.style.width);


const appendTab = (name, elements) => {
  if ((name in tabs)) return;
  const button = createTabButton(name);
  tabBarDiv.appendChild(button);
  tabs[name] = { 
                 button, 
                 components: {}, 
                 htmlElement: document.createElement('span')
               };
  parseJsonToHtmlElements(tabs[name].components, {elements});          
  return tabs[name];
}

const createTabButton = (buttonName) => {
  const button = document.createElement('button');
  button.innerHTML = buttonName;
  button.classList.add("tab-button");
  button.addEventListener('click', (e) => {
    const name = e.path[0].innerHTML;
    if (!e.path[0].disabled) onTabSwitch(name);
  });
  return button;
}

const setTabButtonIsDisabled = (tab, isDisabled) => {
  if(isDisabled) tab.button.classList.add("tab-button-disabled");
  else tab.button.classList.remove("tab-button-disabled");
}

const onTabSwitch = (name) => {
  const newTab = tabs[name];
  if (newTab !== currentTab) {
    contentDiv.removeChild(currentTab.htmlElement);
    currentTab.button.disabled = false;
    setTabButtonIsDisabled(currentTab, false);
    setTabButtonIsDisabled(newTab, true);
    currentTab = newTab;
    contentDiv.appendChild(currentTab.htmlElement);
    currentTab.button.disabled = true;
  } 
}




const createTabs = (response) => {
  if (response.tabs.name === null || response.tabs.content === null) 
    throw new Error("Wrong syntax during tab parsing");  
  response.tabs.forEach(({name, elements}) => {
    appendTab(name, elements);
    if (currentTab === null) {
      currentTab = tabs[name];
      switchTab(currentTab);
    }
  });

}

const renderTab = (tab) => {
  console.log(tab);
  Object.entries(tab.components)
    .forEach(([key, el]) => {
      const isElementAlreadyExists = document.getElementById(el.name);
      if (isElementAlreadyExists === null) { 
        console.log(`rendered ${el.name}`);
        tab.htmlElement.appendChild(el.render());
      }
    });
}

const switchTab = (tab) => {
  if (contentDiv.contains(currentTab.htmlElement))
    contentDiv.removeChild(currentTab.htmlElement);
  contentDiv.appendChild(tab.htmlElement);
  setTabButtonIsDisabled(currentTab, false);
  currentTab = tab;
  setTabButtonIsDisabled(currentTab, true);
}


const parseJsonToHtmlElements = (elementsStorage, {elements}) => {
  console.log("render");
  elements.forEach((el) => {
    if (isElementExistsOnOtherTabs(el, elements)) {
      console.warn(`Component name: ${el.name} is not unique`);
      return;
    }
    const existingElement = elementsStorage[el.nmae];
    switch (el.componentType){
      case 'switch':
        if (existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new SwitchComponent({
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
        if (existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new Label({
            name: el.name,
            componentType: el.componentType,
            posX: el.posX,
            posY: el.posY,
            value: el.value,
            fontSize: el.fontSize,
            isVertical: el.isVertical,
            color: el.color,
          }));
        } else existingElement.setState(el);
        break;
      case 'gauge':
        if(existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new GaugeComponent({
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
        } else existingElement.setState(el);
        break;
      case "indicator":
        if (existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new LedIndicatorComponent({
            name: el.name,
            componentType: el.componentType,
            posX: el.posX,
            posY: el.posY,
            size: el.size,
            color: el.color,
            value: el.value
          }));
        } else existingElement.setState(el);
          break;
      case "progressBar":
        if (existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new ProgressBarComponent({
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
        } else existingElement.setState(el);
        break;
      case "field":
        if(existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new ColorFieldComponent({
            name: el.name,
            componentType: el.componentType,
            posX: el.posX,
            posY: el.posY,
            width: el.width,
            height: el.height,
            color: el.color,
            outlineColor: el.outlineColor
          }));
        } else existingElement.setState(el);
        break;
      case "image": 
        if(existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new ImageComponent({
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
        if(existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new SliderComponent({
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
        if(existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new NumberInputComponent({
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
        if(existingElement === null || existingElement === undefined) {
          elementsStorage[el.name] = (new ButtonComponent({
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

const isElementExistsOnOtherTabs = (elementToCheck, actualTabStorage) => {
  let isExists = false;
  Object.entries(tabs)
    .forEach(([tabName, tab]) => {
      if (tab.components.hasOwnProperty(elementToCheck.name) &&
          tab.components !== actualTabStorage) {
        isExists = true;
      }
    });
  return isExists;
} 

const setIsConnectedDiv = (isConnected) => {
  if (isConnected === true) {
    isConnectedDiv.innerHTML = connectedStr;
    isConnectedDiv.style.color = '#00a103';
    loadingInfoDiv.innerHTML = "";
  } else {
    isConnectedDiv.innerHTML = disconnectedStr;
    isConnectedDiv.style.color = '#a10000';
  }
}

const initialFetch = () => {
  fetch(`${url}init`)
    .then(response => {
      return response.text();
    })
    .then(data => {
      console.log(data);
      titleDiv.innerHTML = data.toString();
      document.title = data.toString();
    })
}


const getData = () => {
  fetch(`${url}input`)
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
      setIsConnectedDiv(true);
      createTabs(data);
      renderTab(currentTab);      
    })
    .catch(error => {
      console.log(error);
      setIsConnectedDiv(false);
    })
  setTimeout(getData, 500);
}


initialFetch();
getData();

