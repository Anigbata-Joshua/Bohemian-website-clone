let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantId = localStorage.getItem("merchant_id");

let userEmail = document.getElementById("user_email");
let userPassword = document.getElementById("user_password");


// --- LOGIN LOGIC ---
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    let loginInfo = {
        "email": userEmail.value,
        "password": userPassword.value
    };

    fetch(`${base_url}/users/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginInfo)
    })
    .then(res => res.json())
    .then(data => {
        if (data.id) {
            // Save user info for the checkout/profile pages
            localStorage.setItem("user_id", data.id);
            localStorage.setItem("user_data", JSON.stringify(data));
            myModal.classList.add("hidden"); // Close modal on success
            alert(`Welcome back, ${data.first_name}!`);
        } else {
            alert("Invalid email or password.");
        }
    })
    .catch(err => console.error("Login Error:", err));
});
