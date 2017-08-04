angular.module('unitary')
.factory('masterDataFactory',function($http) {
    
    var getMachineDetails = function(data) {
        return $http({
        url:"http://uitask.azurewebsites.net/fetchRecords",
        method:'POST',
        data : data,
        headers: {
          'Content-Type': 'application/json'
        } 
        }).then(function(response) {
              return response.data;
        });
    };
    
    return {
        getMachineDetails: getMachineDetails,
    };
});

