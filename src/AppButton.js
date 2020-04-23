// Author: Seunghun Oh
// This button is a custom button base class written to be extended upon by other classes
// in order to demonstrate object oriented JS/ES6 programming

import React from "react";
import "./App.css";

export class AppButton extends React.Component {
  render() {
    return (
      <button id={this.props.buttonID} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}
