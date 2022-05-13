import { reconcile } from "./reconciler.js";
import { watchObj } from "./watchObj.js";

export class Component {
    constructor(props) {
        this.props = props;
        this.state = this.state || {};
        this.refs = {};
    }

    componentDidMount() {}

    // two options for manipulating the state
    
    setState(partialState) {
        this.state = Object.assign({}, this.state, partialState);
        updateInstance(this.__internalInstance);
    }
    
    initState(obj) {
        this.state = watchObj(obj, () => updateInstance(this.__internalInstance));
    }
}

export function createPublicInstance(element, internalInstance) {
  const { tag, props } = element;
  const publicInstance = new tag(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
}

function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;
  reconcile(parentDom, internalInstance, element);
}