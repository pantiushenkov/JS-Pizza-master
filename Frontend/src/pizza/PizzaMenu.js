
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");
    //Онволен;ня однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({
            pizza: pizza
        });
        var $node = $(html_code);
        $node.find(".pizza-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".pizza-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });
        $pizza_list.append($node);
    }
    list.forEach(showOnePizza);
    $('.pizza-count').text('').append(list.length);
}
    $(".pizza-button").click(function(){
     if($(this).hasClass('active')) return;
        $(".pizza-button").removeClass('active');
        $(this).addClass('active');
        var filter=$(this).text();
        if(filter=='Усі')showPizzaList(Pizza_List);
        else if(filter=='З ананасами')filterPizza('pineapple');
        else if(filter=='Мясні')filterPizza('meat');
        else if(filter=='З грибами')filterPizza('mushroom');
        else if(filter=='З морепродуктами')filterPizza('ocean');
        else if(filter=='Вегa')filterPizza('tomato');
    });
    
function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    Pizza_List.forEach(function (pizza) {
       if(pizza.content[filter])
           pizza_shown.push(pizza);
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}


function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}
exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;