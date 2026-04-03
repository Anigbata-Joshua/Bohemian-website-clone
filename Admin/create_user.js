let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let errorMessage = document.getElementById("message");
let merchantId = localStorage.getItem("merchant_id") 


let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

document.getElementById("register_btn").addEventListener('click', (e) => {
    e.preventDefault();
    errorMessage.innerText = "";

    let firstName = document.getElementById("first_name").value;
    let lastName = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;

    if (!passwordRegex) {
        errorMessage.innerText = "Atleast: 8+ char, 1 uppercase, 1 lowercase, 1 number";
        return;
    }

    if (!emailRegex.test(email)) {
        errorMessage.innerText = "Please enter a valid email address.";
        errorMessage.style.color ="red"
        return;
    }

    let apiFormat = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password
    };

    fetch(`${base_url}/users`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(apiFormat)
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.id) {
                let userAccount = {
                    id: merchantId,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: [phone]
                };

                localStorage.setItem("merchant", JSON.stringify(userAccount));
                localStorage.setItem("merchant_id", data.id);

                errorMessage.style.color = "green";
                errorMessage.innerText = "Account Created! Redirecting to Dashboard...";

                setTimeout(() => {
                    window.location.href = "users.html";
                }, 1500);
            } else {
                errorMessage.innerText = data.msg || "Registration failed. Try a different email.";
                errorMessage.style.color = "red"
            }
        })
        .catch((err) => {
            errorMessage.innerText = "Server error. Please try again.";
            console.error("server error", err);
        });
});