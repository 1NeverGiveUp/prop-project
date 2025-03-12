document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Tizimga kirish muvaffaqiyatli!");
      window.location.href = "../index.html";
    } else {
      alert("Foydalanuvchi nomi yoki parol noto'g'ri!");
    }
  });

  function setupPasswordToggle(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    input.addEventListener("input", () => {
      icon.style.display = input.value ? "block" : "none";
    });

    icon.addEventListener("click", () => {
      const isPasswordHidden = input.type === "password";
      input.type = isPasswordHidden ? "text" : "password";
      icon.classList.toggle("bx-hide", !isPasswordHidden);
      icon.classList.toggle("bx-show", isPasswordHidden);
    });

    icon.style.display = "none";
  }

  setupPasswordToggle("password", "togglePasswordButton");
  setupPasswordToggle("confirmPassword", "toggleConfirmPasswordButton");
  
});
