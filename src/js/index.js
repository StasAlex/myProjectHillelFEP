import _ from 'lodash';
import createMenu from './menu';
var menu = createMenu(['Главная', "Обо мне", "Портфолио"], 'menu');
document.body.appendChild(menu);

// window._ = require('lodash');
import '../scss/style.scss';
// import Icon from '../img/phones.png';


function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    // var myIcon = new Image();
    // myIcon.src = Icon;
    // element.appendChild(myIcon);


    return element;
};

console.log(_.isEqual(1, 2));


console.log("GoodBye");

document.body.appendChild(component());


