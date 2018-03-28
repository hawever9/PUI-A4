function createCurrentItemList(cart) {
  console.log(cart.length);
  for (i = 1; i < cart.length; i++) {
    var item = cart[i];
    $("itemList").append("<li>a</li>");
    $("#itemList").append("<li id=\"" + item.name + "\" > <img class =\"small-img\" src=\"assets/img/" + item.img + "\" alt=\"\" width=\"50\" style = \" float:left; \">" + "<div class = \"cart-color\" style = \" float:left; width: 15%; \">" + item.color + "</div>" +"<div class = \"cart-shape\" style = \" float:left; width: 15%; \">" +item.shape + "</div>" +"<div class = \"cart-qty\" style = \" float:left; width: 15%; \">" +item.qty+"</div>" + "<button class = \"delete\" style = \"float:left\">remove</button> </li>");
    }
}

function updateTotal(cart) {
    var itemTotal = 0;
    for (i = 1; i < cart.length; i++) {
        itemTotal += 40 * cart[i].qty;
    }
    var tax = Math.round(itemTotal * 0.07);
    var all = tax + itemTotal;

    $("#itemTotal").text("$" + itemTotal);
    $("#tax").text("$" + tax);
    $("#all").text("$" + all);
}


function initiatePage(cart){
  var count = cart[0];
  if (count === 0) {
    $("#empty").remove();
  } else {
    createCurrentItemList(cart);
    updateTotal(cart);
  }
}


$(document).ready(function() {
  // load cart info, if no added items, initiate a cart as an empty list
  var cart = JSON.parse(localStorage.getItem("savedCart"));
  if (cart === null) {
    cart = [0];
  } else {
    $("#cart").text("cart " + cart[0].toString());
  }

  initiatePage(cart);

  $(".delete").click(function() {
    var index = $(this).parent().index();
    $(this).parent().remove();
    var deletedQty = cart[index].qty;
    cart.splice(index+1, 1);
    cart[0] -= deletedQty;
    $("#cart").text("cart " + cart[0].toString());
    updateTotal(cart);
    localStorage.setItem("savedCart", JSON.stringify(cart));
  });

  
  $("#clearAll").click(function() {
    cart = [0];
    localStorage.setItem("savedCart", JSON.stringify(cart));
  });



});