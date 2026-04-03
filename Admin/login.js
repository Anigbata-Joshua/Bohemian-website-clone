let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let signinbtn = document.getElementById("signinbtn");

signinbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let inputEmail = document.getElementById("email").value.trim();
    let inputPassword = document.getElementById("password").value.trim();
    

    fetch(`${base_url}/merchants/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail, password: inputPassword })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.id) {
            errorMessage.style.color = "red";
            errorMessage.innerText ="Email or password missmatch.";
            
        setTimeout(() => { 
            window.location.reload()
        }, 5000);

            localStorage.removeItem("merchant");
            return; 
        }

        localStorage.setItem("merchant", JSON.stringify(data));
        localStorage.setItem("merchant_id", data.id);

        errorMessage.style.color = "green";
        errorMessage.innerText = "Login Successful!";

        setTimeout(() => { 
            window.location.href = "dashboard.html"; 
        }, 1500);
    })
    .catch(error => {
        errorMessage.style.color = "red";
        errorMessage.innerText = "Connection error. Please try again.";
        console.error(error);
    });
});