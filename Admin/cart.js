// 1. Selectors
const cartBody = document.getElementById("cart_items_body");
const cartTotal = document.getElementById("cart_total");

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("bohemian_cart")) || [];

    if (!cartBody) return; // Safety check

    if (cart.length === 0) {
        cartBody.innerHTML = `
            <tr>
                <td colspan="4" class="py-20 text-center text-gray-400 uppercase tracking-widest text-[10px]">
                    Your selection is empty
                </td>
            </tr>`;
        if (cartTotal) cartTotal.innerText = "₦0";
        return;
    }

    let html = "";
    let grandTotal = 0;

    cart.forEach((item) => {
        // Clean price for math
        const numericPrice = Number(item.price.toString().replace(/[^0-9.-]+/g, ""));
        const subtotal = numericPrice * item.quantity;
        grandTotal += subtotal;

        html += `
            <tr class="group hover:bg-gray-50/50 transition-colors border-b border-gray-100">
                <td class="px-6 py-6">
                    <div class="flex items-center gap-4">
                        <img src="${item.image}" class="w-16 h-20 object-cover rounded-lg shadow-sm">
                        <div>
                            <p class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Bohemian Traders</p>
                            <h4 class="text-sm font-semibold text-gray-800">${item.title}</h4>
                            <p class="text-xs text-gray-400 mt-1">${item.price}</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-6 text-center">
                    <div class="flex items-center justify-center gap-3 bg-gray-100 w-max mx-auto rounded-lg p-1">
                        <button class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition decrease_btn" id="${item.id}">-</button>
                        <span class="text-sm font-bold w-4 text-center">${item.quantity}</span>
                        <button class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition increase_btn" id="${item.id}">+</button>
                    </div>
                </td>
                <td class="px-6 py-6 text-right font-semibold text-gray-900">
                    ₦${subtotal.toLocaleString()}
                </td>
                <td class="px-6 py-6 text-center">
                    <button class="p-2 text-gray-300 hover:text-red-500 transition remove_btn" id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    });

    cartBody.innerHTML = html;
    if (cartTotal) cartTotal.innerText = `₦${grandTotal.toLocaleString()}`;

    // CRITICAL: Re-attach listeners every time the table is drawn
    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll(".increase_btn").forEach(btn => {
        btn.onclick = () => updateQty(btn.id, 1);
    });
    document.querySelectorAll(".decrease_btn").forEach(btn => {
        btn.onclick = () => updateQty(btn.id, -1);
    });
    document.querySelectorAll(".remove_btn").forEach(btn => {
        btn.onclick = () => removeItem(btn.id);
    });
}

// Combined Increase/Decrease for cleaner code
function updateQty(id, change) {
    let cart = JSON.parse(localStorage.getItem("bohemian_cart")) || [];
    let updatedCart = cart.map(p => {
        if (p.id == id) {
            const newQty = p.quantity + change;
            if (newQty > 0) p.quantity = newQty;
        }
        return p;
    });
    localStorage.setItem("bohemian_cart", JSON.stringify(updatedCart));
    renderCart();
}

function removeItem(id) {
    if (confirm("Remove this item?")) {
        let cart = JSON.parse(localStorage.getItem("bohemian_cart")) || [];
        let updatedCart = cart.filter(p => p.id != id);
        localStorage.setItem("bohemian_cart", JSON.stringify(updatedCart));
        renderCart();
    }
}

// Initial Run
renderCart();