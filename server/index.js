const express = require('express');
const socketIO = require('socket.io');
const fs = require('fs');
const cors = require('cors');
const readline = require('readline');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

function initSerialPortStream(cb, serialId = "/dev/cu.usbserial-14610") {
  const port = new SerialPort(serialId, { baudRate: 9600 });
  const parser = port.pipe(new Readline({ delimiter: '\n' }));
  port.on("open", () => {
    console.log('serial port open');
  });

  parser.on('data', data =>{
    console.log('got word from arduino:', data);
    cb("can msg", `msg`);
  });
}

const readFile = (cb) => {
  const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/file-stream-example.txt`),
    console: false
  });

  rd.on('line', (line) => {
    console.log('line', line);
    cb(line);

  });

};

// our localhost port
const port = 4001;

const app = express();

app.use(cors({origin: '*:*'}));

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

const io = socketIO(server, {cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}});

io.on('connection', socket => {
  socket.emit("hello", "world");
  console.log('New client connected');
  socket.on("start read", (msg) => {
    console.log('Starting reading', msg);
    const emitMsgHandler = (data) =>  socket.emit("can msg", data);
    // initSerialPortStream(emitMsgHandler);
    readFile(emitMsgHandler);
  });


  socket.on('change color', (color) => {
    console.log('Color Changed to: ', color);
    io.sockets.emit('change color', color)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
});
