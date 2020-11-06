const url = window.location.href;

const components = [];
const wrapper = document.getElementById('wrapper');
const content = document.getElementById('content');
const title = document.getElementById('title');

const getData = async () => {
  await fetch('test.json')
    .then(response => response.json())
    .then(data => {
      renderData(data)
      components.forEach(el => {
        const element = document.getElementById(el.name);
        if(element === null) content.appendChild(el.render());
      })
    })
  setTimeout(getData, 500);
}



getData();












