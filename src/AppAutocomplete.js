// Author: Seunghun Oh
// Returns a functional component that uses a Google Maps autocomplete feature
// The Autocomplete gest inputs from the user, then usus Google Places API to genesate suggestions.
// The suggestions are then used to generate suggestion items.

import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "./App.css";

export function AppAutocomplete(props) {
  return (
    <PlacesAutocomplete
      value={props.address}
      onChange={props.handleChange}
      onSelect={props.handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            id="searchBar"
            {...getInputProps({ placeholder: "Enter a location" })}
          />
          <div>
            {loading ? (
              <div className="searchResultsContainer">Loading...</div>
            ) : null}
            <div className="searchResultsContainer">
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#ff6961" : "#e9e9e4",
                  "font-size": "22px"
                };

                return (
                  <div
                    className="searchResult"
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
