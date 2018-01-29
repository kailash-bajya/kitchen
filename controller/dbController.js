var fs = require('fs');
function predictedValues(req,res,callback){
   fs.readFile(__dirname +'/../data/' + 'predicted.json',function(err,data){
       data = JSON.parse(data);
     //  req.dishname
       for(item in data){
           if(req.dishname == data[item].name)
           {
              data[item].value = req.amount;
              callback(data)
              break;
           }
       }
       fs.writeFile(__dirname+'/../data/'+'predicted.json',JSON.stringify(data),function(err){

       })
   })
}
exports.predictedValues = predictedValues;
function getkitchenPdata(req,res){
    
   fs.readFile(__dirname +'/../data/' + 'predicted.json',function(err,data){
       data = JSON.parse(data);
       fs.readFile(__dirname +'/../data/' + 'orders.json',function(err,data1){
        data1 = JSON.parse(data1);
        var data2 = {data,data1};
        res.send(data2);
    });
   });

}
exports.getkitchenPdata = getkitchenPdata;
function orderValues(req,res,callback){
    fs.readFile(__dirname +'/../data/' + 'orders.json',function(err,data){
        data = JSON.parse(data);
        for(var item in data){
        if(data[item]['dishname']==req.dishname)
         {    
        var ordern = data[item]['quantity'].length;
       // var orders = data[item]['status'].length ;
        data[item]['quantity'][ordern] = req.amount;
        data[item]['status'][ordern] = 0;
        break;
       }
    }
    
    fs.writeFile(__dirname +'/../data/'+'orders.json',JSON.stringify(data),function(err){
        if(ordern == 0 )
        { callback(true)}
        else if(ordern >0){
            if(data[item]['status'][ordern-1]==0)
             callback(false);
             else
             callback(true);
        }    
    })
    });
}
exports.orderValues = orderValues;

function updateOrders(req,callback){
    fs.readFile(__dirname +'/../data/' + 'orders.json',function(err,data){
        data = JSON.parse(data);
        var next=0;
        for(var item in data){
        if(data[item]['dishname']==req)
         {   var stat = data[item]['status'];
            for(item1 in stat )
            {
                if(stat[item1] ==0){
                    data[item]['status'][item1]=1;
                    var item3 = parseInt(item1)
                    if(data[item]['status'].length > (item3+1))
                    {   var item2 = parseInt(item1) +1;
                        next = data[item]['quantity'][item2];}
                    else
                   {  next =0;}
                    break;
                }
            }
         }
        }
        fs.writeFile(__dirname+'/../data/'+'orders.json',JSON.stringify(data),function(err){
            callback(next);
                   })
    })
}
exports.updateOrders = updateOrders;
