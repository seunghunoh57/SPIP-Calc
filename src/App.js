import React from 'react';
import './App.css';
import {Map, Polygon, GoogleApiWrapper} from 'google-maps-react';
import {api_key} from './config.js';

const style = {
  width: '80vw',
  height: '80vh',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polyCoords: [],
      searchValue: "taewtaweawet"
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="searchDiv">
            <p>Enter an Address:</p>
            <input type="text" id="searchBar" value={this.state.searchValue} />
          </div>
          <Map
            className="map"
            centerAroundCurrentLocation
            google={this.props.google}
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