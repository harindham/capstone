const path=require('path');
const express=require('express');
const app=express();
const server=require('http').server(app);
const io=require('socket.io')(server);
const cv=require('opencv4node.js');

const wCap = new cv.VideoCapture(0);

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

setInterval(() => {
    const frame=wCap.read();
    const image=cv.imencode('.jpg',frame).toString('base64');
    io.emit('image','some data');
},1000) 


app.listen(3000);