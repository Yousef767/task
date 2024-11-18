document.getElementById("publishBtn").addEventListener("click", function () {
  const fields = [
    { id: "ecommerce-product-name", name: "Product Name" },
    { id: "ecommerce-product-sku", name: "SKU" },
    { id: "ecommerce-product-barcode", name: "Barcode" },
    {
      id: "ecommerce-product-price",
      name: "Price",
      validate: (value) => !isNaN(value),
    },
    {
      id: "ecommerce-product-discount-price",
      name: "Discount Price",
      validate: (value) => !isNaN(value),
    },
    { id: "vendor", name: "Vendor" },
    { id: "category-org", name: "Category" },
    { id: "collection", name: "Collection" },
    { id: "status-org", name: "Status" },
    { id: "ecommerce-product-tags", name: "Tags" },
  ];

  const inputData = {};
  for (const field of fields) {
    const element = document.getElementById(field.id);
    const value = element.value.trim();

    if (!field.optional && !value) {
      return showError(`${field.name} field is required.`);
    }
    if (field.validate && !field.validate(value)) {
      return showError(`Enter a valid ${field.name.toLowerCase()}.`);
    }
    inputData[field.id] = value;
  }

  inputData.inStock = document.getElementById("in-stock").checked;
  inputData.chargeTax = document.getElementById("price-charge-tax").checked;
  inputData.description = document.querySelector(".ql-editor").innerHTML;

  const dropzoneFile = Dropzone.instances[0]?.files[0];
  if (!dropzoneFile) {
    return showError("Please upload an image.");
  }

  const product = {
    "id": Date.now(),
    "product_name": inputData["ecommerce-product-name"],
    "product_sku": inputData["ecommerce-product-sku"],
    "product_barcode": inputData["ecommerce-product-barcode"],
    "price": inputData["ecommerce-product-price"],
    "discount": inputData["ecommerce-product-discount-price"],
    "vendor": inputData["vendor"],
    "category": inputData["category-org"],
    "collection": inputData["collection"],
    "status": inputData["status-org"],
    "tags": inputData["ecommerce-product-tags"],
    "description": inputData.description,
    "in_stock": +inputData.inStock === 1 ,
    "charge_tax": +inputData.chargeTax,
    "image": URL.createObjectURL(dropzoneFile),
  };

  const products = Cookies.get("products")
    ? JSON.parse(Cookies.get("products"))
    : [];

  products.push(product);
  Cookies.set("products", JSON.stringify(products), {
    expires: 7,
    sameSite: "Lax",
  });

  console.log("product", product);
  showSuccess("Product added successfully!");
  setTimeout(() => {
    window.location.href = "./app-ecommerce-product-list.html";
  }, 2000);
});
