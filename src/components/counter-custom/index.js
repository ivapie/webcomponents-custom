import template from './template'

class CounterCustom extends HTMLElement{
  constructor() {
    // always call super() first in the constructor.
    super(); 
    // Import HTML / CSS Template
    this.template = document.createElement('template')
    this.template.innerHTML = template
    // Attach a shadow root to the element.
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    // DOM Elements
    this.incrementBtn = this.shadowRoot.querySelector('[increment]');
    this.decrementBtn = this.shadowRoot.querySelector('[decrement]');
    this.displayVal = this.shadowRoot.querySelector('span');
    // Functions
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  static get observedAttributes() { 
    return ['value']; 
  }
  connectedCallback() {
    // Initial
    this.incrementBtn.addEventListener('click', this.increment)
    this.decrementBtn.addEventListener('click', this.decrement)
    if(!this.hasAttribute('value'))
      this.setAttribute('value', 1)
  }
  disconnectedCallback() {
    console.info('TitleCustom disconnected')
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('attributeChangedCallback',attrName, oldVal, newVal)
    if(oldVal !== newVal){
      this.displayVal.innerText = this.value;
    }
  }
  // Functions Custom
  increment(){
    this.setAttribute('value', ++this.value)
  }
  decrement(){
    this.setAttribute('value', --this.value)
  }
  get value() {
    return this.getAttribute('value');
  }
  set value(newValue) {
    this.setAttribute('value', newValue);
  }
}
// Define the new element
customElements.define('counter-custom', CounterCustom);
