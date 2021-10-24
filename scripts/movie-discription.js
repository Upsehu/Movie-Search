import {navbar} from '../components/navbar.js'

document.querySelector('nav').innerHTML = navbar();

let movie = JSON.parse(localStorage.getItem('movie'));

console.log(movie);