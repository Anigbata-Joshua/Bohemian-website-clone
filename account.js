let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantId = localStorage.getItem("merchant_id");

// 1. SELECTORS - Using "let" so we can check if they exist
let closeBtn = document.getElementById("close_btn");
let logInBtn = document.getElementById("login_btn"); // Make sure this ID matches your HTML button
let errMsg = document.getElementById("message");

// Sections
let loginHidden = document.querySelector(".login_toggle");
let registerHidden = document.querySelector(".register_section");
let myModal = document.querySelector(".myModal");

// Toggles
let creatAccSection = document.getElementById("create_acc_section");
let loginAccSection = document.getElementById("login_accc_section");

// Inputs
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("user_password");
let reg_name = document.getElementById("name");
let reg_mail = document.getElementById("new_user_email");
let createPassword = document.getElementById("create_password");
let confirmPassword = document.getElementById("confirm_password");
let regBtn = document.getElementById("create_acc_btn");

// --- INITIAL STATE ---
if (loginHidden && myModal) {
    loginHidden.classList.remove("hidden");
    myModal.classList.remove("hidden");
}

// --- TOGGLE LOGIC ---
if (creatAccSection && registerHidden && loginHidden) {
    creatAccSection.addEventListener('click', (e) => {
        e.preventDefault();
        registerHidden.classList.remove("hidden");
        loginHidden.classList.add("hidden");
    });
}

if (loginAccSection && registerHidden && loginHidden) {
    loginAccSection.addEventListener('click', (e) => {
        e.preventDefault();
        registerHidden.classList.add("hidden");
        loginHidden.classList.remove("hidden");
    });
}

// --- REGISTRATION LOGIC ---
if (regBtn) {
    regBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Safety Check: Do inputs exist?
        if (!reg_name || !reg_mail || !createPassword || !confirmPassword) {
            console.error("Registration inputs missing from HTML");
            return;
        }

        if (createPassword.value !== confirmPassword.value) {
            errMsg.innerText = "PASSWORDS MUST MATCH";
            errMsg.style.color = "red";
            return;
        }

        let nameParts = reg_name.value.trim().split(' ');
        let userInfo = {
            "first_name": nameParts[0] || "User",
            "last_name": nameParts[1] || "Customer",
            "email": reg_mail.value.trim().toLowerCase(),
            "password": createPassword.value,
            "phone": "08000000000",
            "merchant_id": merchantId
        };

        fetch(`${base_url}/users`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    errMsg.innerText = "SUCCESS! SWITCHING TO LOGIN...";
                    errMsg.style.color = "green";
                    setTimeout(() => { loginAccSection.click(); }, 1500);
                } else {
                    errMsg.innerText = data.msg || "REGISTRATION FAILED.";
                }
            });
    });
}

// --- LOGIN LOGIC ---
if (logInBtn) {
    logInBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Safety Check: Do inputs exist?
        if (!userEmail || !userPassword) {
            console.error("Login inputs missing from HTML (check IDs)");
            return;
        }

        let loginInfo = {
            "email": userEmail.value.trim().toLowerCase(),
            "password": userPassword.value,
            "merchant_id": merchantId
        };

        fetch(`${base_url}/users/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(loginInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    localStorage.setItem("user_id", data.id);
                    localStorage.setItem("user_data", JSON.stringify(data));
                    myModal.classList.add("hidden");

                    alert(`WELCOME BACK, ${data.first_name.toUpperCase()}!`);

                    setTimeout(() => {
                        window.location.href = "bohemaintraders.html";
                    }, 1500)
                } else {
                    errMsg.innerText = "INVALID EMAIL OR PASSWORD.";
                    errMsg.style.color = "red";
                }
            })
            .catch(err => {
                console.error("Login Error:", err);
                errMsg.innerText = "CONNECTION ERROR.";
            });
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myModal.classList.add("hidden");
    });
}