const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const history = []
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors());

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    history.push({ name, message })
    io.emit('message', { name, message })
  })
})

server.listen(8000, function () {
  console.log('listening on port 8000')
})

app.get('/history', function (req, res) {
  res.send(history)

})
