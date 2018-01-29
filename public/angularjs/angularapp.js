angular.module('myApp', []).
controller('myCtrl', function ($scope,$http,$window) { 

    $scope.names = ["Jumbo Chicken Wrap", "Vegetarian Lasagne", "Chicken Rice Feast","Grilled Chicken Breast"];
   
    $http.get("/kitchendisplayreport").then(function(resp){
        resp = resp.data;
        var pre =  resp.data;
        for(var item in pre)
        {   
           var id = document.getElementById(pre[item].name);      
           id.querySelector('#predicted').innerHTML =pre[item]['value'];
        }
        var quan = resp.data1;
        var prepaired=0;
        for(var item in quan)
        {   var id = document.getElementById(quan[item].dishname); 
            if(quan[item]['quantity'].length>0)
            {   var i=0,l=quan[item]['quantity'].length;
            prepaired = 0;
                while(i < l)
                {    
                    if(quan[item]['status'][i]==0)
                    {       
                    id.querySelector('#quantity').innerHTML =quan[item]['quantity'][i];
                    break;
                    }
                    prepaired = prepaired + parseInt(quan[item]['quantity'][i]);
                    i++;
                }
                id.querySelector('#prepaired').innerHTML=prepaired;
            }
            else
            id.querySelector('#quantity').innerHTML = '0';
        }
    })
  
});