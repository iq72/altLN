var React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var LocationsActions = require('../actions/LocationsActions');

var Locations = React.createClass({
  getInitialState(){
    return LocationStore.getState();
  },

  componentDidMount(){
    LocationStore.listen(this.onChange);
    LocationsActions.fetchLocations();
  },

  componentWillUnmount(){
    LocationStore.unlisten(this.onChange);
  },

  onChange(state){
    this.setState(state);
  },
  handleClick(){
    LocationsActions.fetchLocations();
  },
  render(){
    if(this.state.errorMessage){
      return(
        <div>Something is wrong.</div>
      );
    }
    if(!this.state.locations.length){
      return(
        <div>loading...</div>
        // <button type="button" onClick = {this.handleClick} > FetchLocations </button>
      );
    }
    return(
      <AltContainer store={LocationStore}>
      <ul>
        {this.props.locations.map( (location) => {
          return(
            <li>{location.name}</li>
          );
        })}
      </ul>
      </AltContainer>
    );
  }
});

module.exports = Locations;
