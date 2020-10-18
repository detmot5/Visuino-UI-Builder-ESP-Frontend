const url = window.location.href;;
const buttonLed1 = document.getElementById('led1');
const buttonLed2 = document.getElementById('led2');
const buttonLed3 = document.getElementById('led3');


let value = false;



const valueDisplay = new ValueDisplayBoolean({
  valueName: value,
  labelText: 'X axis motor ',
  onClick: function(){this.valueName = !this.valueName;
    console.log(this.valueName);
  },
});


const wrapper = document.getElementById('wrapper');

wrapper.appendChild(valueDisplay.create())
