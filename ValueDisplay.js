
const wrapperClassName = 'vd-wrapper';
const indicatorClassName = 'vd-indicator';
const labelClassName = 'vd-label';


const booleanTrueImage = 'Assets/bulbOn.svg'
const booleanFalseImage = 'Assets/bulbOff.svg'


class ValueDisplay {
  valueName;
  labelText;
  onClick;
  indicator;
  label;

  constructor({valueName, labelText, onClick}){
    this.valueName = valueName;
    this.labelText = labelText;
    this.onClick = onClick;
  
    this.indicator = document.createElement('div');
    this.indicator.className = indicatorClassName;

    this.label = document.createElement('div');
    this.label.className = labelClassName;
    this.label.innerHTML = labelText;
  }


  refresh(){

  }


  create() {
    const dFragment = document.createDocumentFragment();
    

    const wrapper = document.createElement('div');
    wrapper.className = wrapperClassName;
    wrapper.appendChild(this.indicator);
    wrapper.appendChild(this.label);
    wrapper.addEventListener('click', () => {
      this.onClick();
      this.refresh();
    });
    dFragment.appendChild(wrapper);
    
    return dFragment;
  }
}



class ValueDisplayBoolean extends ValueDisplay {
  img;

  constructor({valueName, labelText, onClick}){
    super({valueName, labelText, onClick})
    
    if(typeof valueName === 'boolean'){
      this.img = document.createElement('img');
      if(valueName) this.img.src = booleanTrueImage;
      else this.img.src = booleanFalseImage;
      this.indicator.appendChild(this.img);
    }
  }

  refresh(){
    this.img.src = this.valueName ? booleanTrueImage : booleanFalseImage;
    super.refresh()
  }

  create(){
    return super.create();
  }



}



