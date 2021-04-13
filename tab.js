const appendTab = (name) => {
  if (name in tabs) return;
  const button = createTabButton(name);
  tabBarDiv.appendChild(button);
  tabs[name] = { 
                  button, 
                  components: {}, 
                  htmlElement: document.createElement('span')
                };
  
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
  Object.entries(response)
    .forEach(([name, elements]) => {
      appendTab(name, elements);
      parseJsonToHtmlElements(tabs[name], elements);      
      if (currentTab === null) {
        currentTab = tabs[name];
        switchTab(currentTab);
      }
    });
}

const renderTab = (tab) => {
  Object.entries(tab.components)
    .forEach(([key, el]) => {
      const isElementAlreadyExists = document.getElementById(el.name);
      if (isElementAlreadyExists === null) { 
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
