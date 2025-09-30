// Form validation and steps
let currentStep = 1;
const formData = {
  name: "",
  email: "",
  phone: "",
  consent: false
};

// Phone mask
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");

  if (value.startsWith("380")) {
    value = value.substring(3);
  }

  if (value.length > 0) {
    let formatted = "+380";
    if (value.length > 0) formatted += " (" + value.substring(0, 2);
    if (value.length >= 2) formatted += ") " + value.substring(2, 5);
    if (value.length >= 5) formatted += "-" + value.substring(5, 7);
    if (value.length >= 7) formatted += "-" + value.substring(7, 9);
    e.target.value = formatted;
  }
});

function validateName(name) {
  if (!name || name.trim().length < 2) {
    return "Ім'я повинно містити мінімум 2 символи";
  }
  if (!/^[а-яА-ЯёЁіІїЇєЄa-zA-Z\s'-]+$/.test(name)) {
    return "Ім'я може містити тільки літери";
  }
  return "";
}

function validateEmail(email) {
  if (!email) {
    return "Email обов'язковий";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Введіть коректний email";
  }
  return "";
}

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 12) {
    return "Введіть повний номер телефону";
  }
  return "";
}

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + "Error");

  if (message) {
    input.classList.add("error");
    error.textContent = message;
  } else {
    input.classList.remove("error");
    error.textContent = "";
  }
}

// Step navigation
function goToStep2() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const nameError = validateName(name);
  const emailError = validateEmail(email);

  showError("name", nameError);
  showError("email", emailError);

  if (nameError || emailError) {
    return;
  }

  // Save data
  formData.name = name;
  formData.email = email;

  currentStep = 2;
  document.getElementById("formStep1").classList.remove("active");
  document.getElementById("formStep2").classList.add("active");
  document.getElementById("step1Indicator").classList.remove("active");
  document.getElementById("step2Indicator").classList.add("active");
  document.getElementById("progressFill").style.width = "100%";
}

function goToStep1() {
  currentStep = 1;
  document.getElementById("formStep2").classList.remove("active");
  document.getElementById("formStep1").classList.add("active");
  document.getElementById("step2Indicator").classList.remove("active");
  document.getElementById("step1Indicator").classList.add("active");
  document.getElementById("progressFill").style.width = "50%";
}

// Form submission
document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const consent = document.getElementById("consent").checked;

  const phoneError = validatePhone(phone);
  showError("phone", phoneError);

  const consentError = document.getElementById("consentError");
  if (!consent) {
    consentError.textContent = "Необхідно прийняти умови";
  } else {
    consentError.textContent = "";
  }

  if (phoneError || !consent) {
    return;
  }

  // Save data
  formData.phone = phone;
  formData.consent = consent;

  // Show success modal
  showSuccessModal();

  // Reset form
  resetForm();
});

function showSuccessModal() {
  document.getElementById("successModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("successModal").classList.remove("active");
  document.body.style.overflow = "";
}

function resetForm() {
  document.getElementById("leadForm").reset();
  goToStep1();

  showError("name", "");
  showError("email", "");
  showError("phone", "");
  document.getElementById("consentError").textContent = "";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

function scrollToForm() {
  const formSection = document.getElementById("form");
  formSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
