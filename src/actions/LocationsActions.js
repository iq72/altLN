var alt = require('../alt');
var LocationSource = require('../sources/LocationSource');

class LocationsActions {
  updateLocations(locations){
    return locations;
  }

  locationsFailed(errorMessage){
    return errorMessage;
  }

  fetchLocations(){
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();
    LocationSource.fetch()
      .then((locations) => {
        // we can access other actions within our action through `this.actions`
        console.log("Fetch successed");
        this.updateLocations(locations);
      })
      .catch((errorMessage) => {
        this.locationsFailed(errorMessage);
    });
  }

  favoriteLocation(locationId){
    this.dispatch(locationdId);
  }

}

module.exports = alt.createActions(LocationsActions);
