function showSuccess(message) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top", // "top" or "bottom"
    position: "right", // "left", "center", or "right"
    backgroundColor: "green",
    stopOnFocus: true, // Prevent dismissing on hover
  }).showToast();
}

function showError(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "red",
    stopOnFocus: true,
  }).showToast();
}