import React from 'react';
import './App.css';
import {Map, Polygon, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {api_key} from './config.js';

const style = {
  width: '80vw',
  height: '80vh',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polyCoords: [],
      address: "",
    }
  }

  handleChange = address => {
    console.log("test");
    this.setState({address});
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="searchDiv">
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <div>
                  <input
                    {...getInputProps({ placeholder: "Enter an address"})}
                  />
                  <div>
                    {loading ? <div>Loading...</div> : null}
                    
                    {suggestions.map(suggestion => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#000"
                      };

                      return (
                        <div {...getSuggestionItemProps(suggestion, {style})}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <Map
            className="map"
            centerAroundCurrentLocation
            google={this.props.google}
            onReady={this.fetchPlaces}
            zoom={14}
            style={style}
          >
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

export default GoogleApiWrapper ({
  apiKey: (api_key)
}) (App)