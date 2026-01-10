const userBtn = document.getElementById("userBtn");
const adminBtn = document.getElementById("adminBtn");
const password = document.getElementById("password");
const type = document.getElementById("type");
const roleText = document.getElementById("loginText");
const roleInput = document.getElementById("role");
const loginBtn = document.getElementById("loginBtn");

/* Role switch */
userBtn.onclick = () => {
    userBtn.classList.add("active");
    adminBtn.classList.remove("active");

    roleText.innerText = "Candidate Login";
    roleInput.value = "user";

    password.classList.add("hidden");
    type.classList.remove("hidden");

    loginBtn.innerText = "Start Interview";
};

adminBtn.onclick = () => {
    adminBtn.classList.add("active");
    userBtn.classList.remove("active");

    roleText.innerText = "Admin Login";
    roleInput.value = "admin";

    password.classList.remove("hidden");
    type.classList.add("hidden");

    loginBtn.innerText = "Login as Admin";
};

/* Avatar selection */
document.querySelectorAll(".avatar").forEach(avatar => {
    avatar.onclick = () => {
        document.querySelectorAll(".avatar")
            .forEach(a => a.classList.remove("selected"));
        avatar.classList.add("selected");
    };
});

/* Validation */
function validateLogin() {
    if (roleInput.value === "admin") {
        if (password.value !== "admin123") {
            alert("Invalid admin password");
            return false;
        }
    }
    return true;
}
