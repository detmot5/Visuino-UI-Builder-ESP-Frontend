const url = window.location.href;

const valueDisplays = [];
const wrapper = document.getElementById('wrapper');
const content = document.getElementById('content');
const title = document.getElementById('title');



const sw = new Switch({
  name: "dupa",
  posX: 100,
  posY: 200,
  width: 500,
  height: 500,
  dataType: 'boolean',
  desktopScale: 2,
  state: false,
})

const sw1 = new Switch({
  name: "dupa1",
  posX: 150,
  posY: 250,
  width: 500,
  height: 500,
  dataType: 'boolean',
  desktopScale: 2,
  state: true,
})
const sw2 = new Switch({
  name: "dupa2",
  posX: 150,
  posY: 300,
  width: 500,
  height: 500,
  dataType: 'boolean',
  desktopScale: 2,
  state: true,
})



console.log("siema")

content.appendChild(sw.render());
content.appendChild(sw1.render());
content.appendChild(sw2.render());
const getData = () => {

}
getData();












