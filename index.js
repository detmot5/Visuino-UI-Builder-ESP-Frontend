const url = window.location.href;
const valueDisplays = [];
const content = document.getElementById('content');







const getData = () => {


  axios.get("test.json")
  .then(response => renderData(response))


  setTimeout(getData, 5000);
}


getData();




const renderData = ({data}) => {
  const title = data.title;
  const elements = data.elements;

  const domFragment = document.createDocumentFragment();


  elements.forEach((el) => {
    if(el.type === "boolean"){
      const element = getElementIfExists(el); // check the element is already rendered (by name)
      if(element === null){
        const newLength = valueDisplays.push(new ValueDisplayBoolean({
          name: el.name,
          value: el.value === "true",   // convert logic value in string to boolean
        }));
        content.appendChild(valueDisplays[newLength-1].create());
      } else {
        console.log("not generated");
        const found = valueDisplays.find(element => element.name === el.name);
        found.value = el.value === "true";
      }
    }
  });
}


const getElementIfExists = (elementToCheck) => {
  let element = null;
  valueDisplays.forEach((el) => {
    if(el.name === elementToCheck.name) element = el;
  })
  return element;
}











/* const valueDisplay = new ValueDisplayBoolean({
  value: false,
  name: 'Led1',
});

const valueDisplay2 = new ValueDisplayBoolean({
  value: false,
  name: 'Led2',
});

const valueDisplay3 = new ValueDisplayBoolean({
  value: false,
  name: 'Led3',
});
const valueDisplay4 = new ValueDisplayBoolean({
  value: false,
  name: 'Led4',
});
 */


/* 
content.appendChild(valueDisplay.create());
content.appendChild(valueDisplay2.create());
content.appendChild(valueDisplay3.create());
content.appendChild(valueDisplay4.create()); */
