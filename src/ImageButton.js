// Author: Seunghun Oh
// This button is a custom button class extending from AppButton class.
// This extended class is part of the effort to demonstrate knowledge of object oriented
// JS/ES6 programming
// This button extends from the base button class and highlights the button if it is focused on

import React from "react";
import "./App.css";
import { AppButton } from "./AppButton";

export class ImageButton extends AppButton {
  // Constructor
  constructor(props) {
    super(props);
    this.state = { buttonID: null };
  }

  //   Handle mouse focus being on the button.
  // By using a ternary operator on the previous state, we can use this function for
  //   both hover onto/off of
  handleButtonFocus = () => {
    this.setState((prevState) => ({
      buttonID:
        prevState.buttonID === "imageButtonBackground"
          ? null
          : "imageButtonBackground",
    }));
  };

  render() {
    return (
      <a
        id={this.state.buttonID}
        target="_blank"
        rel="noopener noreferrer"
        href={this.props.URL}
        onMouseEnter={this.handleButtonFocus}
        onMouseLeave={this.handleButtonFocus}
      >
        <img width="40" height="40" src={this.props.imageSource} alt="" />
      </a>
    );
  }
}
