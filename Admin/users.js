let base_url = "http://ecommerce.reworkstaging.name.ng/v2";
let merchantId = localStorage.getItem("merchant_id");

function getUsers() {
    let usersContainer = document.getElementById("users_container");
    let messageBox = document.getElementById("message");
    let content = "";

    fetch(`${base_url}/users?merchant_id=${merchantId}`)
        .then(res => res.json())
        .then(response => {
            console.log("Api raw response:", response);

            let usersList = Array.isArray(response) ? response : (response.data || []);

            if (usersList.length == 0) {
                usersContainer.innerHTML = `<tr><td colspan="4" class="p-10 text-center text-gray-400 italic">No users found.</td></tr>`;
                return;
            }

            usersList.forEach((user) => {
                content += `
                    <tr class="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                        <td class="px-6 py-5 text-[11px] font-medium text-gray-800 uppercase tracking-wider">
                            ${user.first_name}
                        </td>
                        <td class="px-6 py-5 text-[11px] font-medium text-gray-800 uppercase tracking-wider">
                            ${user.last_name}
                        </td>
                        <td class="px-6 py-5 text-[11px] font-mono text-gray-500">
                            ${user.phone || 'N/A'}
                        </td>
                        <td class="px-6 py-5 text-center">
                            <div class="flex justify-center gap-4">
                                <button onclick="deleteUser('${user.id}')" 
                                    class="text-[10px] font-bold text-red-300 hover:text-red-600 uppercase tracking-[0.2em] transition cursor-pointer">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
            usersContainer.innerHTML = content;

        }).catch((err) => {
            console.log("Fetch error:", err);
            if(messageBox) messageBox.innerText = "Could not connect to user database.";
        });
}

document.addEventListener("DOMContentLoaded", getUsers);

function deleteUser(id) {
    if(confirm("Permanently remove this user?")) {
        fetch(`${base_url}/users/${id}`, { method: 'DELETE' })
            .then(() => getUsers()); 
    }
}