const url = window.location.href;
const connectedStr = "Connected";
const disconnectedStr = "Disconnected";


const components = [];
const wrapper = document.getElementById('wrapper');
const content = document.getElementById('content');
const title = document.getElementById('title');
const isConnectedDiv = document.getElementById('isConnected');





const getData = async () => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 10000);
  await fetch('test.json', {signal: controller.signal })
    .then(response => response.json())
    .then(data => {
      renderData(data)
      components.forEach(el => {
        const element = document.getElementById(el.name);
        if(element === null) content.appendChild(el.render());
        isConnectedDiv.innerHTML = connectedStr;
        isConnectedDiv.style.color = '#00a103';
      })
    })
    .catch(error => {
      isConnectedDiv.innerHTML = disconnectedStr;
      isConnectedDiv.style.color = '#a10000';
    })
  setTimeout(getData, 500);
}



getData();


const slider = new SliderComponent({
  name: 'sl',
  width: 300,
  height: 30,
  maxValue: 100,
  minValue: 20,
  value: 30,
  color: 'red',
  posY: 200,
  posX: 300,
  componentType: 'slider',
  desktopScale: 2,
})


content.appendChild(slider.render());












