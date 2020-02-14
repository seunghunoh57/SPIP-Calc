// Author: Seunghun Oh
// This project displays a Google Maps from which you can draw polygons to calculate nominal power
// of the said polygon. This project also allows for searching of Google Maps Places

import React from "react";
import "./App.css";
import dot from "./markerdot.png";
import info from "./info.png";
import linkedin from "./linkedinlogo.png";
import github from "./githublogo.png";
import { Map, Marker, Polygon, GoogleApiWrapper } from "google-maps-react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { api_key } from "./config.js";
import { AppAutocomplete } from "./AppAutocomplete";
import { AppModal } from "./AppModal.js";

const style = {
  width: "75vw",
  height: "75vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

export class App extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      currentCoord: {
        lat: null,
        lng: null
      },
      polyCoords: [],
      address: "",
      loadModal: false
    };
  }

  // On info button click, loads modal
  handleModalClose = event => {
    this.setState(prevState => ({ loadModal: !prevState.loadModal }));
  };

  // Handle change in search bar by changing the appropriate state value
  handleChange = address => {
    this.setState({ address });
  };

  // Handle selection of an address in the autocomplete
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log("Success", latLng);
        this.setState({ currentCoord: latLng });
      })
      .catch(error =>
        console.error("Error while retrieving coordinates", error)
      );
  };

  // handle the change in marker's coordinates after it is dragged
  changeMarkerCoord = (marker, newCoord) => {
    // replace marker.position from this.state.polyCoords with newCoord.latLng
    // e is

    var tempPolyCoords = [...this.state.polyCoords];
    var idx = tempPolyCoords.indexOf(marker.position);

    console.log(idx);
    if (idx !== -1) {
      // change polyCoords state right here
      tempPolyCoords.splice(idx, 1, newCoord.latLng);
      this.setState({ polyCoords: tempPolyCoords });
    }
  };

  // Place marker with given parameter coordinates onto the Google Maps
  placeMarker = coord => {
    return (
      <Marker
        draggable
        icon={dot}
        position={coord}
        onDragend={(e, map, coord) => this.changeMarkerCoord(e, coord)}
      />
    );
  };

  // Finds the coordinates of newly places marker and adds it to the Map
  placeNewMarker = (mapProps, map, clickEvent) => {
    console.log(
      "Clicked coordinate: ",
      clickEvent.latLng.lat(),
      clickEvent.latLng.lng()
    );

    var coord = clickEvent.latLng;
    this.setState(prevState => ({
      polyCoords: prevState.polyCoords.concat(coord)
    }));
  };

  // Places markers on the map to indicate draggable corners of nominal area polygon
  placePolyMarkers = () => {
    return this.state.polyCoords.map(coord => {
      return this.placeMarker(coord);
    });
  };

  // Calculate the nominal power of the drawn polygon
  // Nominal power is calculated
  calcNominalPower = () => {
    var polyArea = this.props.google.maps.geometry.spherical.computeArea(
      this.state.polyCoords
    );
    return ((polyArea * 1000) / 1000000).toFixed(polyArea === 0 ? 0 : 2);
  };

  // Clear all polygon corner markers that have been placed on the map
  clearPolyCoords = () => {
    this.setState({ polyCoords: [] });
  };

  render() {
    return (
      <div className="App">
        <div className="App-body">
          <h4 id="title">Solar Cell Installation Calculator</h4>
          <img
            id="infoButton"
            width="25"
            height="25"
            src={info}
            onClick={this.handleModalClose}
            alt=""
          />
          <AppModal
            loadModal={this.state.loadModal}
            handleModalClose={this.handleModalClose}
          >
            <h4>About this app</h4>
            <p>
              Hi everyone! My name is Seunghun Oh and this app is called Solar
              Cell Installation Calculator.
            </p>
            <p>
              To use this app, either search a location in the search bar or
              click on points in the embedded Google Maps. Clicking on multiples
              points of the map will dynamically shade a polygon area. This area
              indicates the estimated nominal power of solar installations
              within the area, which is also dynamically displayed at the bottom
              of the app.
            </p>
            <p>
              If you wish to clear the map of polygon areas, press the Clear Map
              Markers located above the top right side of the embedded Google
              Maps.
            </p>
            <p id="thankYou">Thank you!</p>
            <div id="thankYouMask" />
            <a href="https://www.linkedin.com/in/seunghunoh/">
              <img width="40" height="40" src={linkedin} alt="" />
            </a>
            <a href="https://github.com/seunghunoh57/">
              <img width="40" height="40" src={github} alt="" />
            </a>
          </AppModal>
          <div id="searchDiv">
            <AppAutocomplete
              address={this.state.address}
              handleChange={this.handleChange}
              handleSelect={this.handleSelect}
            />
          </div>
          <button id={"clearMarkerButton"} onClick={this.clearPolyCoords}>
            Clear Map Markers
          </button>
          <Map
            className="map"
            centerAroundCurrentLocation
            center={this.state.currentCoord}
            google={this.props.google}
            onReady={this.fetchPlaces}
            onClick={this.placeNewMarker}
            zoom={14}
            style={style}
          >
            {this.placePolyMarkers()}
            <Polygon
              paths={this.state.polyCoords}
              strokeColor="#FF0000"
              strokeOpacity={0.8}
              strokeWeight={2}
            />
          </Map>
          <div id="footer">
            <p id={"powerNumber"}>
              Nominal Power: {this.calcNominalPower()} Megawatts
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: api_key,
  libraries: ["geometry", "places"]
})(App);
