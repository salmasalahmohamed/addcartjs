const carticon=document.querySelector('#cart-icon');
const cart=document.querySelector(".cart");
const closecart=document.querySelector('#cart-close');


let search =document.getElementById('search');
let submit=document.getElementById('submit');

let product=document.querySelectorAll('.product-title');
let products=document.querySelectorAll('.product-box');


let shop=document.getElementById('shop-content');
carticon.addEventListener('click',function(){
    cart.classList.add("active");

}
);

closecart.addEventListener('click',function(){
    cart.classList.remove("active");

}
);




function update(){
    addEvent();
    updatetotal();

}
function changequantity(){
let quantity =document.querySelectorAll(".cart-quantity");
quantity.forEach(e=>{
    e.addEventListener('change',handle_changeItemQuantity);
});
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
      this.value = 1;
    }
    this.value = Math.floor(this.value); 
  
    update();
  }




  function addEvent(){
    let remove=document.querySelectorAll(".cart-remove");
    remove.forEach(element => {
        element.addEventListener('click',removeelement) 
    });
    changequantity();
    render();
 }


function removeelement(){
    this.parentElement.remove();

update();
}




function render(){
    let product=document.querySelectorAll(".add-cart");
    let cart=document.querySelector(".cart-content");

    let arr='';
    let newNode = document.createElement("div");
    product.forEach( e=>{

        e.addEventListener('click',function(p){
            if(e.classList.contains('clicked')){
                p.preventDefault();
            }else{


                arr+=`
                <div class="cart-box">
                        <img src= "${e.parentElement.querySelector(".product-img").src}"alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${e.parentElement.querySelector('.product-title').innerHTML}</div>
                            <div class="cart-price">${e.parentElement.querySelector('.product-price').innerHTML}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove'></i>   
                
                        `
                        newNode.innerHTML=arr;
                        cart.appendChild(newNode);
                        e.classList.add("clicked")


                        changequantity();
                        updatetotal();
                            addEvent();

            }

        });

            


          
    });



}


function updatetotal(){
    let total=0;
let finaltotal=0;
    let cartBoxes = document.querySelectorAll(".detail-box");
    let totalElement = cart.querySelector(".total-price");
    let quantity =document.querySelectorAll(".cart-quantity");

cartBoxes.forEach(function(e){
    let priceElement = e.querySelector(".cart-price");

 let price=priceElement.innerHTML.replace("$","");
 price=parseFloat(price);

 let quantity = e.querySelector(".cart-quantity").value;
 finaltotal = price * quantity;
total+=finaltotal;


})
     totalElement.innerHTML = "$" + total;



}




search.onfocus=function(){

products.forEach(function(e){
    
    if(e.children[1].innerHTML==search.value.toUpperCase()||e.children[1].innerHTML.includes(search.value.toUpperCase())){
        e.style.display='';

    }else{
        e.style.display='none';

    }


})


}
render();