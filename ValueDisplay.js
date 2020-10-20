
const wrapperClassName = 'vd-wrapper';
const indicatorClassName = 'vd-indicator';
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

    console.log("called send data")
    axios.post(`${url}status`, {
      name: this.name,
      type: typeof this.value,
      value: this.value,
    })
    .then(response => {
      console.log("sent");
    })
    .catch(err => {
      console.log("Not connected to server")
    });
  }

  
  
  onClick(){
    this.value = !this.value;
    this.sendData();
    
    super.onClick();
  }




  create(){
   
    return super.create();
  }

}



