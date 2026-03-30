document.addEventListener("DOMContentLoaded", () => {
    let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
    let merchantData = JSON.parse(localStorage.getItem("merchant")) || { id: localStorage.getItem("merchant_id") };

    function loadProducts() {
        let totalProducts = document.getElementById("total_products");
        let table_data = document.getElementById("table_data");
        let merchant_id = merchantData?.id;
        // let category_id = category_id?.id

        if (!merchant_id) return;

        fetch(`${base_url}/products?merchant_id=${merchant_id}`)
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => {
                let products = Array.isArray(data) ? data : (data.data || []);
    
                
                // Update Total Count
                if (totalProducts) totalProducts.textContent = products.length;

                let view = products.map(product => `
                    <tr class="hover:bg-gray-50 transition-colors border-b border-gray-100 text-xs">
                        <td class="p-3 font-medium uppercase tracking-widest">${product.title}</td>
                        <td class="p-3 text-center">
                            <img src="${product.image}" class="h-12 w-12 object-cover mx-auto rounded shadow-sm" onerror="this.src='https://via.placeholder.com/150'"/>
                        </td>
                        <td class="p-3 font-semibold text-stone-800">₦${product.price}</td>
                        <td class="p-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">${product.category_id || 'Generic'}</td>
                    </tr>
                `).join('');

                if (table_data) table_data.innerHTML = view || '<tr><td colspan="4" class="p-10 text-center">No products.</td></tr>';
            })
            .catch(err => console.error("Product Fetch Error:", err));
    }

    function get_total_users() {
        let total_users_el = document.getElementById("total_users");
        if (!total_users_el) return;

        fetch(`${base_url}/users`)
            .then(response => response.json())
            .then(data => {
                let users = Array.isArray(data) ? data : (data.data || []);
                total_users_el.textContent = users.length;
            })
            .catch(err => console.error("User Fetch Error:", err));
    }
    function get_total_cart_products() {
        let total_cart_el = document.getElementById("bohemian_cart");
        if (!total_cart_el) return;

        let cartData = localStorage.getItem("bohemian_cart");
        
        if (!cartData) {
            total_cart_el.textContent = "0";
            return;
        }

        let products = JSON.parse(cartData);
        let totalQuantity = products.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
        
        total_cart_el.textContent = totalQuantity;
    }

    // --- Initial Execution ---
    loadProducts();
    get_total_users();
    get_total_cart_products();
});