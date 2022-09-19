function dom(selector) {
    return document.querySelector(selector);
}
let products = [];
getProduct();
function getProduct() {
    getProductsApi()
        .then((response) => {
            // console.log(response.data)
            products = response.data;

            let newProducts = response.data.map((product) => {
                return product = new Products(product.id, product.name, product.price, product.screen, product.backCamera, product.frontCamera, product.img, product.type, product.desc)
            });
            console.log(newProducts);

            // let myProducts = products.map((product) => {
            //     return new Products(product.id, product.name, product.price, product.screen, product.backCamera, product.frontCamera, product.img, product.desc)
            // });
            // console.log(myProducts)
            // for (i = 0; i < products.length; i++) {
            //     // console.log(products[i]);
            //     let myProduct = new Products(products[i].name, products[i].price, products[i].screen, products[i].backCamera, products[i].frontCamera, products[i].img, products[i].type, products[i].desc)
            //     myProducts.push(myProduct);
            //     console.log(myProducts)
            // }
            display(products)
        })
        .catch(error => console.log(error))
}
// setTimeout(() => {
//     console.log(products)
// }, 2000)

// Hiển thị
function display(products) {
    let content = '';
    products.reduce((result, product, index) => {
        return content = result + `
        <tr>
             <td>${product.id}</td>
             <td>${product.name}</td>
             <td>${product.price}</td>
             <td>${product.screen}</td>
             <td>${product.backCamera}</td>
             <td>${product.frontCamera}</td>
             <td>${product.img}</td>
             <td>${product.type}</td>
             <td>${product.desc}</td>
             <td>
                <button class="btn btn-primary" data-type="edit" data-id="${product.id}" data-toggle="modal" data-target="#myModal">chỉnh sửa</button>
                <button class="btn btn-danger" data-type="del" data-id="${product.id}">Xóa</button>
             </td>
         </tr>
        `
    }, '')
    // products.forEach((product, index) => {
    //     console.log(product, index);
    //     content += `
    //     <tr>
    //         <td>${product.id}</td>
    //         <td>${product.name}</td>
    //         <td>${product.price}</td>
    //         <td>${product.screen}</td>
    //         <td>${product.backCamera}</td>
    //         <td>${product.frontCamera}</td>
    //         <td>${product.img}</td>
    //         <td>${product.type}</td>
    //         <td>${product.desc}</td>
    //     </tr>
    //     `
    // });
    document.getElementById('tblDanhSachSP').innerHTML = content;
}
// thêm sản phẩm
function addProduct() {
    const id = dom("#id").value
    const name = dom("#name").value;
    const price = dom("#price").value;
    const screen = dom("#Screen").value;
    const backCamera = dom("#backCamera").value;
    const frontCamera = dom("#frontCamera").value;
    const img = dom("#img").value;
    const type = dom("#type").value;
    const desc = dom("#desc").value;

    //    tạo object product từ class Products
    const product = new Products(null, name, price, screen, backCamera, frontCamera, img, type, desc)
    console.log(product)
    addProductsApi(product)
    getProduct()
}
// Xóa & Edit sản phẩm
dom("#tblDanhSachSP").addEventListener('click', (e) => {
    console.log(e.target)
    let type = e.target.getAttribute("data-type"); /*lấy id của button */
    let id = e.target.getAttribute("data-id"); /*lấy id của button */

    if (type === 'del') {
        let stampIndex = products.findIndex((product) => {
            return product.id == id;
        });
        if (stampIndex != -1) {
            products.splice(stampIndex, 1)
            deleteProduct(id);
            getProduct();
        }
    } else if (type === 'edit') {
        document.querySelector('.modal-footer').innerHTML =
            `<button class="btn btn-primary" data-type="update" data-id="${id}">Sửa</button>
             <button class="btn btn-danger">Hủy</button>`
        getIdProducts(id);
    }
})
function deleteProduct(id) {
    deleteProductsApi(id)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => console.log(error))
}
// Cập nhật sản phẩm
function updateProduct(products, id) {
    updateProductsApi(products, id)
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
}


document.querySelector('.modal-footer').addEventListener('click', (e) => {
    const elementType = e.target.getAttribute('data-type');

    const id = e.target.getAttribute('data-id');
    console.log(id)
    const name = dom("#name").value;
    const price = dom("#price").value;
    const screen = dom("#Screen").value;
    const backCamera = dom("#backCamera").value;
    const frontCamera = dom("#frontCamera").value;
    const img = dom("#img").value;
    const type = dom("#type").value;
    const desc = dom("#desc").value;

    const product = new Products(id, name, price, screen, backCamera, frontCamera, img, type, desc)


    if (elementType === 'update') {
        updateProduct(product, id)
    } else if (elementType = 'add') {
        addProduct();
    }
})

function getIdProducts(id) {
    getIdProductsApi(id)
        .then(response => {
            console.log(response.data);
            dom("#id").value = response.data.id;
            dom("#name").value = response.data.name;
            dom("#price").value = response.data.price;
            dom("#Screen").value = response.data.screen;
            dom("#backCamera").value = response.data.backCamera;
            dom("#frontCamera").value = response.data.frontCamera;
            dom("#img").value = response.data.img;
            dom("#type").value = response.data.type;
            dom("#desc").value = response.data.desc;
        })
        .catch(error => console.log(error))
}