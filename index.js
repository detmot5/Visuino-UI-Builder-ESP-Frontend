const url = window.location.href;;
const buttonLed1 = document.getElementById('led1');
const buttonLed2 = document.getElementById('led2');
const buttonLed3 = document.getElementById('led3');


let value = false;

axios.get('https://jsonplaceholder.typicode.com/posts')
.then(response => console.log(response));



const valueDisplay = new ValueDisplayBoolean({
  valueName: value,
  labelText: 'Led 1',
  onClick: function(){this.valueName = !this.valueName;
    console.log(this.valueName);
  },
});

const valueDisplay2 = new ValueDisplayBoolean({
  valueName: value,
  labelText: 'Led 2',
  onClick: function(){this.valueName = !this.valueName;
    console.log(this.valueName);
  },
});

const valueDisplay3 = new ValueDisplayBoolean({
  valueName: value,
  labelText: 'Led 3',
  onClick: function(){this.valueName = !this.valueName;
    console.log(this.valueName);
  },
});
const valueDisplay4 = new ValueDisplayBoolean({
  valueName: value,
  labelText: 'Led 4',
  onClick: function(){this.valueName = !this.valueName;
    console.log(this.valueName);
  },
});



const content = document.getElementById('content');

content.appendChild(valueDisplay.create());
content.appendChild(valueDisplay2.create());
content.appendChild(valueDisplay3.create());
content.appendChild(valueDisplay4.create());
