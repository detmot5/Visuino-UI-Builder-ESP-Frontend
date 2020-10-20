
const wrapperClassName = 'vd-wrapper';
const indicatorClassName = 'vd-indicator';
const numberIndicatorClassName = 'vd-number-indicator';
const labelClassName = 'vd-label';


const booleanTrueImage = 'Assets/bulbOn.svg'
const booleanFalseImage = 'Assets/bulbOff.svg'




class ValueDisplay {
  value;
  name;
  indicator;
  label;
  wrapper;
  

  constructor({value, name}){
    this.value = value;
    this.name = name;
  
    this.indicator = document.createElement('div');
    this.indicator.className = indicatorClassName;

    this.label = document.createElement('div');
    this.label.className = labelClassName;
    this.label.innerHTML = name;

    this.wrapper = document.createElement('div');
    this.wrapper.className = wrapperClassName;    
  }

  setValue(){
    this.refresh();
  }

  refresh(){

  }

  onClick(){
    this.refresh();
  }

  create() {
    const dFragment = document.createDocumentFragment();
    this.wrapper.addEventListener('click', () => {
      this.onClick();
    });
    this.wrapper.appendChild(this.indicator);
    this.wrapper.appendChild(this.label);
    dFragment.appendChild(this.wrapper);
    
    return dFragment;
  }
}



class ValueDisplayBoolean extends ValueDisplay {
  img;
  constructor({value, name}){
    super({value, name})
    if(typeof value === 'boolean'){
      this.img = document.createElement('img');
      if(value) this.img.src = booleanTrueImage;
      else this.img.src = booleanFalseImage;
      this.indicator.appendChild(this.img);
    }
  }
  
  refresh(){
    if(typeof this.value === 'boolean'){
      this.img.src = this.value ? booleanTrueImage : booleanFalseImage;
    }
    super.refresh()
  }

  sendData() {
    axios.post(`${url}status`, {
      name: this.name,
      type: typeof this.value,
      value: this.value,
    })
    .then(response => {
      console.log("sent boolean");
    })
    .catch(err => {
      console.log("Not connected to server")
    });
  }

  setValue(value){
    if(typeof value === 'boolean'){
      this.value = value;
      super.setValue();
    }
  }

  onClick(){
    this.value = !this.value;
    this.sendData();
    super.onClick();
  }

}



class ValueDisplayNumeric extends ValueDisplay {
  numberContainer;

  constructor({value, name}){
    super({value, name});
    this.indicator.className = numberIndicatorClassName;
    this.numberContainer = document.createElement('div');
    if(typeof value === 'number'){
      this.numberContainer.innerHTML = value;
      this.indicator.appendChild(this.numberContainer);
    }
  }

  refresh(){
    if(typeof this.value === 'number'){
      this.numberContainer.innerHTML = this.value;
    }
    super.refresh();
  }

  sendData() {
    axios.post(`${url}status`, {
      name: this.name,
      type: typeof this.value,
      value: this.value,
    })
    .then(response => {
      console.log("sent numeric");
    })
    .catch(err => {
      console.log("Not connected to the server")
    });
  }



  setValue(value){
    if(typeof value === 'number'){
      this.value = value;
    }
    super.setValue();
  }


  onClick(){
    console.log("Number clicked");
    super.onClick();
  }


}




