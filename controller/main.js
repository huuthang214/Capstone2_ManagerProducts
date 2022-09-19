let products = [];
getProduct();
function getProduct() {
    getProductsApi()
        .then((response) => {
            products = response.data
            // for (i = 0; i < products.length; i++) {
            //     console.log(products[i])
            // }
            // let newP =products.map((product) => {
            //     return console.log(product)
            // })
            display(products)


        })
        .catch((err) => console.log(err))

}

function display(products) {
    let html = "";
    let newProducts = products.reduce((result, product, index) => {
        return html = result + `
            <div class="card py-3">
            <div class="top-bar">
              <i class="fab fa-apple"></i>
              <em class="stocks">In Stock</em>
            </div>
            <div class="img-container">
              <img
                class="product-img"
                src="${product.img}"
                alt=""
              />
              <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
            </div>
            <div class="details">
              <div class="name-fav">
                <strong class="product-name">${product.name}</strong>
                <button onclick='this.classList.toggle("fav")' class="heart">
                  <i class="fas fa-heart"></i>
                </button>
              </div>
              <div class="wrapper">
                <h5>Your next computer is not a computer</h5>
                <p>
                  ${product.screen} <br/>
                  ${product.backCamera} <br/>
                  ${product.frontCamera} <br/>
                  ${product.desc}
                </p>
              </div>
              <div class="purchase">
                <p class="product-price">${product.price + " $"}</p>
                <span class="btn-add">
                  <div>
                    <button onclick="addItem(this)" class="add-btn">
                      Add <i class="fas fa-chevron-right"></i>
                    </button></div
                ></span>
              </div>
            </div>
          </div> 
            `
    }, '')
    // console.log(newProducts)
    document.querySelector('.main-cart').innerHTML = newProducts


}

document.querySelector("#filter").addEventListener("change", (e) => {
    console.log(e.target.value);
    let valueSelect = e.target.value;
    // for (i = 0; i < products.length; i++) {
    //     console.log(products[i].type);

    // }
    // let stampProducts = [];
    // products.forEach((product) => {
    //     let typeProduct = product.type
    //     if (valueSelect == typeProduct) {
    //         // console.log("true")
    //         stampProducts.push(product)
    //         console.log(stampProducts)
    //         display(stampProducts)
    //     }
    // })

    const stamp = products.filter((product) => {
        // return product.type == valueSelect;
        return product
    })
    console.log(stamp)
    display(stamp)


})
function filter() {

}

// filter, map, => new Array;
// find, findIndex, tìm trong mảng => hứng = 1 biến;
// forEach => duyệt mảng;