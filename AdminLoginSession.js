if (localStorage.getItem("username")) {
  window.location.href = "AdminDashboard.html";
}
// Get a reference to the login form
const loginForm = document.querySelector(".user");

// Add an event listener to the form's submit event
loginForm.addEventListener("submit", function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the values of the username and password fields
  const username = document.querySelector("#usernameInput").value;
  const password = document.querySelector("#passwordInput").value;

  // Check if the username and password match the expected values
  if (username === "ahs123" && password === "ahs.123") {
    // If the login is successful, redirect the user to the dashboard page
    debugger;
    localStorage.setItem("username", username);
    window.location.href = "AdminDashboard.html";
  } else {
    // If the login fails, display an error message to the user
    alert("Invalid username or password. Please try again.");
  }
});
