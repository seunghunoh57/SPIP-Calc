// Author: Seunghun Oh
// This project displays a Google Maps from which you can draw polygons to calculate nominal power
// of the said polygon. This project also allows for searching of Google Maps Places

import React from "react";
import "./App.css";
import dot from "./markerdot.png";
import { Map, Marker, Polygon, GoogleApiWrapper } from "google-maps-react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { api_key } from "./config.js";
import { AppAutocomplete } from "./AppAutocomplete";

const style = {
  width: "80vw",
  height: "80vh",
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
      address: ""
    };
  }

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
  changeMarkerCoord = e => {
    console.log(e);
    console.log(this.props);
  };

  // Place marker with given parameter coordinates onto the Google Maps
  placeMarker = coord => {
    return (
      <Marker
        draggable
        icon={dot}
        position={coord}
        onDragend={e => this.changeMarkerCoord(e)}
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
    console.log("poly", this.state);
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
  calcNominalPower = () => {
    return this.props.google.maps.geometry.spherical
      .computeArea(this.state.polyCoords)
      .toFixed(2);
  };

  // Clear all polygon corner markers that have been placed on the map
  clearPolyCoords = () => {
    this.setState({ polyCoords: [] });
  };

  render() {
    return (
      <div className="App">
        <div className="App-body">
          <div id="searchDiv">
            <AppAutocomplete
              address={this.state.address}
              handleChange={this.handleChange}
              handleSelect={this.handleSelect}
            />
          </div>
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
            <p id={"areaNumber"}>
              Nominal Power: {this.calcNominalPower()} m<sup>2</sup>
            </p>
            <button id={"clearMarkerButton"} onClick={this.clearPolyCoords}>
              Clear Map
            </button>
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
