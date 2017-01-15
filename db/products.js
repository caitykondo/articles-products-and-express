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

function editProduct(productToEdit, req) {
  if(req.body.name){
      productToEdit.name = req.body.name;
    }
    // check if has price
    if(req.body.price){
      productToEdit.price = req.body.price;
    }
    // check if has inventory
    if(req.body.inventory){
      productToEdit.inventory = req.body.inventory;
    }
}

module.exports = {
  data: {
    "products": productList,
    success: {
      "delete": false,
      "post": true
    }
  },
  productList,
  newProductId,
  addNewProduct,
  findProductById,
  deleteProduct,
  editProduct,
};