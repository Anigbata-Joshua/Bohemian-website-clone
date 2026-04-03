function displayCart() {
    let tableContainer = document.getElementById("table_container");
    let fromLocalStorage = localStorage.getItem("bohemian_cart");

    if (!tableContainer) {
        console.error("❌ ERROR: id='table_container' NOT FOUND IN HTML.");
        return;
    }

    if (!fromLocalStorage || JSON.parse(fromLocalStorage).length === 0) {
        tableContainer.innerHTML = `
            <div class="text-center py-20">
                <p class="tracking-[0.2em] uppercase text-black text-[20px]">Your cart is currently empty</p>
                <a href="./bohemaintraders.html" class="inline-block mt-6 border-b border-black pb-1 text-sm uppercase tracking-widest">Continue Shopping</a>
            </div>`;
        return;
    }

    let products = JSON.parse(fromLocalStorage);
    let rows = "";
    let grandTotal = 0;

    products.forEach((item) => {
        // 1. Fix the calculation logic
        let numericPrice = Number(item.price.toString().replace(/[^0-9.-]+/g, ""));
        let itemTotal = numericPrice * item.quantity;
        grandTotal += itemTotal;

        rows += `
            <tr class="border-b border-stone-100 group">
                <td class="py-10">
                    <div class="flex gap-6 items-center">
                        <img src="${item.image}" class="w-20 h-28 object-cover shadow-sm">
                        <div class="space-y-1 text-left">
                            <h2 class="text-[10px] tracking-widest text-stone-400 uppercase">Bohemian Traders</h2>
                            <p class="font-serif text-[15px] text-[#B5894F] leading-tight">${item.title}</p>
                        </div>
                    </div>
                </td>
                <td class="text-stone-900 font-semilight">₦${item.price}</td>
                <td>
                    <div class="flex items-center justify-center border border-stone-200 w-max mx-auto px-2">
                        <button class="w-8 h-8 decrease_btn cursor-pointer" id="${item.id}">-</button>
                        <span class="px-4 text-md font-medium">${item.quantity}</span>
                        <button class="w-8 h-8 increase_btn cursor-pointer" id="${item.id}">+</button>
                    </div>
                </td>
                <td class="text-right font-semilight text-stone-900">
                    ₦${itemTotal.toLocaleString()}
                    <button class="text-[#B5894F] ml-4 remove_btn cursor-pointer text-3xl" id="${item.id}">x</button>
                </td>
            </tr>
        `;
    });

    // 3. Inject the final structure
    tableContainer.innerHTML = `
        <div class="myCart max-w-6xl mx-auto mt-10 px-4">
            <table class="w-full border-collapse">
                <thead>
                    <tr class="text-left text-[11px] uppercase tracking-widest text-black border-b border-stone-200">
                        <th class="py-6 font-bold">Product</th>
                        <th class="py-6 font-bold">Price</th>
                        <th class="py-6 font-bold text-center">Quantity</th>
                        <th class="py-4 font-bold text-right">Total</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>

            <div class="mt-8 flex justify-end">
                <div class="w-full max-w-[350px] space-y-4 border-t border-gray-200 pt-6 text-right">
                    <div class="flex justify-between items-center">
                        <span class="text-[12px] uppercase tracking-widest text-gray-500">Subtotal:</span>
                        <span class="font-semibold text-sm text-stone-800">₦${grandTotal.toLocaleString()}</span>
                    </div>
                    <button class="bg-black text-white py-4 px-12 uppercase text-[11px] tracking-widest hover:bg-stone-800 transition-colors w-full mt-4">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    `;
    // Increase Cart Item
    let increase_btn = document.querySelectorAll(".increase_btn");
    increase_btn.forEach((btn) => {
        btn.addEventListener("click", () => {
            increaseQty(btn.id);
        });
    });
    // Decrease Cart Item
    let decrease_btn = document.querySelectorAll(".decrease_btn");
    decrease_btn.forEach((btn) => {
        btn.addEventListener("click", () => {
            decreaseQty(btn.id);
        });
    });

    // Remove Cart Item
    let remove_btn = document.querySelectorAll(".remove_btn");
    remove_btn.forEach((btn) => {
        btn.addEventListener("click", () => {
            removeItem(btn.id);
        });
    });
}
displayCart();

function increaseQty(id) {
    let items = localStorage.getItem("bohemian_cart");
    if (!items) return;
    let products = JSON.parse(items);

    let cart_product = products.map((p) => {
        if (p.id == id) {
            p.quantity += 1;
            p.total_price = Number(p.price) * p.quantity;
        }
        return p;
    });

    localStorage.setItem("bohemian_cart", JSON.stringify(cart_product));
    displayCart(); 
}

function decreaseQty(id) {
    let items = localStorage.getItem("bohemian_cart");
    if (!items) return;
    let products = JSON.parse(items);

    let cart_product = products.map((p) => {
        if (p.id == id) {
            if (p.quantity > 1) {
                p.quantity -= 1;
                let numericPrice = Number(p.price.toString().replace(/[^0-9.-]+/g, ""));
                p.total_price = numericPrice * p.quantity;
            }
        }
        return p;
    });

    localStorage.setItem("bohemian_cart", JSON.stringify(cart_product));
    displayCart(); 
}

function removeItem(id) {
    let ask = confirm("Are you sure you want to remove this item from your cart?");
    if (ask == true) {
        let items = localStorage.getItem("bohemian_cart");
        if (!items) return;
        let products = JSON.parse(items);

        let cart_product = products.filter((p) => p.id != id);

        localStorage.setItem("bohemian_cart", JSON.stringify(cart_product));
        displayCart(); 
    }
}
