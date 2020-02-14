// Author: Seunghun Oh
// Returns a functional component that uses a Google Maps autocomplete feature

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
          <input {...getInputProps({ placeholder: "Enter an address" })} />
          <div>
            {loading ? <div>Loading...</div> : null}

            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#000"
              };

              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
