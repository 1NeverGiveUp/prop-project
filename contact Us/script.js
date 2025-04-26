document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("contactForm");
    let responseMessage = document.getElementById("responseMessage");
    let submitButton = document.querySelector("button");
    let showMessagesButton = document.getElementById("showMessages");
    let modal = document.getElementById("modal");
    let closeModal = document.querySelector(".close-btn");
    let clearButton = document.getElementById("clearMessages");

    function getMessages() {
        return JSON.parse(localStorage.getItem("messages")) || [];
    }

    function saveMessages(messages) {
        localStorage.setItem("messages", JSON.stringify(messages));
    }

    function truncateText(text, maxLength = 30) {
        if (text.length <= maxLength) return `<span class="full">${text}</span>`;

        return `
            <span class="short">${text.substring(0, maxLength)}...</span>
            <span class="full hidden">${text}</span>
            <span class="more" style="color: cyan; cursor: pointer;">more</span>
        `;
    }

    function loadSavedMessages() {
        let messageList = document.getElementById("messagesList");
        let savedMessages = getMessages();

        messageList.innerHTML = "";
        savedMessages.forEach((msg, index) => {
            let messageItem = document.createElement("li");
            messageItem.innerHTML = `
                <div class="message-box">
                    <i class='bx bxs-message-dots'></i>
                    <strong>Name:</strong> ${msg.name} <br>
                    <strong>📧 Email:</strong> ${msg.email} <br>
                    <strong>📝 Message:</strong> 
                    <span class="message-content">
                        ${truncateText(msg.message)}
                    </span>
                    <br>
                    <i class='bx bxs-message-rounded-x delete-btn' data-index="${index}"> Delete message</i>
                </div>
            `;
            messageList.appendChild(messageItem);
        });

        clearButton.style.display = savedMessages.length > 0 ? "block" : "none";
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = form.name.value.trim();
        let email = form.email.value.trim();
        let telNumber = form.telNumber.value.trim();
        let message = form.message.value.trim();

        if (!name || !email || !telNumber || !message) {
            responseMessage.className = "error";
            responseMessage.innerText = "⚠️ Please fill in all fields!";
            return;
        }

        submitButton.innerText = "Sending...";
        submitButton.disabled = true;

        setTimeout(() => {
            let savedMessages = getMessages();
            savedMessages.push({ name, email, message, date: new Date().toLocaleString() });
            saveMessages(savedMessages);

            responseMessage.className = "success";
            responseMessage.innerText = "✅ Your message has been saved.";
            alert("Thank you for your message! We will review it shortly and get back to you.");
            form.reset();
            submitButton.innerText = "Send Message";
            submitButton.disabled = false;

            loadSavedMessages();
        }, 2000);
    });

    document.getElementById("messagesList").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            let index = event.target.getAttribute("data-index");
            let savedMessages = getMessages();
            savedMessages.splice(index, 1);
            saveMessages(savedMessages);
            loadSavedMessages();
        }

        if (event.target.classList.contains("more")) {
            let parent = event.target.closest(".message-content");
            parent.querySelector(".short").classList.add("hidden");
            parent.querySelector(".full").classList.remove("hidden");
            event.target.textContent = "less";
            event.target.classList.remove("more");
            event.target.classList.add("less");
        } else if (event.target.classList.contains("less")) {
            let parent = event.target.closest(".message-content");
            parent.querySelector(".short").classList.remove("hidden");
            parent.querySelector(".full").classList.add("hidden");
            event.target.textContent = "more";
            event.target.classList.remove("less");
            event.target.classList.add("more");
        }
    });

    showMessagesButton.addEventListener("click", () => modal.style.display = "flex");
    closeModal.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", (event) => { if (event.target === modal) modal.style.display = "none"; });
    clearButton.addEventListener("click", () => { saveMessages([]); loadSavedMessages(); });

    loadSavedMessages();
});
