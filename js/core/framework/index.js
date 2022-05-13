import { Component } from "./component.js";
import { render, createPortal } from "./reconciler.js";
import jsx from "./jsx.js";

export default {
    jsx,
    Component,
    render,
    createPortal
};

export { jsx, Component, render, createPortal };