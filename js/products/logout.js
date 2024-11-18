const logoutbtn = document.getElementById("logoutbtn");

logoutbtn.addEventListener("click", () => {
  Cookies.remove("activeUser");
});