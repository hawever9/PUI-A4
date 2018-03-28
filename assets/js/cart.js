function createCurrentItemList(cart) {
  console.log(cart.length);
  for (i = 1; i < cart.length; i++) {
    var item = cart[i];
    $("itemList").append("<li>a</li>");
    $("#itemList").append("<li id=\"" + item.name + "\" style = \"margin-bottom: 40px\"> <img class =\"small-img\" src=\"assets/img/" + item.img + "\" alt=\"\" width=\"50\" >" + "<div class = \"cart-color\" >" + item.color + "</div>" +"<div class = \"cart-shape\" >" +item.shape + "</div>" +"<div class = \"cart-qty\" >" +item.qty+"</div>" + "<button class = \"delete\" >remove</button> </li>");
    }
}

function updateTotal(cart) {
    var itemTotal = 0;
    for (i = 1; i < cart.length; i++) {
        itemTotal += 40 * cart[i].qty;
    }
    var tax = Math.round(itemTotal * 0.07);
    var all = tax + itemTotal;

    $("#itemTotal").text("Item Total: $" + itemTotal);
    $("#tax").text("Tax:      $" + tax);
    $("#all").text("Total:    $" + all);
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
    //cart[0] = 0;
    $("#cart").text("cart " + cart[0].toString());
  }

  initiatePage(cart);

  $(".delete").click(function() {
    var index = $(this).parent().index();
    $(this).parent().remove();
    var deletedQty = cart[index+1].qty;
    cart.splice(index+1, 1);
    cart[0] -= deletedQty;
    $("#cart").text("cart " + cart[0].toString());
    updateTotal(cart);
    localStorage.setItem("savedCart", JSON.stringify(cart));
  });

  
  // $("#clearAll").click(function() {
  //   cart = [0];
  //   console.log(cart);
  //   localStorage.setItem("savedCart", JSON.stringify(cart));
  // });



});