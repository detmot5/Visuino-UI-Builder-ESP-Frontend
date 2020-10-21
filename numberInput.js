const numberInputDiv = document.getElementById('number-input');
const numberInputWrapperClassName = 'ni-wrapper';
const numberInputTextFieldClassName = 'ni-text-field';
const numberInputSubmitButtonClassName = 'ni-button';



const numberInputWrapper = document.createElement('div');
numberInputWrapper.className = numberInputWrapperClassName;

const numberInputTextField = document.createElement('input');
numberInputTextField.type = "text";
numberInputTextField.name = "value";
numberInputTextField.required = true;
numberInputTextField.autocomplete = false;
numberInputTextField.placeholder = "Value";
numberInputTextField.className = numberInputTextFieldClassName;

const numberInputSubmitButton = document.createElement('button');
numberInputSubmitButton.textContent = "OK";
numberInputSubmitButton.className = numberInputSubmitButtonClassName;


const numberInputSubmitButtonOnClick = (valueDisplay) => {
  const value = parseFloat(numberInputTextField.value);
  console.log(value);
  if(!isNaN(value)){
    valueDisplay.setValue(value);
  }
  numberInputTextField.value = "";
  numberInputHide();
}



numberInputWrapper.appendChild(numberInputTextField);
numberInputWrapper.appendChild(numberInputSubmitButton);



let isShowed = false;

const numberInputShow = (valueDisplay) => {
  if(!isShowed){
    numberInputDiv.appendChild(numberInputWrapper);
    numberInputSubmitButton.addEventListener('click', () => {  
      numberInputSubmitButtonOnClick(valueDisplay);
    });
  }
  isShowed = true;
}


const numberInputHide = () => {
  if(numberInputWrapper !== null && isShowed){
    numberInputSubmitButton.removeEventListener('click', () => {});
    numberInputWrapper.remove();
  }
  isShowed = false;
}