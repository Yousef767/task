  console.log('Cookies');
  
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("formAuthentication");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const notValid = document.querySelectorAll("#formAuthentication .is-invalid");
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  if (!emailValue || !passwordValue || notValid.length > 0) {
    return;
  }

  let users = Cookies.get("users") ? JSON.parse(Cookies.get("users")) : [];
  const user = users.find(
    (user) =>
      (user.email === emailValue || user.username === emailValue) &&
      user.password === passwordValue
  );

  if (user) {
    Cookies.set("activeUser", JSON.stringify(user));
    showSuccess("User Login Sucessfully !");
    setTimeout(() => {
      window.location.href = "./app-ecommerce-product-list.html";
    }, 2000);
  } else {
    showError("User Not Found !");
  }
});
