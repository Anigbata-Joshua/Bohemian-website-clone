let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantId = localStorage.getItem("merchant_id");
let gridContainer = document.getElementById("product_grid_container");
let messageBox = document.getElementById("message");

// 1. Fetch all products with safety check
function fetchProducts() {
    if (!merchantId) {
        messageBox.innerText = "Error: Merchant ID not found.";
        return;
    }

    fetch(`${base_url}/products?merchant_id=${merchantId}`)
        .then(res => res.json())
        .then(response => {
            console.log("API Raw Response:", response);

            let productsArray = Array.isArray(response) ? response : (response.data || response.products || []);

            display(productsArray);
        })
        .catch(err => {
            console.error("Fetch Error:", err);
            messageBox.innerText = "Could not connect to the warehouse.";
        });
}

function display(products) {
    // gridContainer.innerHTML
    let content = "";

    if (!Array.isArray(products) || products.length == 0) {
        gridContainer.innerHTML = `
            <div class="col-span-full text-center py-20">
                <p class="text-gray-400 font-light italic tracking-widest uppercase text-xs">
                    Your inventory is currently empty.
                </p>
            </div>`;
        return;
    }

    products.forEach(product => {

        content += `
            <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                <div class="aspect-square bg-gray-50 relative overflow-hidden">
                    <img src="${product.image}" alt="" <a href="./cart.html"></a>
                        class="w-full h-auto object-cover">
                </div>
                <div class="p-6 text-center">
                    <h3 class="text-sm font-semibold text-gray-800 uppercase tracking-tight mb-1 truncate">${product.title}</h3>
                    <p class="text-lg font-light text-gray-900 mb-4">₦${product.price}</p>
                    <div class="flex items-center justify-center gap-6 border-t border-gray-50 pt-4">
                        <button onclick="deleteProduct('${product.id}')" class="text-[10px] font-bold text-red-300 hover:text-red-600 tracking-[0.2em] uppercase transition cursor-pointer">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
        gridContainer.innerHTML= content;
    });
}

function deleteProduct(id) {
    if (confirm("Permanently remove this item from inventory?")) {
        fetch(`${base_url}/products/${id}`, { method: 'DELETE' })
            .then(() => fetchProducts()) 
            .catch(err => console.log(err));
    }
}

// 4. Edit Function (Placeholder for your edit logic)
function editProduct(id) {
    // Usually redirects to an edit page: window.location.href = `./edit_product.html?id=${id}`;
    alert("Edit functionality for ID: " + id);
}

// Initialize
document.addEventListener("DOMContentLoaded", fetchProducts);