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

  handleChange = address => {
    this.setState({ address });
  };

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

  placeMarker = coord => {
    return <Marker draggable icon={dot} position={coord} />;
  };

  placeNewMarker = (mapProps, map, clickEvent) => {
    console.log(
      "Clicked coordinate: ",
      clickEvent.latLng.lat(),
      clickEvent.latLng.lng()
    );

    var coord = { lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng() };
    console.log(typeof coord.lat);
    this.setState(prevState => ({
      ...prevState,
      polyCoords: prevState.polyCoords.concat(coord)
    }));
  };

  placePolyMarkers = () => {
    console.log(this.state.polyCoords);
    return this.state.polyCoords.map(coord => {
      return this.placeMarker(coord);
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
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
        </header>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: api_key
})(App);
