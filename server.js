const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
let readyPlayerCount = 0;

io.on("connection", (socket) => {
    console.log('a user has connected:', socket.id);

    socket.on('ready', () => {
        console.log('Player', socket.id, 'ready');
        readyPlayerCount++;
        if (readyPlayerCount === 2) {
            // broadcast an event
            io.emit('startGame', socket.id);
        }
    });

    socket.on('paddleMove', (paddleData) => {
        socket.broadcast.emit('paddleMove', paddleData);
    });

    socket.on('ballMove',(ballData) => {
        socket.broadcast.emit('ballMove', ballData);
    })
});

io.listen(3000);