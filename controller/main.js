getProducts();

let constListProducts = null;
function getProducts() {
    getProductsApi()
        .then((response) => {
            let products = response.data.map((product) => {
                return new Product(
                    product.id
                    ,product.name 
                    ,product.price 
                    ,product.screen
                    ,product.backCamera
                    ,product.frontCamera
                    ,product.img
                    ,product.desc
                    ,product.type
                );
            });
            constListProducts = products;
            display(products);
        })
        .catch((error) => {
            console.log(error);
        });
}

function display(products) {
    dom("#category").innerHTML = '';
    let output = products.reduce((result, product, index) => {
        return (
            result +
            `
                <div class="product">
                    <div class="menu">
                        <div class="option">
                            <a href="">${product.name}</a>
                        </div>
                    </div>
                    <img src="${product.img}" alt="">
                    <div class="review">
                        <button id="trigger-overlay1" onclick="showDetail(${product.id})">
                            <p>Chi tiết</p>
                        </button>
                    </div>
                    <div class="price">
                        <strong class="price-new">${formatNumber(product.price)}</strong>
                        <!-- <spaspan class="price-old">14.900.000đ</spaspan> -->
                    </div>
                    <div class="buy">
                        <button onclick="buyNow(${product.id})">Mua ngay</button>
                    </div>
                </div>       
            `
        );
    }, "");

    dom("#category").innerHTML = output;
    slickly();
}

function slickly() {
    $('#category').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        // autoplay: true,
        autoplaySpeed: 2000,
        dots: true
    });
}

function dom(selector) {
    return document.querySelector(selector);
}

function checkExistProductInCart(id, listProducts) {
    let existFlg = 0;
    let indexItem = null;
    listProducts.forEach( function (item, index){
        if(item.id == id) {
            existFlg = 1;
            indexItem = index
        }
    });

    if(existFlg == 1) {
        return {status: false, index: indexItem};
    }
    return {status: true, index: indexItem};
}

// process cart
let listIdProductInCart = getItems('cart');
innerCart(countNumberItem());

function countNumberItem() {
    let numberItem = listIdProductInCart.reduce((result, item, index) => {
        return (result + item.quantity);
    }, 0);

    return numberItem;
}

function innerCart(number) {
    dom('.total-qty').innerHTML = number;
}

function innerTotalBill(number) {
    dom(".total__bill").innerHTML = `Total: ${number}` ;
}

function buyNow(id) {
    getIdProductsApi(id)
        .then( (response) => {
            
            let product = response.data;

            let resultCheck = checkExistProductInCart(product.id, listIdProductInCart);

            if(resultCheck.status == false) {
                let quantityOld = listIdProductInCart[resultCheck.index].quantity;

                listIdProductInCart[resultCheck.index].quantity = quantityOld + 1;

            } else if(resultCheck.status == true){ 

                let cartItem = new CartItem(
                    product.id
                    ,product.name 
                    ,product.price 
                    ,product.screen
                    ,product.backCamera
                    ,product.frontCamera
                    ,product.img
                    ,product.desc
                    ,product.type
                    ,1
                );

                listIdProductInCart.push(cartItem)
            }

            setItems('cart', listIdProductInCart);

            innerCart(countNumberItem())

        })
        .catch((error) => {
            console.log(error);
        })
}

function decreaseProduct(id) {
    let totalBill = 0;
    let totalQty = 0;
    const listIdProductInCartChange = listIdProductInCart.map((product) => {
        let qty = product.quantity;
        let price = product.price;
        
        if(product.id == id) {
            price = price * qty
            if(qty > 1) {
                qty = qty - 1;
                price = product.price * qty; 

                dom('.quality_' + product.id).innerHTML = qty;
                dom('.price_' + product.id).innerHTML = formatNumber(price);
                totalBill = totalBill + price;
                totalQty = totalQty + qty;
                return { ...product, quantity: qty};
            }
            totalBill = totalBill + price;
            totalQty = totalQty + qty;

        }else{
            totalBill = totalBill + product.price * product.quantity;
            totalQty = totalQty + qty;
        }

        return product;
    });
    
    innerTotalBill(formatNumber(totalBill));
    innerCart(totalQty);
    listIdProductInCart = listIdProductInCartChange;
    setItems('cart', listIdProductInCart);
}

