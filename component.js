const componentWrapperClassName = 'c-wrapper';



class Component {
  dFragment;

  name;
  dataType;
  posX;
  posY;
  state;
  componentType;

  desktopScale;
  wrapper;

  constructor({name, dataType, componentType, posX, posY, state, desktopScale}) {
    this.name = name;
    this.dataType = dataType;
    this.componentType = componentType;
    this.posX = posX;
    this.posY = posY;
    this.desktopScale = desktopScale;
    this.state = state;
    this.wrapper = document.createElement('div');
    this.dFragment = document.createDocumentFragment();
  }
  setState(state){
    this.state = state;
  }
  render() {
    this.wrapper.id = this.name;
    this.wrapper.className = componentWrapperClassName;
    this.wrapper.style.position = 'fixed';
    this.wrapper.style.top = `${this.posY}px`
    this.wrapper.style.left =`${this.posX}px`
  }

}



class InputComponent extends Component {
  constructor({name, dataType, componentType, width, height, posX, posY, state, desktopScale }) {
    super({name, dataType, componentType, width, height, posX, posY, state, desktopScale})
  }
  toJson() {
    return{
      name: this.name,
      componentType: this.componentType,
      value: this.state
    }
  }
  sendData() {
    console.log(this.toJson())
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

class OutputComponent extends Component{
  constructor({name, dataType, componentType, posX, posY, state, desktopScale }) {
    super({name, dataType, componentType, posX, posY, state, desktopScale})
  }

  refresh(){

  }
}


class Label extends OutputComponent {
  fontSize;
  color;
  constructor({name, dataType, componentType, posX, posY, state, desktopScale, fontSize, color }) {
    super({name, dataType, componentType, posX, posY, state, desktopScale})
    if(typeof state !== 'string') throw `${this.toString()} Illegal Parameter Type`;
    this.fontSize = fontSize;
    this.color = color;
    this.setState(state);
  }

  setState(state) {
    super.setState(state);
    this.wrapper.innerHTML = this.state;
  }

  render() {
    super.render();
    this.wrapper.style.fontSize = this.fontSize;
    this.wrapper.style.color = this.color;
    this.wrapper.innerHTML = this.state;
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }
}




class SwitchComponent extends InputComponent {

  #switchClassName = "onoffswitch";
  #switchCheckBoxClassName = "onoffswitch-checkbox";
  #switchLabelClassName = "onoffswitch-label";

  color;
  size;
  checkBox;
  label;
  swObject;

  constructor({name, dataType, componentType, width, height, posX, posY, state, desktopScale, color, size }) {
    super({name, dataType,componentType, width, height, posX, posY, state, desktopScale });
    if(typeof state !== 'boolean') throw `${this.toString()} Illegal Parameter Type`;
    this.checkBox = document.createElement('input');
    this.color = color;
    this.size = size;
  }


  onClick(e) {
    console.log(e);
    this.setState(e);
    super.sendData();
  }

  render() {
    super.render();

    this.checkBox.type = 'checkbox';
    this.checkBox.className = this.#switchCheckBoxClassName+this.name;
    this.wrapper.appendChild(this.checkBox);
    this.dFragment.appendChild(this.wrapper);
    const el = this.dFragment.querySelector(`.${this.checkBox.className}`);
    console.log(el);
    this.swObject = new Switch(el,{
      size: this.size,
      checked: this.state,
      onChange: (e) => {this.onClick(e)},
      onSwitchColor: this.color
    }
    );

    console.log(this.swObject);



    return this.dFragment;
  }




}




