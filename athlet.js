const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  registerBtn = document.querySelector("#register-form-open"),
  pwShowHide = document.querySelectorAll(".pw_hide"),
  loginForm = document.querySelector(".login_form form"),
  registerForm = document.querySelector(".signup_form form"),
  registerSubmitBtn = document.querySelector(".signup_form button");

// Open login form
formOpenBtn.addEventListener("click", () => home.classList.add("show"));

// Close form
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

// Hide password
pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

// Validate password function
function validatePassword(password) {
  const minLength = 8;
  const specialCharRegex = /[@!_()*&^%$#+=]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;

  // password is at least 8 characters long checking
  if (password.length < minLength) {
    showPasswordError("Password must be at least 8 characters long.");
    return false;
  }

  // password contains at least one special character checking
  if (!specialCharRegex.test(password)) {
    showPasswordError("Password must contain at least one special character");
    return false;
  }

  // password contains at least one uppercase letter checking
  if (!uppercaseRegex.test(password)) {
    showPasswordError("Password must contain at least one uppercase letter.");
    return false;
  }

  // password contains at least one number checking
  if (!numberRegex.test(password)) {
    showPasswordError("Password must contain at least one number.");
    return false;
  }

  // If all conditions pass, return true
  hidePasswordError();
  return true;
}

// Show password error message
function showPasswordError(message) {
  const errorElement = document.querySelector(".password-error-message");
  errorElement.textContent = message;
}

// Hide password error message
function hidePasswordError() {
  const errorElement = document.querySelector(".password-error-message");
  errorElement.textContent = "";
}

// Handle sign-up form
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
  document.querySelector(".login_form").classList.add("hidden");
  document.querySelector(".signup_form").classList.remove("hidden");
});

// Handle login form
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
  document.querySelector(".signup_form").classList.add("hidden");
  document.querySelector(".login_form").classList.remove("hidden");
});

// Register form open button event
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  home.classList.add("show");
  formContainer.classList.add("active");
  document.querySelector(".login_form").classList.add("hidden");
  document.querySelector(".signup_form").classList.remove("hidden");
});

// Register form submission validation
registerSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.querySelector(".signup_form input[type='email']").value;
  const password = document.querySelector(".signup_form input[type='password']").value;
  const username = document.querySelector(".signup_form input[type='text']").value;
  const role = document.querySelector(".signup_form input[name='role']").value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate Email
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate Password
  if (!validatePassword(password)) {
    return;
  }

  // Validate Username
  if (username.trim() === "") {
    alert("Please enter a username.");
    return;
  }

  // Validate Role selection
  if (role === "") {
    alert("Please select a role.");
    return;
  }

  // If all fields are valid, show success message
  alert("Registration successful!");

  // Reset the form after successful registration
  registerForm.reset();

  // Hide the registration form and show the login form
  home.classList.remove("show");
  document.querySelector(".signup_form").classList.add("hidden");
  document.querySelector(".login_form").classList.remove("hidden");
});

// Login form submission validation
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector(".login_form input[type='text']").value;
  const password = document.querySelector(".login_form input[type='password']").value;

  // Check login credentials (hardcoded for demonstration)
  if (username === "sivasai07" && password === "SsrMb@29") {
    window.location.href = "redirect.html"; // Redirect on successful login
  } else {
    alert("Invalid login credentials, please try again.");
  }
});

