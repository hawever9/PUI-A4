
function Pillow(name, color, shape, qty, img) {
  this.name = name;
  this.color = color;
  this.shape = shape;
  this.qty = qty;
  this.img = img;
}

// change the attributes and restore the JSON file
function changeColor(item, color){
    $("#" + item.color).css("background-color", "#ffffff") 
    item.color = color;
    $("#" + color).css("background-color", "#bccaad");  
    // change img
    var name = color + item.shape ;
    var img = name + ".jpeg";
    item.name = name;
    item.img = img;
    $("#mainItem").attr("src", "assets/img/" + img)

}

function changeShape(item, shape){
    $("#" + item.shape).css("background-color", "#ffffff")
    item.shape = shape;
    $("#" + shape).css("background-color", "#bccaad");
    // change img
    var name = item.color + shape;
    var img = name + ".jpeg";
    item.name = name;
    item.img = img;
    $("#mainItem").attr("src", "assets/img/" + img)

}

function changeQTY(item, qty){
    $("#Q" + item.qty.toString()).css("background-color", "#ffffff")    
    item.qty = qty;
    $("#Q" + qty.toString()).css("background-color", "#bccaad");

}

function add(item, cart){
    for (i = 1; i < cart.length; i++){
      var cur = cart[i];
      if (item.color === cur.color && item.shape == cur.shape) {
        console.log(item);
        var q = item.qty;
        cur.qty += q;
        console.log(item);
        console.log(cart[i]);
        cart[0] += item.qty;
        $("#cart").text("cart " + cart[0].toString());
        return;
      }
    } 

    cart.push(item);
    cart[0] += item.qty;
    $("#cart").text("cart " + cart[0].toString());

    // some change in css to indicate a successful add
    
}







$(document).ready(function() {
  // load cart info, if no added items, initiate a cart as an empty list
  var cart = JSON.parse(localStorage.getItem("savedCart"));
  if (cart === null) {
    cart = [0];
  } else {
    $("#cart").text("cart "+ " " + cart[0].toString());
  }

  //load default item
  var currentItem = new Pillow("biegesquare", "biege", "square", 1, "biegesquare.jpeg");
  $("#" + currentItem.shape).css("background-color", "#bccaad");
  $("#" + currentItem.color).css("background-color", "#bccaad");  
  $("#Q" + currentItem.qty.toString()).css("background-color", "#bccaad");

  // reselect, update the saved JSON, and change html accordingly
  $("#biege").click(function(){
    changeColor(currentItem, "biege");
  });

  $("#pink").click(function(){
    changeColor(currentItem, "pink");
  });

  $("#square").click(function(){
    changeShape(currentItem, "square");
  });

  $("#round").click(function(){
    changeShape(currentItem, "round");
  });

  $("#Q1").click(function(){
    changeQTY(currentItem, 1);
  });

  $("#Q2").click(function(){
    changeQTY(currentItem, 2);
  });

  $("#Q3").click(function(){ 
    changeQTY(currentItem, 3);
  });

  $("#Q4").click(function(){
    changeQTY(currentItem, 4);
  });



  // add JSON to cart
  $('.add').click(function(){
    add(currentItem, cart);
    localStorage.setItem("savedCart", JSON.stringify(cart));     
    alert("Added successfully!");
    currentItem = new Pillow(currentItem.name, currentItem.color, currentItem.shape, currentItem.qty, currentItem.img);
  })


  // add item to wishlist


});


