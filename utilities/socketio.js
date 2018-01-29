var socketIo = require('socket.io');
var db = require('../controller/dbController');
var socketid=[];
module.exports = {
    startService: function (server) {
        io = socketIo(server);
        io.on('connection', function (socket) {
            socketid= socket.id;
       socket.on('receive message', function (lp) { 
          var dishname = lp.dishname;
          console.log(lp)
           console.log(dishname);
            db.updateOrders(dishname,function(nextval){
                var pack = {"dishname":dishname,"nextval":nextval,"prepaired":lp.prepaired}
                console.log(pack);
                io.sockets.emit('send message', pack);
            })
          
           }); 
           socket.on('predictedval',function(data){
               db.predictedValues(data,socketid,function(result){
                  socket.broadcast.emit('predictedValues',data);
               })    
           });
           socket.on('orderval',function(data){
            db.orderValues(data,socketid,function(result){
              if(result) socket.broadcast.emit('orderValues',data);
            })     
        })
        socket.on('refreshed',function(data){
           db.getkitchenPdata(data,socketid,function(result){
              socket.emit('gotrefreshed',result);      
           }) 
            
        })
           socket.on('disconnect',function(){
              console.log('disconnected');
           })
       });
        return io;
    }
};