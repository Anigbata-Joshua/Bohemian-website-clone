let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantId = localStorage.getItem("merchant_id");

let categorySelect = document.getElementById("category_id");//from category created page
let productForm = document.getElementById("ProductForm");
let messageBox = document.getElementById("message");

function loadCategories() {
    if (!merchantId) {
        console.error("Merchant ID missing");
        return;
    }

    fetch(`${base_url}/categories?merchant_id=${merchantId}`)
        .then(res => res.json())
        .then(data => {
            // Clear existing options except the first one
            categorySelect.innerHTML = '<option value="">Select Category</option>' || " ";

            if (data && data.length > 0) {
                data.forEach(cat => {
                    let option = document.createElement("option");//This is from the select opt in html
                    option.value = cat.id; // The ID sent to the product API
                    option.textContent = cat.name.toUpperCase();
                    categorySelect.appendChild(option);
                });
            } else {
                let option = document.createElement("option");
                option.textContent = "No Categories Found";
                option.disabled = true;
                categorySelect.appendChild(option);
            }
        })
        .catch(err => {
            console.error("Error loading categories:", err);
            messageBox.innerText = "Error loading categories.";
        });
}

productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Form input fields
    let title = document.getElementById("title").value;
    let desciption = document.getElementById("descp").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let image = document.getElementById("image").value;
    let category_id = categorySelect.value;
    console.log(category_id);

    // form validation
    if (!title || !price || !category_id) {
        messageBox.innerText = "Please fill in all required fields.";
        messageBox.style.color = "red";
        return;
    }

    let productData = {
        merchant_id: merchantId,
        title: title,
        descp: desciption,
        price: Number(price),
        quantity: Number(quantity),
        images: image,
        category_id: category_id,
        currency: "NGN" 
    };

    messageBox.innerText = "Creating product...";
    messageBox.style.color = "gray";

    fetch(`${base_url}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
    })
        .then(res => res.json())
        .then(data => {
            console.log("Success:", data);
            messageBox.innerText = "Product Created Successfully!";
            messageBox.style.color = "green";

            productForm.reset();
        })
        .catch(err => {
            console.error("Error:", err);
            messageBox.innerText = "Failed to create product.";
            messageBox.style.color = "red";
        });
});

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    loadCategories();

    // Optional: Show merchant name in header if stored
    let merchantName = localStorage.getItem("first_name");
    if (merchantName) {
        document.getElementById("merchant_name").innerText = merchantName;
    }
});