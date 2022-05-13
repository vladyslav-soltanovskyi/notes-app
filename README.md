# About a project

This is a project about notes on a native Javascript, but I decided to move away from the standard interaction with DOM elements, and created a simple framework based on which I made the notes project. ([promo](https://youtu.be/n-ShjdSx-Fw), [final project](relaxed-snickerdoodle-f24efa.netlify.app))


# About my simple framework

My framework is a simplified version of react based on class components

# So, it works nice! As sample:

```js
import { jsx, Component } from "../core/framework/index.js";

export default class Test extends Component {
  render() {
    return (
      jsx`<div>Test Component</div>`
    )
  }
}
```

# Manipulation with state and event:
For example:

```js
import { jsx, Component } from "../core/framework/index.js";

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.initState({ count });
  }

  increment = () => {
      this.state.count += 1;
  }


  render() {
    const { count } = this.state;

    return (
      jsx`<div>
        <button onClick="${this.increment}">add</button>
        <span>${count}</span>
      </div>`
    )
  }
}
```
I decided to create two approaches over state manipulation, the first one is the same as in react using `setState`. The second way is to call the `initState` method in the constructor as an argument, it takes an object on which a Proxy `watchObj` handler will be placed
