'use strict';
angular.module('unitary').
controller('MainCtrl', ['$scope', '$http','masterDataFactory',function($scope,$http,masterDataFactory) {
 	  var requestObject = {};
 	  $scope.showError = false;
 	  $scope.noOfRecords = false;
    $scope.tagItemCopy=['',''];
      //Sample data for pie chart
    $scope.pieData = [];
    $scope.submit = function (){
    	$scope.errors=[];$scope.records=[];$scope.showError = false;$scope.message="";
    	if(validationCheck()) {$scope.showError = true;return;}
    	$scope.message="Searching...";
    	requestObject = 
			{
			"RequestObject":"Telemetry",
			"UserID": "Admin",
			"containerName":"garwareanaloginputtelemetry",
			"fromDate": $scope.fromDate.toJSON().substr(0, 10) + " " + $scope.fromDate.toJSON().substr(11,8),
			"toDate": $scope.toDate.toJSON().substr(0, 10) + " " + $scope.toDate.toJSON().substr(11,8),
			"Tags":$scope.tagItem
			};
      $scope.tagItemCopy   = $scope.tagItem ;
      masterDataFactory.getMachineDetails(requestObject).then(function(data){
        $scope.pieData = new Array();
            for (var i = 0; i < data.length; i++) {
                $scope.pieData.push({ x: data[i][$scope.tagItemCopy[0]] ,y: data[i][$scope.tagItemCopy[1]]});
            }
        $scope.records=data;
        $scope.noOfRecords = (data.length) > 0 ;  
        $scope.message =  (!$scope.noOfRecords) ? "No records round" : data.length + " Records found";
        console.log($scope.pieData);
      });
    	 
    	function validationCheck(){
    		if($scope.fromDate == undefined){
    			$scope.errors.push('Enter From Date');
    		}
    		if($scope.toDate == undefined){
    			$scope.errors.push('Enter To Date');
    		}
    		if($scope.tagItem ==  undefined )
    		{
    			$scope.errors.push('Enter Tag Item'); 
    		}
    		else if( $scope.tagItem.length !== 2){
    			$scope.errors.push('Please select two tag items');
    		}
    		return $scope.errors.length==0?false :true;
    	};
    };
}]);