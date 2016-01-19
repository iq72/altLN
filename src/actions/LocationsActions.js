var alt = require('../alt');
var LocationSource = require('../sources/LocationSource');

class LocationsActions {
  updateLocations(locations){
    return locations;
  }

  fetchLocations(){
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();
    LocationSource.fetch().then((locations) =>{
      // we can access other actions within our action through `this.actions`
      console.log("Fetch successed");
      this.updateLocations(locations);
    }).catch((errorMessage)=>{
      this.locationsFailed(errorMessage);
    });
  }

  locationsFailed(errorMessage){
    return errorMessage;
  }

}

module.exports = alt.createActions(LocationsActions);
