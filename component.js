const componentWrapperClassName = 'c-wrapper';
class Component {
  constructor({name, componentType, posX, posY, value}) {
    this.name = name;
    this.componentType = componentType;
    this.posX = posX;
    this.posY = posY;
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
    this.wrapper.style.top = `${this.posY}px`;
    this.wrapper.style.left =`${this.posX}px`;
  }
}

class InputComponent extends Component {
  constructor({name, componentType, posX, posY, value }) {
    super({name, componentType, posX, posY, value});
  }
  toJson() {
    return{
      name: this.name,
      componentType: this.componentType,
      value: this.value
    }
  }

  notifyAboutSendingStatus(color){

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
  constructor({name, componentType, posX, posY, value}) {
    super({name, componentType, posX, posY, value});
  }

}


class Label extends OutputComponent {
  constructor({name, componentType, posX, posY, value, fontSize, color }) {
    super({name, componentType, posX, posY, value});
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
  constructor({name,componentType, posX, posY, value, color, minValue, maxValue, width, height}) {
    super({name, componentType, posX, posY, value});

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
  constructor({name, componentType, posX, posY, value, color, size }) {
    super({name, componentType, posX, posY, value});
    this.color = color;
    this.size = size;
    this.inner = document.createElement('div');
    this.outer = document.createElement('div');

    this.innerClassName = "inner-led";
    this.outerClassName = "outer-led";
    this.outerToInnerSizeFactor = 5/9;
    this.offColor = "#777";
    this.outerColor = "#555";
    this.innerSize = Math.round(this.size * this.outerToInnerSizeFactor);
  }

  setState(state) {
    super.setState(state);
    this.color = state.color;
    this.setLed(state.value);
  }


  setLed(value){
    if(value){
      this.inner.style.backgroundColor = this.color;
      this.inner.style.boxShadow = `0 0 ${Math.round(this.innerSize / 3)}px ${this.color}`
    } else {
      this.inner.style.backgroundColor = this.offColor;
      this.inner.style.boxShadow = `none`;
    }
  }

  render() {
    super.render();
    this.outer.className = this.outerClassName;
    this.inner.className = this.innerClassName;
    this.outer.style.width = `${this.size}px`;
    this.outer.style.height = `${this.size}px`;
    this.outer.style.backgroundColor = this.outerColor;
    this.inner.style.width = `${this.innerSize}px`;
    this.inner.style.height = `${this.innerSize}px`;
    this.setLed(this.value);

    this.outer.appendChild(this.inner);
    this.wrapper.appendChild(this.outer);
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }
}

class ProgressBarComponent extends OutputComponent{
  constructor({name, componentType, posX, posY, value, maxValue, minValue,width, height, color, isVertical}) {
    super({name, componentType, posX, posY, value});
    this.progressBarClassname = "progress-bar";
    this.maxValue = maxValue;
    this.minValue = minValue;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isVertical = isVertical;
    this.progressBar = document.createElement('progress');
    this.style = document.createElement('style');
  }
  setState(state) {
    super.setState(state);
  }
  render() {
    super.render();
    this.progressBar.classList.add(this.progressBarClassname);
    this.progressBar.classList.add(this.name); // second unique class to webkit styles
    this.progressBar.max = this.maxValue;
    this.progressBar.min = this.minValue;
    this.progressBar.value = this.value;
    this.progressBar.style.width = `${this.width}px`;
    this.progressBar.style.height = `${this.height}px`;
    if(this.isVertical) this.wrapper.style.transform = "rotate(-90deg)";
    this.style.innerHTML = `.${this.name}::-webkit-progress-value{background-color: ${this.color};}`;
    this.wrapper.appendChild(this.style);
    this.wrapper.appendChild(this.progressBar);
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }
}
class SwitchComponent extends InputComponent {
  constructor({name, componentType, posX, posY, value, color, size }) {
    super({name, componentType, posX, posY, value});
    if(typeof value !== 'boolean') throw `Switch ${this.toString()} Illegal Value Type`;
    this.switchCheckBoxClassName = "onoffswitch-checkbox";
    this.checkBox = document.createElement('input');
    this.color = color;
    this.size = size;
  }
  onClick(e) {
    console.log(e.target.checked);
    this.setState({value: e.target.checked});
    super.sendData();
  }
  render() {
    super.render();
    this.checkBox.type = 'checkbox';
    this.checkBox.className = this.switchCheckBoxClassName+this.name;
    this.checkBox.style.width = `${this.size}px`;
    this.checkBox.style.height = `${this.size}px`;
    this.checkBox.addEventListener('change', e => {this.onClick(e)});
    this.wrapper.appendChild(this.checkBox);
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }
}

class SliderComponent extends InputComponent{

  constructor({name, componentType, width, height, posX, posY, value, color, maxValue, minValue }) {
    super({name, componentType, width, height, posX, posY, value});
    this.sliderClassName = 'slider';
    this.sliderValueWrapperClassName = 'sliderValueWrapper';
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
      content.style.overflow = "hidden";
    } else {
      content.style.overflow = "scroll";
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
    this.slider.classList.add(this.sliderClassName);
    this.slider.classList.add(`${this.name}`);        // second, unique class is required because modifying thumb via id is not working
    this.slider.max = this.maxValue;
    this.slider.min = this.minValue;
    this.slider.style.background = '#999';
    this.slider.value = this.value;
    this.slider.style.width = this.width + 'px';
    this.slider.style.height = this.height + 'px';
    this.slider.addEventListener('input', (e) => this.onChange(e));
    this.slider.addEventListener('change', (e) => this.onRelease(e));
    //append style to slider thumb (Firefox/Chrome)
    this.style.innerHTML = `.${this.name}::-webkit-slider-thumb {background: ${this.color}; height: ${this.height * 1.1 + 'px'}; width: ${this.height * 1.1 + 'px'};}
                                .${this.name}::-moz-range-thumb {background: ${this.color}; height: ${this.height * 1.1 + 'px'}; width: ${this.height * 1.1 + 'px'};}`;
    this.sliderValueWrapper.className = this.sliderValueWrapperClassName;
    this.sliderValueWrapper.innerHTML = this.value;

    this.wrapper.appendChild(this.style);
    this.wrapper.appendChild(this.slider);
    this.wrapper.appendChild(this.sliderValueWrapper);
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }

}

class NumberInputComponent extends InputComponent {
  constructor({name, componentType, posX, posY, value, fontSize, width, color}) {
    super({name, componentType, posX, posY, value});
    if(typeof value !== 'number') throw `Number Input ${this.toString()} Illegal Value Type`;
    this.inputClassName = 'input';
    this.submitButtonClassName = 'input-btn';
    this.width = width;
    this.fontSize = fontSize;
    this.color = color;
    this.input = document.createElement('input');
  }


  onSubmit(e){
    this.setState({value: parseFloat(this.input.value)});
    this.sendData()
      .then(data => {
        if(data.status === 200) this.notifyAboutSendingStatus('#00b80c');
        else this.notifyAboutSendingStatus('red');
      })
  }


  setColor(color){
    this.input.style.borderBottom = `solid 2px ${color}`;
  }

  notifyAboutSendingStatus(color) {
    this.setColor(color);
    setTimeout(() => {
      this.setColor(this.color);
    },500);
  }

  render() {
    super.render();
    this.input.className = this.inputClassName;

    this.wrapper.style.display = "flex";
    this.wrapper.style.flexDirection = "row";
    this.wrapper.style.justifyContent = "center";
    this.wrapper.style.alignItems = "center";

    this.input.type = "number";
    this.input.value = this.value;
    this.input.style.width = `${this.width}px`;
    this.input.style.fontSize = `${this.fontSize}px`;
    this.input.style.color = this.color;
    this.input.style.borderBottom = `solid 1px ${this.color}`;
    this.input.addEventListener('focusout', (e) => {e.target.style.borderBottom = `solid 1px ${this.color}`});
    this.input.addEventListener('focus', (e) => {e.target.style.borderBottom = `solid 2px ${this.color}`});
    this.input.addEventListener('change', (e) => {this.onSubmit(e)})
    this.input.placeholder = this.name;

    this.wrapper.appendChild(this.input);
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }
}


class ButtonComponent extends InputComponent{
  constructor({name, componentType, posX, posY, value, color, text, textColor, fontSize, width, height, isVertical}) {
    super({name, componentType, posX, posY, value});
    this.buttonClassName = "button";
    this.isButtonPressed = false;
    this.color = color;
    this.text = text;
    this.fontSize = fontSize;
    this.textColor = textColor;
    this.width = width;
    this.height = height;
    if(isVertical) this.textToVertical();
    this.button = document.createElement('button');
  }

  notifyAboutSendingStatus(color) {
    this.button.style.boxShadow = `0 0 10px ${color}`;
  }

  deleteNotifyingShadow(){
    this.button.style.boxShadow = 'none';
  }
  onClick(e) {
    this.isButtonPressed = true;
    this.value = true;
    const send = () => {
      this.sendData()
        .then(res => {
          if (res.status === 200) this.notifyAboutSendingStatus('#00b80c');
          else this.notifyAboutSendingStatus('red');
          if (!this.isButtonPressed) this.deleteNotifyingShadow();
        });
      if (this.isButtonPressed) setTimeout(send, 100);
      else this.deleteNotifyingShadow();
    }
    send();
  }
  onRelease(e){
    this.isButtonPressed = false;
    this.value = false;
    this.sendData();
  }


  textToVertical(){
    console.log(this.text);
    let newText = '';
    for(let i = 0; i < this.text.length; i++){
      newText += `${this.text.charAt(i)}<br/>`;
    }
    this.text = newText;
  }

  render() {
    super.render();
    this.button.className = this.buttonClassName;
    this.button.innerHTML = this.text;
    this.button.style.fontSize = `${this.fontSize}px`;
    this.button.style.color = this.textColor;
    this.button.style.backgroundColor = this.color;
    this.button.style.width = `${this.width}px`;
    this.button.style.height = `${this.height}px`;
    this.button.addEventListener('mousedown', (e) => {this.onClick(e)});
    this.button.addEventListener('click', (e) => {this.onRelease(e)});
    this.button.addEventListener("touchstart", (e) => {this.onClick(e)}, false);
    this.button.addEventListener("touchend", (e) => {this.onRelease(e)}, false);

    this.wrapper.appendChild(this.button);
    this.dFragment.appendChild(this.wrapper);
    return this.dFragment;
  }
}




