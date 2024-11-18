console.log('Cookidfses');
  
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("formAuthentication");

form.addEventListener("submit", (event) => {
  const notValid = document.querySelectorAll("#formAuthentication .is-invalid");
  event.preventDefault();
  if (
    !userName.value ||
    !email.value ||
    !password.value ||
    notValid.length > 0
  ) {
    return;
  }

  let users = Cookies.get("users") ? JSON.parse(Cookies.get("users")) : [];
  const isUsernameTaken = users.some(
    (user) => user.username === userName.value
  );
  const isEmailTaken = users.some((user) => user.email === email.value);
  if (isUsernameTaken) {
    showError("Username is already taken.");
    return;
  }
  if (isEmailTaken) {
    showError("Email is already registered.");
    return;
  }

  const newUser = {
    id: Date.now(),
    username: userName.value,
    email: email.value,
    password: password.value,
  };
  users.push(newUser);
  Cookies.set("users", JSON.stringify(users), { expires: 7 });
  showSuccess("User Registered Sucessfully !");
  setTimeout(() => {
    window.location.href = "./auth-login-cover.html";
  }, 2000);
});
