const itemId = Cookies.get("itemId");
if (!itemId) {
  window.location.href = "./app-ecommerce-product-list.html";
} else {
  const products = Cookies.get("products")
    ? JSON.parse(Cookies.get("products"))
    : (window.location.href = "./app-ecommerce-product-list.html");
  const product = products.find((product) => product.id == +itemId);
  if (!product) {
    window.location.href = "./app-ecommerce-product-list.html";
  }
  document.getElementById("ecommerce-product-name").value = product.product_name || "";
  document.getElementById("ecommerce-product-sku").value = product.product_sku || "";
  document.getElementById("ecommerce-product-barcode").value = product.product_barcode || "";
  document.querySelector(".ql-editor").innerHTML = product.description || "";
  document.getElementById("ecommerce-product-price").value = product.price || "";
  document.getElementById("ecommerce-product-discount-price").value = product.discount || "";
  document.getElementById("price-charge-tax").checked = product.charge_tax === 1;
  document.getElementById("in-stock").checked = product.in_stock === 1;
  document.getElementById("vendor").value = product.vendor || "";
  document.getElementById("category-org").value = product.category || "";
  document.getElementById("collection").value = product.collection || "";
  document.getElementById("status-org").value = product.status || "";
  document.getElementById("ecommerce-product-tags").value = JSON.parse(product.tags).map(tag => tag.value).join(",");

  document.getElementById("editBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product, 
      product_name: document.getElementById("ecommerce-product-name").value.trim(),
      product_sku: document.getElementById("ecommerce-product-sku").value.trim(),
      product_barcode: document.getElementById("ecommerce-product-barcode").value.trim(),
      description: document.querySelector(".ql-editor").innerHTML.trim(),
      price: document.getElementById("ecommerce-product-price").value.trim(),
      discount: document.getElementById("ecommerce-product-discount-price").value.trim(),
      charge_tax: document.getElementById("price-charge-tax").checked ? 1 : 0,
      in_stock: document.getElementById("in-stock").checked ? 1 : 0,
      vendor: document.getElementById("vendor").value.trim(),
      category: document.getElementById("category-org").value.trim(),
      collection: document.getElementById("collection").value.trim(),
      status: document.getElementById("status-org").value.trim(),
      tags: JSON.stringify(
        document.getElementById("ecommerce-product-tags").value.split(",").map(tag => ({ value: tag.trim() }))
      ),
    };

    const productIndex = products.findIndex((p) => p.id == +itemId);
    if (productIndex !== -1) {
      products[productIndex] = updatedProduct;
      Cookies.set("products", JSON.stringify(products), { expires: 7 });
      showSuccess("Product updated successfully !");
      setTimeout(()=>{
        window.location.href = "./app-ecommerce-product-list.html"; 
      },1500)
    } else {
      showError("Product not found");
    }
  });
}
