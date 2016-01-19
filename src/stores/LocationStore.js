var alt = require('../alt');
var LocationsActions = require('../actions/LocationsActions');

class LocationStore {
  constructor() {
    this.locations=[];
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateLocations: LocationsActions.UPDATE_LOCATIONS,
      handleFetchLocations: LocationsActions.FETCH_LOCATIONS,
      handleLocationsFailed: LocationsActions.LOCATIONS_FAILED
    });
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
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
