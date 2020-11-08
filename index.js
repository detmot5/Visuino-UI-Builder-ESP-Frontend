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












