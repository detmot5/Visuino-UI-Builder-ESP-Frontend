const componentWrapperClassName = 'c-wrapper';



class Component {
  name;
  dataType;
  width;
  height;
  posX;
  posY;
  state;
  componentType;

  desktopScale;
  wrapper;

  constructor({name, dataType, componentType, width, height, posX, posY, state, desktopScale}) {
    this.name = name;
    this.dataType = dataType;
    this.componentType = componentType;
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.desktopScale = desktopScale;
    this.state = state;
    this.wrapper = document.createElement('div');
  }
  setState(state){
    this.state = state;
  }
  render() {

  }

  toJson() {
    return{
      name: this.name,
      componentType: this.componentType,
      value: this.state
    }
  }

  sendData() {
    fetch(`${url}status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.toJson())
    }).then(r => console.log("sent"))
      .catch(err => console.log("err"));
  }

}



const switchClassName = "onoffswitch";
const switchCheckBoxClassName = "onoffswitch-checkbox";
const switchLabelClassName = "onoffswitch-label";

class Switch extends Component {

  onOffSwitch;
  checkBox;
  label;
  constructor({name, dataType, componentType, width, height, posX, posY, state, desktopScale }) {
    super({name, dataType,componentType, width, height, posX, posY, state, desktopScale });

    this.onOffSwitch = document.createElement('div');
    this.checkBox = document.createElement('input');
  }


  onClick(e) {
    console.log(e.target.checked);
    super.sendData();
  }

  render() {
    super.render();
    const dFragment = document.createDocumentFragment();
    this.wrapper.id = this.name;
    this.wrapper.className = componentWrapperClassName;
    this.wrapper.style.position = 'relative';
    this.wrapper.style.top = `${this.posY}px`
    this.wrapper.style.left =`${this.posX}px`

    this.onOffSwitch.className = switchClassName;
    this.onOffSwitch.id = this.name+'-sw';

    this.checkBox.type = "checkbox";
    this.checkBox.name = "onoffswitch";
    this.checkBox.id = this.name + "-cb";
    this.checkBox.className = switchCheckBoxClassName;

    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.htmlFor = this.checkBox.id;
    checkBoxLabel.className = switchLabelClassName;

    this.onOffSwitch.addEventListener('change', (e) => {
      this.onClick(e);
    });
    this.onOffSwitch.appendChild(this.checkBox);
    this.onOffSwitch.appendChild(checkBoxLabel);
    this.wrapper.appendChild(this.onOffSwitch);

    dFragment.appendChild(this.wrapper);

    return dFragment;
  }




}




