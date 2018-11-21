import _ from 'lodash';
// import createMenu from './menu';
// var menu = createMenu(['Главная', "Обо мне", "Портфолио"], 'menu');
// document.body.appendChild(menu);
import jquery from "jquery";
window._ = require('lodash');
import '../scss/style.scss';
// import Icon from '../img/phones.png';



window.addEventListener('load', function loadGame() {// when the DOM loaded switch the game

    var gameField = $('.gameField');
    var go = $('#go');
    var body = $(".body");
    var clicked = new Audio('https://raw.githubusercontent.com/emasys/webDev/master/ticgame/sound/click.mp3');
    var twoSimilar = new Audio('https://raw.githubusercontent.com/emasys/webDev/master/ticgame/sound/draw.mp3');
    var won = new Audio('https://raw.githubusercontent.com/emasys/webDev/master/ticgame/sound/victory.mp3');;

    getJsonFile();//request of fieldSize

    $(go).click(getJsonFile);

    function getJsonFile() {//request of fieldSize
        let myAPI = "https://kde.link/test/get_field_size.php";
        $.getJSON(myAPI, {
            format: "json"
        })
            .done(function (data) {
                let dataHeight = data.height;
                let dataWidth = data.width;
                cleanGamefield();
                createGameField(dataHeight, dataWidth);
                gamePictures(dataHeight, dataWidth);
                closeCells();
            });

    };

    function createGameField(height, width) {
        $(body).css('background', 'white');
        var rows = [],
            cells = [];
        for (let i = 0; i < height; i++) {
            rows[i] = document.createElement('div');
            rows[i].classList.add('row');
            $(gameField.append(rows[i]));
            for (let j = 0; j < width; j++) {
                cells[j] = document.createElement('div');
                cells[j].classList.add('cell');
                cells[j].index = i + ',' + j;
                $(rows[i].append(cells[j]));
            }
        }
        $('.title').text('Open all pictures').css("font-size", "20px");

    };


    function cleanGamefield() {
        let rows = $('.row');
        if (rows.length !== 0) {
            for (var i = rows.length - 1; i >= 0; i--) {
                rows[i].remove();
            }
        }
    };

    function gamePictures(width, height) {
        let images = [],
            cells = $('.cell');

        for (let i = 0; i < (width * height) / 2; i++) {
            if (i < 10) {
                images[i] = 'http://kde.link/test/' + i + '.png';
            }
            if (i >= 10 && i < 20) {
                images[i] = 'http://kde.link/test/' + (i - 10) + '.png';
            }
            if (i >= 20 && i < 30) {
                images[i] = 'http://kde.link/test/' + (i - 20) + '.png';
            }
            if (i >= 30 && i < 40) {
                images[i] = 'http://kde.link/test/' + (i - 30) + '.png';
            }
        }

        let images2 = images.concat(images);

        images2.sort(function () {
            return Math.random()-0.5
        });

        for (let j = 0; j < cells.length; j++) {
            cells[j].style.backgroundImage = 'url' + '(' + images2[j] + ')';
        }
    };

    function closeCells() {
        var cells = $('.cell');
        for (var i = 0; i < cells.length; i++) {
            cells[i].classList.add('closeCell');
        }
    }

    function addActive(e) {
        if (e.target.index && !e.target.classList.contains('active-always')) {
            e.target.classList.remove('closeCell');
            e.target.classList.add('active');
        }
    }

    function addActiveAlways(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].classList.remove('active');
            arr[i].classList.add('active-always');
            arr[i].classList.add('white');
        }
    }

    function classHover(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].classList.remove('active');
            arr[i].classList.add('closeCell');
        }
    }

    function victory() {
        var win = $('.active-always');
        var size = $('.cell');

        if (win.length === size.length) {
            cleanGamefield();
            $('.title').text('You are the best!!!').css({"text-transform": "uppercase","font-size": "50px"});
            $('.body').css('background', 'red');
            won.play();
        }
    }

    $('.gameField').on("click", function openImages(e) {
        clicked.play();
        addActive(e);

       var active = $('.active');
        if (active.length === 2) {

            var pictureStyle1 = active[0].getAttribute('style');
            var pictureStyle2 = active[1].getAttribute('style');
            if (pictureStyle1 === pictureStyle2) {
                addActiveAlways(active);
                twoSimilar.play();
            } else {
                setTimeout(classHover, 500, active);
            }
            victory();

        }
    });
});
