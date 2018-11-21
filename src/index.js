import _ from 'lodash';

// window._ = require('lodash');
import './style.scss';
import Icon from './img/phones.png';


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

