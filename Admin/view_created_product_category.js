let table_category_container = document.getElementById("table_category_container");
let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantId = localStorage.getItem("merchant_id");

function ViewCategory() {
    fetch(`${base_url}/categories?merchant_id=${merchantId}`)
        .then((res) => res.json())
        .then((data) => {
            let content = "";

            if (!data || data.length === 0) {
                table_category_container.innerHTML = `<tr><td colspan="2" class="px-6 py-4 text-center text-gray-400">No categories found.</td></tr>`;
                return;
            }

            data.forEach((category) => {
                content += `
                <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td class="px-6 py-4 text-gray-700 font-medium">${category.name}</td>
                    <td class="px-6 py-4 text-center">
                        <button onclick="deleteCategory('${category.id || category._id}')" 
                                class="text-rose-500 text-[10px] font-bold tracking-widest uppercase cursor-pointer hover:underline">
                            Delete
                        </button>
                    </td>
                </tr>
                `;
            });
            table_category_container.innerHTML = content;
        })
        .catch((err) => {
            console.log(err);
        });
}

function deleteCategory(id) {
    let ask = confirm("Are you sure you want to delete this category?");
    if (ask == true) {
        fetch(`${base_url}/categories/${id}`, {
            method: "DELETE"
        }).then((res) => {
            return res.json();

        }).then(() => {
            alert("Deleted")
            ViewCategory();

        }).catch((err) => {
            console.log(err)
        })
    }

}

ViewCategory();
