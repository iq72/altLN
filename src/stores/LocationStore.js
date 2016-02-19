var alt = require('../alt');
var LocationsActions = require('../actions/LocationsActions');
var FavoriteStore = require('./FavoriteStore');
var LocationSource = require('../sources/LocationSource');

class LocationStore {
  constructor() {
    this.locations=[];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateLocations: LocationsActions.UPDATE_LOCATIONS,
      handleFetchLocations: LocationsActions.FETCH_LOCATIONS,
      handleLocationsFailed: LocationsActions.LOCATIONS_FAILED,
      setFavorites: LocationsActions.FAVORITE_LOCATION
    });

    this.exportPublicMethods({
      getLocation: this.getLocation
    });

    this.exportAsync(LocationSource);
  }

  handleUpdateLocations (locations){
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchLocations(){
    this.locations=[];
  }

  handleLocationsFailed(errorMessage){
    this.errorMessage = errorMessage;
  }

  resetAllFavorites(){
    this.locations =  this.locations.map( (location) => {
      return {
        id: location.id,
        name: location.name,
        has_favorite: false
      };
    });
  }
  setFavorites(location){
    this.waitFor(FavoriteStore);

    var favoritedLocations = FavoriteStore.getState().locations;

    this.resetAllFavorites();

    favoritedLocations.forEach((location) => {
      for ( var i= 0; i<this.locations.length; i++){
        if(this.locations[i].id === location.id){
          this.locations[i].has_favorite = true;
          break;
        }
      }
    });
  }

  getLocation(id){
    var { locations } = this.getState();
    for (var i=0; i < locations.length; i++) {
      if(locations[i].id === id){
        return locations[i];
      }
    }

    return null;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
