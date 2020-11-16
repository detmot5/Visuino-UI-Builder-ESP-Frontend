const componentWrapperClassName = 'c-wrapper';


class Component {
  dFragment;
  name;
  posX;
  posY;
  value;
  componentType;

  desktopScale;
  wrapper;

  constructor({name, componentType, posX, posY, value, desktopScale}) {
    this.name = name;
    this.componentType = componentType;
    this.posX = posX;
    this.posY = posY;
    this.desktopScale = desktopScale;
    this.value = value;
    this.wrapper = document.createElement('div');
    this.dFragment = document.createDocumentFragment();
  }
  setState(state){
    this.value = state.value;
  }
  render() {
    this.wrapper.id = this.name;
    this.wrapper.className = componentWrapperClassName;
    this.wrapper.style.position = 'absolute';
    this.wrapper.style.top = `${this.posY}px`
    this.wrapper.style.left =`${this.posX}px`
  }

}



class InputComponent extends Component {
  constructor({name, componentType, posX, posY, value, desktopScale }) {
    super({name, componentType, posX, posY, value, desktopScale})
  }
  toJson() {
    return{
      name: this.name,
      componentType: this.componentType,
      value: this.value
    }
  }
  async sendData() {
    console.log(this.toJson())
    const res = await fetch(`${url}status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.toJson())
    });
    return res.clone();
  }
}

class OutputComponent extends Component{
  constructor({name, componentType, posX, posY, value, desktopScale }) {
    super({name, componentType, posX, posY, value, desktopScale})
  }

}


class Label extends OutputComponent {
  fontSize;
  color;
  constructor({name, componentType, posX, posY, value, desktopScale, fontSize, color }) {
    super({name, componentType, posX, posY, value, desktopScale})
    if(typeof value !== 'string') throw `${this.toString()} Illegal Parameter Type`;
    this.fontSize = fontSize;
    this.color = color;
    this.setState({fontSize, color, value});
  }

  setState(state) {
    super.setState(state);
    this.fontSize = state.fontSize;
    this.color = state.color;

    this.wrapper.innerHTML = this.value;
    this.wrapper.style.fontSize = `${this.fontSize}px`;
    this.wrapper.style.color = this.color;
  }

  render() {
    super.render();
    this.wrapper.style.fontSize = this.fontSize;
    this.wrapper.style.color = this.color;
    this.wrapper.innerHTML = this.value;
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }
}

class GaugeComponent extends OutputComponent{
  color;
  maxValue;
  minValue;
  width;
  height;
  knob;     //gauge component object;
  constructor({name,componentType, posX, posY, value, desktopScale, color, minValue, maxValue, width, height}) {
    super({name, componentType, posX, posY, value, desktopScale})

    this.color = color;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.width = width;
    this.height = height;

    this.knob = pureknob.createKnob(this.width, this.height);
    this.knob.setProperty('label', this.name);
    this.knob.setProperty('colorLabel', '#333');
    this.knob.setProperty('angleStart', -0.75 * Math.PI);
    this.knob.setProperty('angleEnd', 0.75 * Math.PI);
    this.knob.setProperty('colorFG', this.color);
    this.knob.setProperty('colorBG', '#aaa');
    this.knob.setProperty('trackWidth', 0.4);
    this.knob.setProperty('valMin', this.minValue);
    this.knob.setProperty('valMax', this.maxValue);
    this.knob.setProperty('readonly', true);
    this.knob.setValue(this.value);
  }

  setState(state) {
    super.setState(state);
    this.color = state.color;
    this.knob.setProperty('colorFG', this.color);
    this.knob.setValue(this.value);
  }

  render() {
    super.render();
    this.wrapper.appendChild(this.knob.node());
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }
}


class LedIndicatorComponent extends OutputComponent{
  #ledClassName = "led";
  #frameClassName = "frame";
  #offColor = "#999";
  led;
  frame;
  color;
  constructor({name, componentType, posX, posY, value, desktopScale, color }) {
    super({name, componentType, posX, posY, value, desktopScale });
    this.color = color;
    this.frame = document.createElement('div');
    this.led = document.createElement('div');
  }

  setState(state) {
    super.setState(state);
    this.setLed(state.value);
    this.color = state.color;
  }


  setLed(value){
    if(value) {
      this.led.style.backgroundColor = "red";
    } else {
      this.led.style.backgroundColor = "red";
    }
  }



  render() {
    super.render();
    this.led.className = this.#ledClassName;
    this.frame.className = this.#frameClassName;
    this.setLed(this.value);

    this.wrapper.appendChild(this.led);
    this.wrapper.appendChild(this.frame);
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

  constructor({name, componentType, posX, posY, value, desktopScale, color, size }) {
    super({name, componentType, posX, posY, value, desktopScale });
    if(typeof value !== 'boolean') throw `Switch ${this.toString()} Illegal Value Type`;
    this.checkBox = document.createElement('input');
    this.color = color;
    this.size = size;
  }


  onClick(e) {
    console.log(e);
    this.setState({value: e});
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
      checked: this.value,
      onChange: (e) => {this.onClick(e)},
      onSwitchColor: this.color,
      offSwitchColor: '#ccc',
    }
    );
    console.log(this.swObject);
    return this.dFragment;
  }
}


class SliderComponent extends InputComponent{
  #sliderClassName = 'slider';
  #sliderValueWrapperClassName = 'sliderValueWrapper';

  width;
  height;
  maxValue;
  minValue;
  slider;
  color;
  style;
  sliderValueWrapper;
  constructor({name, componentType, width, height, posX, posY, value, desktopScale, color, maxValue, minValue }) {
    super({name, componentType, width, height, posX, posY, value, desktopScale});
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.color = color;
    this.width = width;
    this.height = height;
    this.slider = document.createElement('input');
    this.style = document.createElement('style');
    this.sliderValueWrapper = document.createElement('span');
  }

  setIsScrollingEnabled(state){
    if(state){
      document.body.style.position = 'relative';
      document.body.style.overflowX = 'hidden';
      document.getElementsByTagName('html').item(0).style.overflowX = "hidden";
      content.style.overflowX = "hidden";
    } else {
      document.body.style.position = 'absolute';
      document.body.style.overflowX = 'auto';
      document.getElementsByTagName('html').item(0).style.overflowX = "scroll";
      content.style.overflowX = "scroll";
    }
  }

  onChange(e) {
    this.setIsScrollingEnabled(true);
    this.sliderValueWrapper.innerHTML = e.target.value;
    this.setState({value: parseInt(e.target.value)});
  }

  onRelease(e) {
    this.setIsScrollingEnabled(false);
    this.setState({value: parseInt(e.target.value)});
    this.sendData();
  }

  render() {
    super.render();

    this.wrapper.style.display = 'flex';
    this.wrapper.style.flexDirection = 'column';
    this.wrapper.style.alignItems = 'center';

    this.slider.type = "range";
    this.slider.classList.add(this.#sliderClassName);
    this.slider.classList.add(`${this.name}`);        // second, unique class is required because modifying thumb via id is not working
    this.slider.max = this.maxValue;
    this.slider.min = this.minValue;
    this.slider.style.background = '#999';
    this.slider.value = this.value;
    this.slider.style.width = this.width + 'px';
    this.slider.style.height = this.height + 'px';
    this.slider.addEventListener('input', (e) => this.onChange(e));
    this.slider.addEventListener('change', (e) => this.onRelease(e));
    this.slider.addEventListener('click', () => {content.style.overflow = 'hidden'})

    this.style.innerHTML = `.${this.name}::-webkit-slider-thumb {
                                background: ${this.color}; 
                                height: ${this.height * 1.1 + 'px'}; 
                                width: ${this.height * 1.1 + 'px'}};`;

    this.sliderValueWrapper.className = this.#sliderValueWrapperClassName;
    this.sliderValueWrapper.innerHTML = this.value;

    this.wrapper.appendChild(this.style);
    this.wrapper.appendChild(this.slider);
    this.wrapper.appendChild(this.sliderValueWrapper);
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }

}

class NumberInputComponent extends InputComponent {
  #inputClassName = 'input'
  #submitButtonClassName = 'input-btn';

  width;
  fontSize;
  color;

  input;
  submitButton;
  constructor({name, componentType, posX, posY, value, desktopScale, fontSize, width, color}) {
    super({name, componentType, posX, posY, value, desktopScale });
    if(typeof value !== 'number') throw `Number Input ${this.toString()} Illegal Value Type`

    this.width = width;
    this.fontSize = fontSize;
    this.color = color;

    this.input = document.createElement('input');
    this.submitButton = document.createElement('button');
  }


  onSubmit(e){
    this.setState({value: parseFloat(this.input.value)});
    this.sendData()
      .then(data => {
        if(data.status === 200) this.notifyAboutSending('#00b80c');
        else this.notifyAboutSending('red');
      })
  }


  setButtonColor(color){
    this.submitButton.style.border = `solid ${color}`;
    this.submitButton.style.borderWidth = '0 3px 3px 0';
  }

  notifyAboutSending(color) {
    this.setButtonColor(color);
    setTimeout(() => {
      this.setButtonColor('#333');
    },500);
  }

  render() {
    super.render();
    this.input.className = this.#inputClassName;
    this.submitButton.className = this.#submitButtonClassName;

    this.wrapper.style.display = "flex";
    this.wrapper.style.flexDirection = "row";
    this.wrapper.style.justifyContent = "center";
    this.wrapper.style.alignItems = "center";

    this.input.type = "number";
    this.input.value = this.value;
    this.input.style.width = `${this.width}px`;
    this.input.style.fontSize = `${this.fontSize}px`;
    this.input.style.color = this.color;
    this.input.style.borderBottom = `solid 1px ${this.color}`
    this.input.addEventListener('focusout', (e) => {e.target.style.borderBottom = `solid 1px ${this.color}`})
    this.input.addEventListener('focus', (e) => {e.target.style.borderBottom = `solid 2px ${this.color}`})

    this.input.placeholder = this.name;
    this.submitButton.style.padding = `${ Math.round(this.fontSize / 5) }px`;
    this.submitButton.addEventListener('click', (e) => {this.onSubmit(e)});


    this.wrapper.appendChild(this.input);
    this.wrapper.appendChild(this.submitButton);

    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }


}




