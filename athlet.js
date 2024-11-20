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
formOpenBtn.addEventListener("click", () =>{
   home.classList.add("show");
  document.querySelector(".signup_form").classList.add("hidden");
  document.querySelector(".login_form").classList.remove("hidden");
console.log('hello')
})
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
// Register form open button event
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  home.classList.add("show");
  formContainer.classList.add("active");
  document.querySelector(".signup_form").classList.remove("hidden");
  document.querySelector(".login_form").classList.add("hidden");
});

// Helper functions for validation
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function checkPasswordStrength(password) {
    const requirements = [
        { regex: /[a-z]/, message: "At least one lowercase letter" },
        { regex: /[A-Z]/, message: "At least one uppercase letter" },
        { regex: /\d/, message: "At least one number" },
        { regex: /[!@#$%^&*()_+{}|:<>?~`-]/, message: "At least one special character" },
        { regex: /.{8,}/, message: "Minimum 8 characters" },
    ];

    const missingRequirements = requirements
        .filter(req => !req.regex.test(password))
        .map(req => req.message);

    return missingRequirements;
}

function updatePasswordFeedback(missingRequirements) {
    const passwordWarning = document.getElementById("passwordWarning");
    if (missingRequirements.length > 0) {
      passwordWarning.innerHTML = `Password requirements missing: <ul>${missingRequirements
        .map(req => `<li>${req}</li>`) // Wrap <li> as a string inside backticks
        .join("")}</ul>`;
    passwordWarning.style.display = "block";
    
    } else {
        passwordWarning.innerHTML = "";
        passwordWarning.style.display = "none";
    }
}

function checkFieldEmpty() {
  const requiredFields = document.querySelectorAll("#signUpForm input[required], #signUpForm select[required]");
  return Array.from(requiredFields).every(field => field.value.trim() !== "");
}


// Sign up form validation
document.getElementById("signUpForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    // Check if all fields are filled
    if (!checkFieldEmpty()) {
        alert("All fields must be filled!");
        return;
    }

    // Check email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Check password strength
    const missingRequirements = checkPasswordStrength(password);
    if (missingRequirements.length > 0) {
        alert("Password does not meet the requirements. Please fix the issues and try again.");
        return;
    }

    // Send data to backend
    const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
    });

    if (response.ok) {
        alert("Sign up successful!");
        showLogin(); // Automatically show the login form after successful signup
    } else {
        alert("Sign up failed!");
    }
});

// Login form validation
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Check if login fields are empty
    if (!username || !password) {
        alert("Both username and password must be filled!");
        return;
    }

    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        alert("Login successful!");
    } else {
        alert("Login failed!");
    }
});

// Real-time email validation
document.getElementById("email").addEventListener("input", () => {
    const email = document.getElementById("email").value;
    const emailWarning = document.getElementById("emailWarning");
    if (!validateEmail(email)) {
        emailWarning.textContent = "Please enter a valid email address.";
        emailWarning.style.display = "block";
    } else {
        emailWarning.textContent = "";
        emailWarning.style.display = "none";
    }
});

// Real-time password validation
document.getElementById("password").addEventListener("input", () => {
    const password = document.getElementById("password").value;
    const missingRequirements = checkPasswordStrength(password);
    updatePasswordFeedback(missingRequirements);
});