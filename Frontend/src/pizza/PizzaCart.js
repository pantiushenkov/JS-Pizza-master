
var Templates = require('../Templates');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size"
    , Small: "small_size"
};
//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
//HTML едемент куди будуть додаватися піци
var $cart = $("#order");

$('.btn-order').click(function(){
    alert('keke');    
});

function addToCart(piz, size) {
    var i;
        for (i = 0; i < Cart.length; i++) {
            if (Cart[i].pizza.id == piz.id&&Cart[i].size == size) {
                Cart[i].quantity++;
                updateCart();
                return ;
            }
        }
        Cart.push({
        pizza: piz,
        size: size,
        quantity: 1
    });
 
if(Cart.length==1)
        if(!$(".no-orders").hasClass('none')){
            $('.btn-order').removeAttr('disabled');
            $(".no-orders").addClass("none");
            $(".order-header").removeClass("none");
        }        
    updateCart();
    
}

//Оновити вміст кошика на сторінці
function removeFromCart(cart_item) {
    var i;
        for (i = 0; i < Cart.length; i++) {
            if (Cart[i].pizza.id == cart_item.pizza.id&&Cart[i].size == cart_item.size) {
                Cart.splice(i,1);
                n_orders=-1;
                break;
            }
        }
    if(Cart.length==0){
        $(".no-orders").removeClass("none");
        $(".order-header").addClass("none");
        $('.btn-order').attr('disabled','disabled');
    }
    
    updateCart();
}
    
function initialiseCart() { 
    
 Cart = JSON.parse(localStorage.getItem("savedData"));

 console.log(Cart);
    
    if(Cart.length==0){
        $(".no-orders").removeClass("none");
        $(".order-header").addClass("none");
        $('.btn-order').attr('disabled','disabled');
    }
    
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    localStorage.setItem("savedData",JSON.stringify(Cart));
  
    $cart.html("");
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        var $node = $(html_code);
        self.total+=cart_item.pizza.price;
   
        $node.find(".count-clear").click(function () {
            removeFromCart(cart_item);
            return;
        });
        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function () {
            //Зменшуємо кількість замовлених піц
            if(cart_item.quantity==1){
                removeFromCart(cart_item);
            return;
            }
            cart_item.quantity -= 1;
            //Оновлюємо відображення
            updateCart();
        });
          $(".orders-clear").click(function () {
            //Зменшуємо кількість замовлених піц
            Cart=[];
              removeFromCart();
            //Оновлюємо відображення
            updateCart();    
        });
        $cart.append($node);
    }
    Cart.forEach(showOnePizzaInCart);
       
    $(".orders-count").text('').append(Cart.length);
    $(".sum-total").text("").append(total);

}
var total=function(){
    var t=0; 
    for (var i = 0; i < Cart.length; i++) {
        var size=Cart[i]['size'];
      t+=(Cart[i].pizza[size].price*Cart[i].quantity);
    }
        return t;
}
exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;
exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;
exports.PizzaSize = PizzaSize;