let productList = [];

let newProductId = 1;

function addNewProduct(product) {
  product.id = newProductId;
  newProductId++;
  productList.push(product);
}

function findProductById(requestId){
  for(let i = 0; i < productList.length; i++){
    if(productList[i].id === requestId){
       return productList[i];
    }
  }
}

function deleteProduct(requestId){
  for(let i = 0; i < productList.length; i++){
    if(productList[i].id === requestId){
      productList.splice(i, 1);
    }
  }
}


module.exports = {
  data: {
  "products": productList
  },
  productList,
  newProductId,
  addNewProduct,
  findProductById,
  deleteProduct,
};