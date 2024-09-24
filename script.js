document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".registrationForm");

  const nameInput = document.getElementById("name");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const nameError = createErrorElement("nameError");
  const usernameError = createErrorElement("usernameError");
  const emailError = createErrorElement("emailError");
  const phoneError = createErrorElement("phoneError");
  const passwordError = createErrorElement("passwordError");
  const confirmPasswordError = createErrorElement("confirmPasswordError");

  nameInput.parentElement.appendChild(nameError);
  usernameInput.parentElement.appendChild(usernameError);
  emailInput.parentElement.appendChild(emailError);
  phoneInput.parentElement.appendChild(phoneError);
  passwordInput.parentElement.appendChild(passwordError);
  confirmPasswordInput.parentElement.appendChild(confirmPasswordError);

  nameInput.addEventListener("input", validateName);
  usernameInput.addEventListener("input", validateUsername);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  passwordInput.addEventListener("input", validatePasswordMatch);
  confirmPasswordInput.addEventListener("input", validatePasswordMatch);

  let isValid = false;

  function createErrorElement(id) {
    const errorElement = document.createElement("span");
    errorElement.classList.add("errorMessage");
    errorElement.id = id;
    return errorElement;
  }

  function setBorderAndMessage(
    element,
    isValid,
    messageElement,
    errorMessage = "",
    successMessage = "Looks good!"
  ) {
    if (isValid) {
      element.style.borderColor = "green";
      messageElement.textContent = successMessage;
      messageElement.style.color = "green";
    } else {
      element.style.borderColor = "red";
      messageElement.textContent = errorMessage;
      messageElement.style.color = "red";
    }
  }

  function validateName() {
    if (nameInput.value.trim() === "") {
      setBorderAndMessage(nameInput, false, nameError, "Name cannot be empty.");
      isValid = false;
    } else {
      setBorderAndMessage(nameInput, true, nameError);
      isValid = true;
    }
  }

  function validateUsername() {
    if (usernameInput.value.trim() === "") {
      setBorderAndMessage(
        usernameInput,
        false,
        usernameError,
        "Username cannot be empty."
      );
      isValid = false;
    } else if (usernameInput.value.length < 8) {
      setBorderAndMessage(
        usernameInput,
        false,
        usernameError,
        "Username must be at least 8 characters long."
      );
      isValid = false;
    } else {
      setBorderAndMessage(usernameInput, true, usernameError);
      isValid = true;
    }
  }

  function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      setBorderAndMessage(
        emailInput,
        false,
        emailError,
        "Please enter a valid email address."
      );
      isValid = false;
    } else {
      setBorderAndMessage(emailInput, true, emailError);
      isValid = true;
    }
  }

  function validatePhone() {
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneInput.value)) {
      setBorderAndMessage(
        phoneInput,
        false,
        phoneError,
        "Please enter a valid 10-digit phone number."
      );
      isValid = false;
    } else {
      setBorderAndMessage(phoneInput, true, phoneError);
      isValid = true;
    }
  }

  function validatePasswordMatch() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordPattern.test(passwordInput.value)) {
      setBorderAndMessage(
        passwordInput,
        false,
        passwordError,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      isValid = false;
    } else {
      setBorderAndMessage(passwordInput, true, passwordError);

      if (confirmPasswordInput.value === "") {
        setBorderAndMessage(
          confirmPasswordInput,
          false,
          confirmPasswordError,
          "Confirm password cannot be empty."
        );
        isValid = false;
      } else if (passwordInput.value !== confirmPasswordInput.value) {
        setBorderAndMessage(
          confirmPasswordInput,
          false,
          confirmPasswordError,
          "Passwords do not match."
        );
        isValid = false;
      } else {
        setBorderAndMessage(confirmPasswordInput, true, confirmPasswordError);
        isValid = true;
      }
    }
  }

  form.addEventListener("submit", function (event) {
    isValid = true;

    validateName();
    validateUsername();
    validateEmail();
    validatePhone();
    validatePasswordMatch();

    if (!isValid) {
      event.preventDefault();
      alert("Please fix the errors in the form before submitting.");
    } else {
      event.preventDefault();
      window.location.href = "./success.html";
    }
  });
});
