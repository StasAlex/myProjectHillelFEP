export default function (array, classname) {
    var menu = document.createElement('ul');
    menu.className = classname;
    var listItems = "";
    array.forEach(function (item) {
        listItems += '<li>' + item + '</li>';
    });
    menu.innerHTML = listItems;
    return menu;
};