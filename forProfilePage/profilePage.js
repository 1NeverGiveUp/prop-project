document.addEventListener("DOMContentLoaded", function () {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
      window.location.href = "/forLogin/login.html";
      return;
  }
  let userData = JSON.parse(userStr);

  const fullNameEl = document.getElementById("fullName");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const emailDisplay = document.getElementById("emailDisplay");
  const telDisplay = document.getElementById("telDisplay");
  const passwordSpan = document.getElementById("passwordDisplay");
  const togglePasswordIcon = document.getElementById("togglePasswordIcon");
  const profileImage = document.getElementById("profileImage");

  const editModal = document.getElementById("editModal");
  const editForm = document.getElementById("editForm");
  const editName = document.getElementById("editName");
  const editLastname = document.getElementById("editLastname");
  const editUsername = document.getElementById("editUsername");
  const editEmail = document.getElementById("editEmail");
  const editTel = document.getElementById("editTel");
  const editPassword = document.getElementById("editPassword");
  const saveEditBtn = document.getElementById("saveEditBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");

  const editBtn = document.getElementById("editBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  let isPasswordVisible = false;
  let realPassword = userData.password || "********"; 

  function renderProfile() {
      fullNameEl.textContent = userData.name + " " + userData.lastname;
      usernameDisplay.textContent = userData.username;
      emailDisplay.textContent = userData.email;
      telDisplay.textContent = userData.telNumber;

      profileImage.src = userData.profilpicture && userData.profilpicture !== ""
          ? userData.profilpicture
          : "../forPictures/profilicon.png";

      passwordSpan.textContent = isPasswordVisible ? realPassword : "********";
  }
  renderProfile();

  togglePasswordIcon.addEventListener("click", function () {
      isPasswordVisible = !isPasswordVisible;
      passwordSpan.textContent = isPasswordVisible ? realPassword : "********";

      // Ikonka almashtirish
      togglePasswordIcon.classList.toggle("bx-low-vision", !isPasswordVisible);
      togglePasswordIcon.classList.toggle("bx-show", isPasswordVisible);
  });

  editBtn.addEventListener("click", function () {
      editModal.style.display = "flex";
      editName.value = userData.name;
      editLastname.value = userData.lastname;
      editUsername.value = userData.username;
      editEmail.value = userData.email;
      editTel.value = userData.telNumber;
      editPassword.value = userData.password;
  });

  saveEditBtn.addEventListener("click", function () {
      userData.name = editName.value.trim();
      userData.lastname = editLastname.value.trim();
      userData.username = editUsername.value.trim();
      userData.email = editEmail.value.trim();
      userData.telNumber = editTel.value.trim();
      userData.password = editPassword.value;
      realPassword = userData.password;

      localStorage.setItem("user", JSON.stringify(userData));
      renderProfile();
      editModal.style.display = "none";
  });

  cancelEditBtn.addEventListener("click", function () {
      editModal.style.display = "none";
  });

  logoutBtn.addEventListener("click", function () {
      localStorage.setItem("isLoggedIn", "false");
      window.location.href = "/forLogin/login.html";
  });

  deleteBtn.addEventListener("click", function () {
      localStorage.removeItem("user");
      localStorage.setItem("isLoggedIn", "false");
      window.location.href = "../forSignup/signup.html";
  });
});
