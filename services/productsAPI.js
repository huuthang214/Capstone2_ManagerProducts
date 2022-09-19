function getProductsApi() {
    return axios({
        method: 'get',
        url: 'https://62f5093aac59075124c9d3d2.mockapi.io/Products',

    })
}

function addProductsApi(product) {
    return axios({
        method: 'post',
        url: 'https://62f5093aac59075124c9d3d2.mockapi.io/Products',
        data: product
    })
}
function deleteProductsApi(id) {
    return axios({
        method: 'DELETE',
        url: `https://62f5093aac59075124c9d3d2.mockapi.io/Products/${id}`,
    })
}

function updateProductsApi(products, id) {
    return axios({
        url: `https://62f5093aac59075124c9d3d2.mockapi.io/Products/${id}`,
        method: 'put',
        data: products,
    })
}

function getIdProductsApi(id) {
    return axios({
        url: `https://62f5093aac59075124c9d3d2.mockapi.io/Products/${id}`,
        method: 'get',
    })
}