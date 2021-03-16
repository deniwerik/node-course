const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const Filter = require('bad-words')

const port = process.env.PORT || 3000

const path = require('path')
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')

app.use(express.static(publicDirectoryPath))

//let count = 0

// server (emit) -> client (recieve) - countUpdated
// client (emit) -> server (recieve) - increment

io.on('connection', (socket)=>{
    console.log('new web socket connection')

    socket.on('join', (options, callback) => {
        const {error, user} = addUser({
            id: socket.id,
            ...options
        })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin','Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin',`${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()

        //socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    })

    socket.on('sendMessage', (message, callback)=>{
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed ')
        }

        const userData = getUser(socket.id)

        console.log(userData.username)

        io.to(userData.room).emit('message', generateMessage(userData.username,message))
        callback()
    })

    socket.on('sendLocation', (position, callback) => {
        const userData = getUser(socket.id)

        io.to(userData.room).emit('locationMessage', generateLocationMessage(userData.username,`https://google.com/maps?q=${position.latitude},${position.longitude}`))
        callback('Location shared')
    })

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin',`${user.username} has left!`))
            io.to(user.room).emit('roomData',{
                room:user.room,
                users: getUsersInRoom(user.room)
            })
        }


    })

    /*socket.emit('countUpdated', count)

    socket.on('increment', ()=>{
        count++
        //socket.emit('countUpdated', count)
        io.emit('countUpdated', count)
    })*/
})

server.listen(port, () => {
    console.log(`server is up on port ${port}`)
})