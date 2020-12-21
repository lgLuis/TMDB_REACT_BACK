const fetch = require ('node-fetch')
const mongoose = require ('mongoose')
const requestLog = require('./requestLog')
const express =require('express')

const app =express();
app.use (express.json());

let searchMovie="";


app.get('search/movies/:searchMovie', (req,res)=>{
    searchMovie=req.params.searchMovie;
//    fetch(`https://api.themoviedb.org/3/search/movie?api_key=b78674d3628205a6d6750bf73d941a40&query=${searchMovie}/`)
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=b78674d3628205a6d6750bf73d941a40&query=${searchMovie}/`)
    .then(res=>res.json())
    .then(resultado=>{
        res.status(200).send({resultado})
    })
    .catch(error=>{
        res.status(404).send({message: "PELICULA NO ENCONTRADA"})
    })
})

let log =new requestLog({
    fecha: new Date(),
    searchMovie:searchMovie
})
log.save().then(function(logCreated){
})

//mongoose.connect('mongodb+srv://root:<password>@cluster0.mjkgl.mongodb.net/<dbname>?retryWrites=true&w=majority', function(err){
mongoose.connect('mongodb+srv://root:casa@cluster0.mjkgl.mongodb.net/tmdb?retryWrites=true&w=majority', function(err){
if(err){
    console.log("ALGO SALIO MAL AL ESTABLECER LA CONEXION")
}else{
    app.listen('4200', (err)=>{
        console.log("SERVER UP AND RUNNING")
    })
    console.log("CONEXION SATISFACTORIA")
    }
});