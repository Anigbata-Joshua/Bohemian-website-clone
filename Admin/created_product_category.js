let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantId = localStorage.getItem("merchant_id") || "69ca2b341595cbe8104585f5";

// Input IDs
let catMessage = document.getElementById("message");
let createBtn = document.getElementById("create_btn");
let catTitleInput = document.getElementById("title");

createBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let categoryName = catTitleInput.value.trim();

    // Input validation
    if (!categoryName) {
        catMessage.innerText = "Please enter a category title.";
        catMessage.style.color = "red";
        return;
    }

    if (!merchantId) {
        catMessage.innerText = "Error: Merchant ID missing. Please log in first.";
        catMessage.style.color = "red";
        return;
    }

    // From Api
    let apiFormat = {
        name: categoryName,
        merchant_id: merchantId,
        image: ""
    };

    createBtn.innerText = "Creating...";
    createBtn.disabled = true;

    // Fetch
    fetch(`${base_url}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiFormat)
    })
        .then((res) => res.json())
        .then((data) => {

            if (data.id || data._id) {
                catMessage.innerText = "Category created successfully!.... REDIRECTING";
                catMessage.style.color = "green";
                catTitleInput.value = "";
                
                // setTimeout(() => {
                //     window.location.href = "view_category.html"
                // }, 7000)
                console.log("Success:", data);
            } else {
                catMessage.innerText = data.msg || "Failed to create category";
                catMessage.style.color = "red";
            }
        })
        .catch((err) => {
            createBtn.innerText = "Create Product Category";
            createBtn.disabled = false;
            catMessage.innerText = "Server connection failed.";
            console.error("Fetch error:", err);
        });
});