import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "*"
    }
})

let users = []

io.on("connection", socket => {
    const user = socket.handshake.query
    user.socketId = socket.id

    socket.on("send-chat-message", data => {
        console.log(data);
        socket.broadcast.emit("chat-message", data)
    })

    socket.on("send-upvote", upvoteData => {
        console.log(upvoteData);
        io.emit("upvote", upvoteData)
    })
})