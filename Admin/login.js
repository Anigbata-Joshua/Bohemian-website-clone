let base_url = "http://ecommerce.reworkstaging.name.ng/v2";

let signinbtn = document.getElementById("signinbtn");

signinbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let inputEmail = document.getElementById("email").value.trim();
    let inputPassword = document.getElementById("password").value.trim();

    errorMessage.innerText = "";
    if (!inputEmail || !inputPassword) {
        errorMessage.innerText="Please enter both email and password.";
        return;
    }
    let logedinMerchant = JSON.parse(localStorage.getItem("merchantData")) || [];

    let checkLogedInMerchant = logedinMerchant.find(merchant => 
        merchant.email == inputEmail && merchant.password == inputPassword
    );

    if (logedinMerchant) {
        localStorage.setItem("current_merchant", JSON.stringify(checkLogedInMerchant));

        errorMessage.style.color = "#10B981";
        errorMessage.innerText = "Login successful! Redirecting to dashboard...";

        setTimeout(() => {
            window.location.href = "dashboard.html"; 
        }, 2000);

    } else {
        errorMessage.innerText = "Invalid email or password. Please try again.";
    }
});

