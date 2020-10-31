const componentWrapperClassName = 'c-wrapper';



class Component {
  name;
  dataType;
  width;
  height;
  posX;
  posY
  state;

  desktopScale;
  wrapper;

  constructor({name, dataType, width, height, posX, posY, state, desktopScale}) {
    this.name = name;
    this.dataType = dataType;
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.desktopScale = desktopScale;
    this.state = state;
  }
  setState(state){

  }
  render() {

  }
}



const switchClassName = "onoffswitch";
const switchCheckBoxClassName = "onoffswitch-checkbox";
const switchLabelClassName = "onoffswitch-label";

class Switch extends Component {
  onOffwitch;
  checkBox;
  label;
  constructor({name, dataType, width, height, posX, posY, desktopScale }) {
    super({name, dataType, width, height, posX, posY, desktopScale });
  }


  render() {

    const dFragment = document.createDocumentFragment();
    this.wrapper = document.createElement('div');
    this.wrapper.id = this.name;
    this.wrapper.className = componentWrapperClassName;
    this.wrapper.style.position = 'absolute';
    this.wrapper.style.top = `${this.posY}px`
    this.wrapper.style.left =`${this.posX}px`


    this.onOffwitch = document.createElement('div');
    this.onOffwitch.className = switchClassName;

    this.checkBox = document.createElement('input');
    this.checkBox.type = "checkbox";
    this.checkBox.name = "onoffswitch";
    this.checkBox.id = this.name + "-cb";
    this.checkBox.className = switchCheckBoxClassName;


    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.htmlFor = this.checkBox.id;
    checkBoxLabel.className = switchLabelClassName;

    this.onOffwitch.appendChild(this.checkBox);
    this.onOffwitch.appendChild(checkBoxLabel);
    this.wrapper.appendChild(this.onOffwitch);

    dFragment.appendChild(this.wrapper);

    return dFragment;
  }


}