function increaseProduct(id) {
    let totalBill = 0; 
    let totalQty = 0; 
    const listIdProductInCartChange = listIdProductInCart.map((product) => {
        let qty = product.quantity;
        let price = product.price; 

        if(product.id == id) {
            qty = qty + 1;
            price = price * qty; 
            
            dom('.quality_' + product.id).innerHTML = qty;
            dom('.price_' + product.id).innerHTML = formatNumber(price);

            totalBill = totalBill + price;
            totalQty = totalQty + qty;

            return { ...product, quantity: qty};
        }else{
            totalBill = totalBill + product.price * product.quantity;
            totalQty = totalQty + qty;
        }
        return product;
    });

    innerTotalBill(formatNumber(totalBill));
    innerCart(totalQty);
    listIdProductInCart = listIdProductInCartChange;
    setItems('cart', listIdProductInCart);
}

function deleteProduct(id) {
    let totalBill = 0; 
    let totalQty = 0; 

    const listIdProductInCartChange = listIdProductInCart.filter((product) => {
        if(product.id != id) {
            let qty = product.quantity;
            let price = product.price * qty; 
            
            totalBill = totalBill + price;
            totalQty = totalQty + qty;

            return product;
        }
    });
    
    innerTotalBill(formatNumber(totalBill));
    innerCart(totalQty);
    listIdProductInCart = listIdProductInCartChange;
    setItems('cart', listIdProductInCart);
    dom('.delete_' + id).parentElement.remove();
}

function showDetail(id) {
    document.getElementsByClassName("box__overlay1")[0].style.visibility = "visible";

    getIdProductsApi(id)
        .then( (response) => {
            
            let product = response.data;

            dom('.card-header-text').innerHTML = product.name;
            dom('.img_left').innerHTML = `<img src="${product.img}" alt="">`;
            dom('.detail_screen').innerHTML = product.screen;
            dom('.detail_frontCamera').innerHTML = product.frontCamera;
            dom('.detail_backCamera').innerHTML = product.backCamera;
            dom('.detail_desc').innerHTML = product.desc;

        })
        .catch((error) => {
            console.log(error);
        })
}
// ================= Dom ===================
dom('.showCart').addEventListener("click", () => {
    let listCart = getItems('cart');
    let output = '';
    let totalBill = 0;

    if(listCart.length == 0 || listCart.length == null) {
        dom('.pay').classList.add("display-none");
        dom('.total__bill').classList.add("display-none");
    }else{
        dom('.pay').classList.remove("display-none");
        dom('.total__bill').classList.remove("display-none");
    }

    listCart.map( (product) => {
        output += `
            <div class="row">
                <div class="box_img">
                    <img src="${product.img}" alt="">
                </div>
                <strong class="name  text-white">${product.name}</strong>
                <span class="quality-change">
                    <div class="qty">
                        <button class="box_quality" onclick="decreaseProduct(${product.id})"><i class="fas fa-chevron-left"></i></button>
                        <p class="quality quality_${product.id}">${product.quantity}</p>
                        <button class="box_quality" onclick="increaseProduct(${product.id})"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </span>
                <p class="price price_${product.id}">${formatNumber(product.price * product.quantity)}</p>
                <button class="box_quality delete_${product.id}" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;

        totalBill += product.price * product.quantity;
    });

    dom(".list__cart").innerHTML = output;
    innerTotalBill(formatNumber(totalBill));
})

dom('#selectFilter').addEventListener("change", (evt) => {
    let type = evt.target.value;
    let listProductFilter;

    if(!type) {
        listProductFilter = constListProducts;
    }

    if(type == 'iphone') {
        listProductFilter = constListProducts.filter ( (product) => {
            return product.type == 'iphone';
        })
    }

    if(type == 'Samsung') {
        listProductFilter = constListProducts.filter ( (product) => {
            return product.type == 'Samsung';
        })
    }
    $('#category').slick('unslick');
    display(listProductFilter);
});

dom('.pay_online').addEventListener("click", () => {
    clearCart();

});

dom('.pay_home').addEventListener("click", () => {
    clearCart();
});

function clearCart() {
    if(listIdProductInCart.length == 0 || listIdProductInCart.length == null) {
        alert('Không có sản phẩm nào trong giỏ hàng!');
        return;
    }
    listIdProductInCart = Array();
    removeItems('cart');
    innerTotalBill(0);
    innerCart(0);
    dom(".list__cart").innerHTML = '';
    dom('.pay').classList.add("display-none");
    dom('.total__bill').classList.add("display-none");
    alert('Thanh toán thành công!');
}

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

// =============== localStorage ============
function setItems(database, value) {
    localStorage.setItem(database, JSON.stringify(value))
}

function getItems(database) {
    let getItems = JSON.parse(localStorage.getItem(database));

    if(!getItems) {
        return Array();
    }else{
        return getItems;
    
    }
}

function removeItems(database) {
    localStorage.removeItem(database);
}




