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
});
