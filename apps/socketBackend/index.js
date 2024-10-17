const io = require('socket.io')(3003, {
    cors:{
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket)=>{
    console.log("A driver logged in");

    socket.on('deliveryRequest', ({ driverSocketId, userSocket }) => {
        // Emit the delivery request to the specific driver
        console.log(userSocket);
        io.to(driverSocketId).emit('deliveryRequest', {userSocket});
      });
      socket.on('deliveryResponse', ({ accepted, res }) => {
        console.log(res,accepted);
        io.to(res).emit('deliveryResponse', {accepted});
      });
})

