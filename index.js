const url = window.location.href;

const components = [];
const wrapper = document.getElementById('wrapper');
const content = document.getElementById('content');
const title = document.getElementById('title');


fetch('test.json')
  .then(response => response.json())
  .then(data => {
    renderData(data)
    components.forEach(el => {
      content.appendChild(el.render());
      console.log(el)
    })
  })



const label = new Label({
  name: "eluwina",
  state: "Cos jest włączone",
  fontSize: 15,
  dataType: 'boolean',
  color: 'lightblue',
  posX: 321,
  posY: 440,
  height: 10,
  width: 40,
  desktopScale: 2,
  componentType: 'label'
})

content.appendChild(label.render());

const getData = () => {

}
getData();












