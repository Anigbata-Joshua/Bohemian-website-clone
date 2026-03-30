let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantId = localStorage.getItem("merchant_id");
// let product_view_header = document.getElementById("product_view_header")
// let product_view = document.querySelectorAll(".product_view")
let productArry = []; shopProducts

function shopProducts() {
    let shopGrid = document.getElementById("shop_grid");
    if (!shopGrid) return;

    fetch(`${base_url}/products?merchant_id=${merchantId}`)
        .then(res => res.json())
        .then(response => {

            productArry = response.data || response || [];

            let content = "";
            productArry.forEach(product => {
                let cleanPrice = String(product.price).replace(/,/g, '');
                let formattedPrice = Number(cleanPrice).toLocaleString();

                content += `
                <div class="p-2 bg-white  group  hover:border-stone-100 transition-all">
                    <div class="relative overflow-hidden">
                        <a href="./product_page.html?product_id=${product.id}">
                            <img src="${product.image}" alt="${product.title}" class="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-105">
                        </a>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span class="bg-white/90 px-6 py-3 text-[10px] tracking-[0.3em] uppercase font-medium shadow-sm">Quick View</span>
                        </div>
                    </div>
                    

                    <div class="mt-4 space-y-1">
                       <h2 class="inline-block mb-2 bg-gray-200 text-[10px] px-4 py-1 tracking-wider uppercase">NATURAL FIBRE</h2>
                        <h4 class="text-[14px] font-serif text-stone-800 leading-tight h-10 overflow-hidden">${product.title}</h4>
                        <h2 class="mt-2 text-gray-400 text-[12px] tracking-wide">BOHEMIAN TRADERS</h2>
                        <div class="flex justify-between items-center pt-2">
                            <span class="text-[13px] tracking-widest font-medium">₦${formattedPrice}</span>
                            
                      
                        </div>
                    </div>
                </div>
                `;
            });

            shopGrid.innerHTML = content;
        })
        .catch(err => console.error("Error loading products:", err));


    // --- EVENT DELEGATION LOGIC ---

    shopGrid.addEventListener("click", (e) => {
        // Check if the clicked element has our specific class
        if (e.target.classList.contains("add-to-bag-btn")) {
            let id = e.target.getAttribute("data-product-id");
            handleAddToCart(id);
        }
    });
}

function handleAddToCart(productId) {
    // 1. Find the specific product object from our local 'fetchedProducts' array
    const selectedProduct = productArry.find(item => item.id === productId);

    if (!selectedProduct) return;

    let productCart = localStorage.getItem("bohemian_cart")

    // 3. Prevent Duplicates
    let isAlreadyInCart = cart.find(item => item.id === productId);
    if (isAlreadyInCart) {
        alert("This item is already in your shopping cart.");
        return;
    }

    // 4. Clean and push the product
    let cartItem = {
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity: 1
    };

    cart.push(cartItem);
    localStorage.setItem("bohemian_cart", JSON.stringify(cart));

    alert(`${selectedProduct.title} added to cart.`);
}

shopProducts();
// product_view_header.forEach((btn) =>{
//     btn.addEventListener('click', ()=>{
//         shopProducts(btn.value);
//         product_view_header.innerHTML = ""
//     })
// })
