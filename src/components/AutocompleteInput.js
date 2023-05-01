import React from "react";
import Autosuggest from "react-autosuggest";

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion) => (
  <div
    key={suggestion.name}
    style={{
      padding: "10px",
      borderBottom: "1px solid #ddd",
      cursor: "pointer",
    }}
  >
    {suggestion.name}
  </div>
);

// Get suggestion value
const getSuggestionValue = (suggestion) => suggestion.name;

const getSuggestions = (value, suggestions) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : suggestions.filter(
        (suggestion) =>
          suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: [],
    };
  }


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.suggestions),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: ["finished"],
    });
  };

  // Handle suggestion selection
  onSuggestionSelected = (event, { suggestion }) => {
    // Update the input value to the selected suggestion
    this.setState({
      value: suggestion.name,
    });

    // Do whatever you want with the selected suggestion
    console.log("Selected suggestion:", suggestion);
  };

  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    const { suggestions } = this.state;
    const inputValue = query.trim().toLowerCase();
    const showNoSuggestions = suggestions.length === 0 && inputValue.length > 0;

    return (
      <div
        {...containerProps}
        style={{
          position: "absolute",
          top: "calc(100% + 5px)",
          left: 0,
          right: 0,
          overflowY: "auto",
          maxHeight: 190,
          backgroundColor: "#fff",
          zIndex: 1,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {showNoSuggestions ? (
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            Aucun suggestion trouvé
          </div>
        ) : (
          children
        )}
      </div>
    );
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange,
      className: this.props.className,
      id: this.props.inputId // Add ID prop
    };

    // Finally, render it!
    return (
      <div style={{ position: "relative", width: "100%" }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          // Handle suggestion selection
          onSuggestionSelected={this.onSuggestionSelected}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
        />
      </div>
    );
  }
}

export default AutocompleteInput;
