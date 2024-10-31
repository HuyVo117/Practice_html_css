// Import styles
import './stylesheets/main.scss';

// Import header HTML
import header from '../layouts/header.html';

// Chèn header vào DOM
document.getElementById('header').innerHTML = header;

// Your JavaScript code here
console.log('Application started');