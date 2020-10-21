const numberInput_WrapperClassName = 'ni-wrapper';
const numberInput_TextFieldClassName = 'ni-text-field';
const numberInput_SubmitButtonClassName = 'ni-button';
const numberInput_CloseButtonClassName = 'ni-close-button';
const numberInput_ErrorMessageClassName = 'ni-error-message';


const numberInput_MainDiv = document.getElementById('number-input');
const numberInput_Wrapper = document.createElement('div');
numberInput_Wrapper.className = numberInput_WrapperClassName;

const numberInput_TextField = document.createElement('input');
numberInput_TextField.name = "value";
numberInput_TextField.required = true;
numberInput_TextField.autocomplete = "off";
numberInput_TextField.placeholder = "Value";
numberInput_TextField.className = numberInput_TextFieldClassName;


const numberInput_SubmitButton = document.createElement('button');
numberInput_SubmitButton.textContent = "OK";
numberInput_SubmitButton.className = numberInput_SubmitButtonClassName;

const numberInput_CloseButton = document.createElement('button');
numberInput_CloseButton.className = numberInput_CloseButtonClassName;


const numberInput_ErrorMessage = document.createElement('div');
numberInput_ErrorMessage.className = numberInput_ErrorMessageClassName;



numberInput_Wrapper.appendChild(numberInput_TextField);
numberInput_Wrapper.appendChild(numberInput_SubmitButton);
numberInput_Wrapper.appendChild(numberInput_CloseButton);
numberInput_Wrapper.appendChild(numberInput_ErrorMessage);



const numberInputSubmitButtonOnClick = (valueDisplay) => {
  const value = parseFloat(numberInput_TextField.value);
  if(!isNaN(value)){
    valueDisplay.setValue(value);
    valueDisplay.sendData();
    numberInputHide();
  } else{
    numberInput_ErrorMessage.innerHTML = "Error: value must be a number!";
  } 
  numberInput_TextField.value = "";
}



let isInputShowed = false;

const numberInputShow = (valueDisplay) => {
  if(!isInputShowed){
    numberInput_MainDiv.appendChild(numberInput_Wrapper);
    numberInput_SubmitButton.addEventListener('click', () => {  
      numberInputSubmitButtonOnClick(valueDisplay);
    });
    numberInput_CloseButton.addEventListener('click', () => {
      numberInputHide();
    })
  }
  isInputShowed = true;
}


const numberInputHide = () => {
  if(numberInput_Wrapper !== null && isInputShowed){
    numberInput_ErrorMessage.innerHTML = "";
    numberInput_Wrapper.remove();
  }
  isInputShowed = false;
}