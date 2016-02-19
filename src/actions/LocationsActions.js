var alt = require('../alt');

class LocationsActions {
  updateLocations(locations){
    this.dispatch(locations);
  }

  locationsFailed(errorMessage){
    this.dispatch(errorMessage);
  }

  fetchLocations(){
    this.dispatch();
  }

  favoriteLocation(location){
    this.dispatch(location);
  }

}

module.exports = alt.createActions(LocationsActions);
