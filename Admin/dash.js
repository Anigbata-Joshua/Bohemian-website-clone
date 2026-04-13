document.addEventListener("DOMContentLoaded", () => {
    let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
    let merchantData = JSON.parse(localStorage.getItem("merchant")) || { id: localStorage.getItem("merchant_id") };

    function loadProducts() {
        let totalProducts = document.getElementById("total_products");
        let table_data = document.getElementById("table_data");
        let merchant_id = merchantData?.id;


        if (!merchant_id) return;

        fetch(`${base_url}/products?merchant_id=${merchant_id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let productsAdded = data.data;

                totalProducts.innerHTML = productsAdded.length;

                let table_view = productsAdded.map(product => `
                    <tr class="hover:bg-gray-50 transition-colors border-b border-gray-100 text-xs">
                        <td class="p-3 font-medium uppercase tracking-widest">${product.title}</td>
                        <td class="p-3 text-center">
                            <img src="${product.image}" class="h-12 w-12 object-cover mx-auto rounded shadow-sm" />
                        </td>
                        <td class="p-3 font-semibold text-stone-800">₦${product.price}</td>
                        <td class="p-3 text-[10px] font-bold text-gray-700 uppercase tracking-widest">${product.category.name}</td>
                    </tr>
                `);

                if (table_data) table_data.innerHTML = table_view || '<tr><td colspan="4" class="p-10 text-center">No products.</td></tr>';
                console.log(data)
            })
            .catch(err => console.error("Product Fetch Error:", err));
    }

    function get_total_users() {
        let total_users = document.getElementById("total_users");
        if (!total_users) return;

        fetch(`${base_url}/users`)
            .then(response => response.json())
            .then(data => {

                total_users.innerHTML = data.length;
            })
            .catch(err => console.error("User Fetch Error:", err));
    }

    function get_total_cart_products() {
        let total_cart = document.getElementById("bohemian_cart");
        if (!total_cart) return;

        let cartData = localStorage.getItem("bohemian_cart");

        if (!cartData) {
            total_cart.textContent = "";
            return;
        }

        let products = JSON.parse(cartData);
        let totalQuantity = products.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);

        total_cart.textContent = totalQuantity;
    }

    loadProducts();
    get_total_users();
    get_total_cart_products();
});