var React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var FavoriteStore = require('../stores/FavoriteStore');
var LocationsActions = require('../actions/LocationsActions');

var Favorites = React.createClass({
  render(){
    return(
      <ul>
        {this.props.locations.map( (location, i) => {
          return(
            <li key={i}> {location.name} </li>
          );
        })}
      </ul>
    );
  }
});

var AllLocations = React.createClass({
  addFave(e){
    var location = LocationStore.getLocation(
      Number(e.target.getAttribute('data-id'))
    );
    console.log(location);
    LocationsActions.favoriteLocation(location);
  },

  render(){
    if(this.props.errorMessage){
      return(
        <div>{this.props.errorMessage}</div>
      );
    }
    if(LocationStore.isLoading()){
      return(
        <div>
          is loading...
        </div>
      );
    }
    return(
      <ul>
        {this.props.locations.map( (location, i) => {
          var faveButton = (
            <button onClick={this.addFave} data-id={location.id}>
              Favorite
            </button>
          ); // wrap in a react element
          console.log(faveButton);
          return(
            <li key={i}>
              {location.name} {location.has_favorite ? '<3' : faveButton}
            </li>
          );
        })}
      </ul>
    );
  }
});

var Locations = React.createClass({
  componentDidMount(){
    LocationStore.fetchLocations();
  },
  render(){
    return(
      <div>
        <h1>Locations</h1>
        <AltContainer store={LocationStore}>
          <AllLocations />
        </AltContainer>

        <h1>Favorites</h1>
        <AltContainer store={FavoriteStore}>
          <Favorites />
        </AltContainer>
      </div>
    );
  }
});

module.exports = Locations;
