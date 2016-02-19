var LocationsActions = require('../actions/LocationsActions');
var mockData = [
  { id: 0, name: 'Abu Dhabi' },
  { id: 1, name: 'Berlin' },
  { id: 2, name: 'Bogota' },
  { id: 3, name: 'Buenos Aires' },
  { id: 4, name: 'Cairo' },
  { id: 5, name: 'Chicago' },
  { id: 6, name: 'Lima' },
  { id: 7, name: 'London' },
  { id: 8, name: 'Miami' },
  { id: 9, name: 'Moscow' },
  { id: 10, name: 'Mumbai' },
  { id: 11, name: 'Paris' },
  { id: 12, name: 'San Francisco' }
];

var LocationSource = {
  fetchLocations() {
    return {
      remote(){
        return new Promise(function(resolve, reject){
          //simulate an asynchronous flow
          setTimeout(function(){
            if(true){ //change to false to see errorMessage
              resolve(mockData);
            }else{
              reject('Things have broken');
            }
          },250);
        });
      },
      local(){
        //Never check locally, always fetch remotely
        return null;
      },
      success: LocationsActions.updateLocations,
      error: LocationsActions.locationsFailed,
      loading: LocationsActions.fetchLocations
    }
  }
};

module.exports = LocationSource;
