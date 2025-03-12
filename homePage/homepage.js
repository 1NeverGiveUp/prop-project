document.addEventListener("DOMContentLoaded", function () {
    const MyProject = {
        toggleSidebar: function () {
            const sidebar = document.getElementById("sidebar");
            const toggleButton = document.getElementById("toggleSidebar");
            if (sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
                toggleButton.setAttribute("aria-expanded", "false");
            } else {
                sidebar.classList.add("active");
                toggleButton.setAttribute("aria-expanded", "true");
            }
        },
        toggleChatPanel: function () {
            const chatPanel = document.getElementById("chat-panel");
            const chatToggleBtn = document.getElementById("chatToggleBtn");
            if (chatPanel.classList.contains("closed")) {
                chatPanel.classList.remove("closed");
                chatToggleBtn.setAttribute("aria-expanded", "true");
            } else {
                chatPanel.classList.add("closed");
                chatToggleBtn.setAttribute("aria-expanded", "false");
            }
        },
        closeChatPanel: function () {
            const chatPanel = document.getElementById("chat-panel");
            const chatToggleBtn = document.getElementById("chatToggleBtn");
            chatPanel.classList.add("closed");
            chatToggleBtn.setAttribute("aria-expanded", "false");
        },
        sendChatMessage: function () {
            const chatInput = document.querySelector(".chat-input textarea");
            const chatMessages = document.querySelector(".chat-messages");
            const messageText = chatInput.value.trim();

            if (messageText === "") {
                chatInput.classList.add("error");
                setTimeout(() => {
                    chatInput.classList.remove("error");
                }, 300);
                return;
            }

            const messageItem = document.createElement("li");
            messageItem.textContent = messageText;
            messageItem.classList.add("sent");
            chatMessages.appendChild(messageItem);

            chatInput.value = "";
            chatInput.style.height = "40px";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        },
        adjustTextareaHeight: function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        },
        toggleProfilePanel: function () {
            const profilePanel = document.getElementById("profilePanel");
            if (profilePanel.classList.contains("closed")) {
                profilePanel.classList.remove("closed");
                profilePanel.classList.add("active");
            } else {
                profilePanel.classList.remove("active");
                profilePanel.classList.add("closed");
            }
        },
        closeProfilePanel: function () {
            const profilePanel = document.getElementById("profilePanel");
            profilePanel.classList.remove("active");
            profilePanel.classList.add("closed");
        },
        signOut: function () {
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
        },
        init: function () {
            document.getElementById("toggleSidebar").addEventListener("click", MyProject.toggleSidebar);
            document.getElementById("chatToggleBtn").addEventListener("click", MyProject.toggleChatPanel);
            document.getElementById("chatCloseBtn").addEventListener("click", MyProject.closeChatPanel);
            document.querySelector(".chat-input button").addEventListener("click", MyProject.sendChatMessage);
            document.querySelector(".chat-input textarea").addEventListener("input", MyProject.adjustTextareaHeight);
            document.querySelector(".chat-input textarea").addEventListener("keydown", function (e) {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    MyProject.sendChatMessage();
                }
            });

            document.addEventListener("click", function (e) {
                const sidebar = document.getElementById("sidebar");
                const toggleButton = document.getElementById("toggleSidebar");
                if (
                    sidebar.classList.contains("active") &&
                    !sidebar.contains(e.target) &&
                    e.target !== toggleButton
                ) {
                    sidebar.classList.remove("active");
                    toggleButton.setAttribute("aria-expanded", "false");
                }

                const chatPanel = document.getElementById("chat-panel");
                const chatToggleBtn = document.getElementById("chatToggleBtn");
                if (
                    !chatPanel.classList.contains("closed") &&
                    !chatPanel.contains(e.target) &&
                    e.target !== chatToggleBtn
                ) {
                    chatPanel.classList.add("closed");
                    chatToggleBtn.setAttribute("aria-expanded", "false");
                }

                const profilePanel = document.getElementById("profilePanel");
                const profileIcon = document.getElementById("profileIcon");
                if (
                    profilePanel.classList.contains("active") &&
                    !profilePanel.contains(e.target) &&
                    e.target !== profileIcon
                ) {
                    profilePanel.classList.remove("active");
                    profilePanel.classList.add("closed");
                }
            });

            const isLoggedIn = localStorage.getItem("isLoggedIn");
            const authContainer = document.querySelector(".auth-container");
            const profileIconContainer = document.getElementById("profileIconContainer");
            const profileIcon = document.getElementById("profileIcon");
            const profileCloseBtn = document.getElementById("profileCloseBtn");
            const signOutBtn = document.getElementById("signOutBtn");

            if (isLoggedIn === "true") {
                if (authContainer) {
                    authContainer.style.display = "none";
                }
                if (profileIconContainer) {
                    profileIconContainer.style.display = "flex";
                }
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (storedUser) {
                    document.getElementById("profileUserNameDisplay").textContent = storedUser.username;
                    document.getElementById("profileNameDisplay").textContent = storedUser.name;
                    document.getElementById("profileEmailDisplay").textContent = storedUser.email;
                }
            } else {
                if (profileIconContainer) {
                    profileIconContainer.style.display = "none";
                }
            }

            if (profileIcon) {
                profileIcon.addEventListener("click", MyProject.toggleProfilePanel);
            }
            if (profileCloseBtn) {
                profileCloseBtn.addEventListener("click", MyProject.closeProfilePanel);
            }
            if (signOutBtn) {
                signOutBtn.addEventListener("click", MyProject.signOut);
            }

            const editProfileBtn = document.getElementById("editProfileBtn");

            if (editProfileBtn) {
                editProfileBtn.addEventListener("click", function() {
                    window.location.href = "../forProfilePage/profilepage.html";
                });
            }            
        }
    };

    MyProject.init();
});
