document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const telNumber = document.getElementById("telNumber").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const profilpictureInput = document.getElementById("profilpicture");

    if (password !== confirmPassword) {
      alert("Parollar mos emas!");
      return;
    }

    const userData = {
      name,
      lastname,
      username,
      email,
      telNumber,
      password,
      profilpicture: ""
    };

    const file = profilpictureInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        userData.profilpicture = e.target.result;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");
        alert("Ro'yxatdan o'tish muvaffaqiyatli!");
        window.location.href = "../index.html";
      };
      reader.readAsDataURL(file);
    } else {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      alert("Ro'yxatdan o'tish muvaffaqiyatli!");
      window.location.href = "../index.html";
    }
  });
});