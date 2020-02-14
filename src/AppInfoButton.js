// Author: Seunghun Oh
// Returns a functional modal component that contains the info button and the about modal

import React from "react";
import "./App.css";
import info from "./info.png";
import linkedin from "./linkedinlogo.png";
import github from "./githublogo.png";
import { AppModal } from "./AppModal.js";

export const AppInfoButton = props => {
  return (
    <div>
      <img
        id="infoButton"
        width="25"
        height="25"
        src={info}
        onClick={props.handleModalClose}
        alt=""
      />
      <AppModal
        loadModal={props.loadModal}
        handleModalClose={props.handleModalClose}
      >
        <h4>About this app</h4>
        <p>
          Hi everyone! My name is Seunghun Oh and this app is called Solar Cell
          Installation Calculator.
        </p>
        <p>
          To use this app, either search a location in the search bar or click
          on points in the embedded Google Maps. Clicking on multiples points of
          the map will dynamically shade a polygon area. This area is used to
          calculate the estimated nominal power of solar installations within
          the area.
        </p>
        <p>
          The nominal power of a solar installation is calculated as the
          installation's area in meter squared multiplied by the light intensity
          at that area, measured in Watts per meter squared. For simplification
          purposes, this app will assume the light intensity is 1000 W/m
          <sup>2</sup> and that all of the area highlighted can be used for
          solar installation.
        </p>
        <p>
          The assumptions this app follows are outlined by the Standard Testing
          Conditions (STC). STC is outlined in IEC-61215, IEC-61646, and
          UL-1703. STC also assumes the light is of the same spectrum as of that
          hitting the earth's surface at latitude 35N, and solar cell
          temperatures of 25 degrees Celcius. All these assumptions lead to an
          approximate light intensity of 1000 W/m<sup>2</sup>.
        </p>
        <p>
          The nominal power is dynamically displayed at the bottom of the app.
          The user can also drag the corner markers of the polygon to
          recalculate the nominal power with existing points.
        </p>
        <p>
          If you wish to clear the map of polygon areas, press the Clear Map
          Markers located above the top right side of the embedded Google Maps.
        </p>
        <p id="thankYou">Thank you!</p>
        <div id="thankYouMask" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/seunghunoh/"
        >
          <img width="40" height="40" src={linkedin} alt="" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/seunghunoh57/"
        >
          <img width="40" height="40" src={github} alt="" />
        </a>
      </AppModal>
    </div>
  );
};
