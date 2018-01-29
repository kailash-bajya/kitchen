angular.module('myApp', []).
controller('myCtrl', function ($scope,$http,$window) {
   
    $scope.names = ["Jumbo Chicken Wrap", "Vegetarian Lasagne", "Chicken Rice Feast","Grilled Chicken Breast"];
    $scope.placeorder= function(){
        console.log($scope.quantity);
        console.log($scope.selectedName);
    }
});