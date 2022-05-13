import { types } from "./jsx.js";
import { updateDomProperties } from "./dom-utils.js";
import { createPublicInstance } from "./component.js";
import { equals } from "../../utils/equals.js";
import { raf } from "../../utils/animation.js";

let rootInstance = null;
let rooElement = null;
const svgTags = ['svg', 'path'];

export function render(element, container) {
  const prevInstance = (rooElement === null || equals(rooElement, element)) ? rootInstance : null;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
  rooElement = element;
}

export function createPortal(element, container) {
  element.portal = container;
  return element;
}

export function reconcile(parentDom, instance, element) {
  if (instance == null) {
    // Create instance
    const newInstance = instantiate(element);
    const isPortal = !!Object.getOwnPropertyDescriptor(element, 'portal');
    if (isPortal) {
      element.portal.appendChild(newInstance.dom);
    } else {
      parentDom.appendChild(newInstance.dom);
    }
    return newInstance;
  } else if (element == null) {
    // Remove instance
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.element.type !== element.type) {
    // Replace instance
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  } else if (typeof element.tag === "string" || element.type === types.value) {
    // Update instance
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else {
    //Update composite instance
    instance.publicInstance.props = element.props;
    const childElement = instance.publicInstance.render();
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);
    oldChildInstance?.element?.portal?.appendChild?.(childInstance.dom)
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  }
}

function reconcileChildren(instance, element) {
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = element.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances?.length, nextChildElements?.length);
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter((instance) => instance != null);
}

function instantiate(element) {
  const { tag, props, type } = element;
  const isDomElement = typeof tag === "string" || !tag;

  if (isDomElement) {
    // Instantiate DOM element
    const isTextElement = types.value === type;
    let dom;
    if (svgTags.includes(tag)) {
      dom = document.createElementNS('http://www.w3.org/2000/svg', tag);
    } else {
      dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(tag);
    }

    updateDomProperties(dom, {}, props);

    const childElements = element.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map((childInstance) => childInstance.dom);
    childDoms.forEach((childDom) => dom.appendChild(childDom));

    const instance = { dom, element, childInstances };
    return instance;
  } else {
    // Instantiate component element
    const instance = {};
    const publicInstance = createPublicInstance(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;
    
    Object.assign(instance, { dom, element, childInstance, publicInstance });
    
    raf(() => {
      publicInstance.componentDidMount?.();
    })

    return instance;
  }
}