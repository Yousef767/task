const handleEdit = (id) => {
  Cookies.set('itemId',id);
  setTimeout(()=>{
    window.location.href = "./app-ecommerce-product-edit.html";
  },1000)
};
