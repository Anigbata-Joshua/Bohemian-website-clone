let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let errorMessage = document.getElementById("error_message");

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

document.getElementById("create_acc_btn").addEventListener('click', (e) => {
    e.preventDefault();
    errorMessage.innerText = "";

    // Input Values
    let firstName = document.getElementById("first_name").value;
    let lastName = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let storeName = document.getElementById("store_name").value;
    let shopDescription = document.getElementById("shop_description").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;

    // Validation
    if (password !== confirmPassword) {
        errorMessage.innerText = "Passwords don't match";
        return;
    }

    if (!emailRegex.test(email)) {
        errorMessage.innerText = "Please enter a valid email address.";
        return;
    }

    // API Format from documentation
    let apiFormat = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        store_name: storeName,
        descp: shopDescription,
        icon: " ",
        banner: " ",
        phones: [phone],
        password: password
    };

    fetch(`${base_url}/merchants`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(apiFormat)
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.id) {

                let merchantAccount = {
                    id: data.id,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    store_name: storeName
                };

                // Save to LocalStorage 
                localStorage.setItem("merchant", JSON.stringify(merchantAccount));
                localStorage.setItem("merchant_id", data.id);
                localStorage.setItem("store_name", storeName)

                errorMessage.style.color = "green";
                errorMessage.innerText = "Account Created! Redirecting to Login...";

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            } else {
                errorMessage.style.color ="red"
                errorMessage.innerText = data.msg || "Registration failed. Try a different email.";
            }
        })
        .catch((err) => {
            errorMessage.innerText = "Server error. Please try again.";
            console.error(err);
        });
});