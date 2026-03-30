const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("product_id");
const product_container = document.getElementById("product_container");
const base_url = "http://ecommerce.reworkstaging.name.ng/v2";

function getProduct() {
    if (!productId) return;

    fetch(`${base_url}/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            // We use data.descp for the image URL from your JSON
            let imagePath = data.images || "https://via.placeholder.com/800x1000";

            // YOUR EXACT CODE - NO DIVS CHANGED
            let content = `
        <div class="grid grid-cols-2 gap-20 ">

            <!-- LEFT: IMAGES -->
            <div class="grid grid-cols-2 gap-1">
                <img src="${imagePath}" class="w-full h-full object-cover">
                <img src="${imagePath}" class="w-full h-full object-cover">
            </div>

            <!-- RIGHT: PRODUCT TEXT -->
            <div class="text space-y-4 pr-10">
                <h1 class="text-2xl font-semibold tracking-wide font-thin text-black">${data.title}</h1>
                <p class="text-gray-500 text-sm tracking-widest uppercase">BOHEMIAN TRADERS</p>
                <p class="text-sm font-semibold">₦${data.price}</p>

                <div class="flex items-center gap-2 text-[12px]">
                    <span class="text-black">★★★★★</span>
                    <span class="text-gray-400">(No rating yet)</span>
                </div>
                <button class="px-2 text-[10px] py-2 text-white bg-black uppercase">
                    <a href="">Write a rating</a>
                </button>


                <div class="flex justify-between items-center text-[12px] uppercase tracking-tighter">
                    <p>Size:</p>
                    <span><a href="#" class="underline text-[#b5894f] text-[11px]">Size guide</a></span>
                </div>

                <div class="flex gap-2">
                    <button
                        class="border border-gray-300 w-10 h-10 flex items-center justify-center hover:bg-black cursor-pointer hover:text-white transition-colors">0</button>
                    <button
                        class="border border-gray-300 w-10 h-10 flex items-center justify-center hover:bg-black cursor-pointer hover:text-white transition-colors">1</button>
                    <button
                        class="border border-gray-300 w-10 h-10 flex items-center justify-center hover:bg-black cursor-pointer hover:text-white transition-colors">2</button>
                </div>

                <div class="pt-4">
                    <button
                        class="w-full bg-black text-white py-4 uppercase font-bold tracking-widest cursor-pointer"><a
                            href="#" id="addToCartBtn"> Add to cart

                        </a>
                    </button>
                    <div class="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm  z-50 hidden modal">

                        <!-- Modal -->
                        <div class="bg-white w-[90%] max-w-7xl rounded-md shadow-lg relative p-6">

                            <!-- Close Button -->
                            <button class="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer text-xl"><a href="./bohemaintraders.html">✕</a>
                                
                            </button>

                            <!-- Header -->
                            <h2 class="text-center text-xl tracking-wide text-gray-600 mb-6">
                                OK, 1 ITEM WAS ADDED TO YOUR CART. WHAT'S NEXT?
                            </h2>

                            <!-- Content -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

                                <!-- Image -->
                                <div>
                                    <img src="${imagePath}" class="w-full h-full object-cover" />
                                </div>

                                <!-- Product Info -->
                                <div class="space-y-2">
                                    <h3 class="text-3xl font-semibold uppercase">
                                        ${data.title}
                                    </h3>
                                    <p class="text-sm text-gray-500 uppercase tracking-wide">
                                        Bohemian Traders
                                    </p>
                                    <p class="text-sm text-gray-600">
                                        1 × ₦${data.price}
                                    </p>
                                </div>

                                <!-- Actions -->
                                <div class="space-y-4 max-w-3xl">

                                    <button
                                        class="w-full bg-black text-white py-3 text-2xl uppercase tracking-wide hover:bg-gray-800"><a href="#"> Proceed to Checkout</a>
                                       
                                    </button>

                                    <div class="text-sm text-gray-600">
                                        <p>Order subtotal</p>
                                        <p class="text-lg font-bold">₦${data.price}</p>
                                        <p class="text-xs mt-1">Your cart contains 1 item</p>
                                    </div>

                                    <button
                                        class="w-full border border-black py-3 text-sm uppercase hover:bg-black hover:text-white"><a href="./shop.html">Continue Shopping</a>
                                        
                                    </button>

                                    <button class="w-full text-xl text-gray-500 underline"><a href="./addto_cart.html">View or edit your cart</a>
                                        
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <select class="w-full border border-gray-300 p-3 text-sm bg-white uppercase">
                        <option value="" class="text-gray-600 hover:bg-gray-300 text-center">Add to wish list</option>
                        <option value="" class="text-gray-600 hover:bg-gray-300 text-right">View wish list</option>
                        <option value="" class="text-gray-600 hover:bg-gray-300 text-right">Create new wish list
                        </option>

                    </select>
                </div>


            </div>

        </div>
        
        <div class="mt-16 w-[60%] mb-16">

            <div class="flex gap-10 border-b pb-3 text-sm tracking-wider">
                <button
                    class="cursor-pointer hover:underline text-gray-500 hover:text-black active-underline text-[10px]"
                    id="product_detail">PRODUCT
                    DETAILS</button>
                <button
                    class="cursor-pointer hover:underline text-gray-500 hover:text-black active-underline text-[10px]"
                    id="product_feature">PRODUCT
                    FEATURES</button>
                <button class="cursor-pointer text-gray-500 hover:text-black active-underline text-[10px]"
                    id="product_sizing">PRODUCT
                    SIZING</button>
            </div>

      
            <div class="mt-6 max-w-3xl text-gray-600 text-[12px] font-medium leading-relaxed product_detail hidden">
                <p>
                    A playful take on effortless dressing, the Rugby Jersey Dress blends bold colour-blocking with a
                    relaxed, easy-wear silhouette. Designed in a soft interlock fabric with comfortable stretch, it
                    drapes beautifully on the body while maintaining a loose, flattering fit.</p>
                <br>
                <p>
                    Featuring a statement contrast collar with a button placket, grown-on short sleeves, and subtle
                    side splits, this piece is all about movement and ease. Finished with the Bohemian Traders
                    embroidered logo on the chest, it's your ultimate throw-on-and-go style—perfect for days when
                    comfort meets impact.
                </p>
                <br>
                <p> Style tip: wear true to size for its intended relaxed look, or belt it for a more defined shape.

                </p>
            </div>

            <div class="product_feature mt-6 max-w-3xl text-gray-600 text-[12px] font-medium leading-relaxed hidden">
                <p> - Intended for a loose fit</p>
                <br>

                <p> - Midi length</p>
                <br>

                <p> - Classic large contrast collar with button placket</p>
                <br>

                <p> - Grown on short sleeves</p>
                <br>

                <p> - Side split</p>
                <br>

                <p> - Bohemian Traders embroidered logo on the chest</p>
                <br>

                <p> - Easy thrown on</p>
                <br>

                <p> - Soft spliced interlock fabric</p>
                <br>

                <p> - 60% Rayon 35% Nylon 5% Spandex</p>
                <br>

                <p> - Mid-weight, stretchy fabric</p>
                <br>

                <p> - Cold hand wash</p>
                <br>
            </div>

            <div class="product_sizing mt-6 max-w-3xl text-gray-600 text-[12px] font-medium leading-relaxed hidden">
                <h1>MODEL SIZING</h1>
                <br>

                <p> - Charlotte's height is 175cm, 76cm bust, 59cm waist, 86cm hip, size 6/8 and wears a size 0</p>
                <br>

                <p> - Mariangel's height is 178cm, 81cm bust, 69cm waist, 92cm hip, size 8 and wears a size 0</p>
                <br>

                <p>- Mahalia height is 173cm, size 16/18 and wears a size 1</p>
                <br>
                <img src="./image/BT-DRE00618.webp" alt="">

                <div>
                </div>
            </div>
        </div>

        
            `;

            // Inject content
            product_container.innerHTML = content;

            let actionBtn = document.getElementById("addToCartBtn");

            actionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                saveToLocalStorage(data, imagePath);

                let myModal = document.querySelector(".modal")
                myModal.classList.remove("hidden")
            });

            let btnDetail = document.getElementById("product_detail");
            let btnFeature = document.getElementById("product_feature");
            let btnSizing = document.getElementById("product_sizing");

            let sectionDetail = document.querySelector(".product_detail");
            let sectionSizing = document.querySelector(".product_sizing");
            let sectionFeature = document.querySelector(".product_feature");

            btnFeature.addEventListener('click', (e) => {
                e.preventDefault();

                sectionFeature.classList.remove("hidden");
                sectionDetail.classList.add("hidden");
                sectionSizing.classList.add("hidden");
            })

            btnSizing.addEventListener('click', (e) => {
                e.preventDefault();

                sectionSizing.classList.remove("hidden");
                sectionFeature.classList.add("hidden");
                sectionDetail.classList.add("hidden");
            })
            btnDetail.addEventListener('click', (e) => {
                e.preventDefault();

                sectionDetail.classList.remove("hidden");
                sectionSizing.classList.add("hidden");
                sectionFeature.classList.add("hidden");
            })

            sectionDetail.classList.remove("hidden");
        })
        .catch(err => console.error("Fetch Error:", err));
}
getProduct();

function saveToLocalStorage(product, image) {
    let cart = JSON.parse(localStorage.getItem("bohemian_cart")) || [];

    const itemIndex = cart.findIndex(item => item.id == product.id);

    if (itemIndex !== -1) {
        let response = confirm("This item is already in your cart. Would you like to increase the quantity?");

        if (response) {
            cart[itemIndex].quantity += 1;
            alert("Quantity updated!");
        } else {

            return;
        }
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: image,
            quantity: 1
        });
        alert("Product added to cart!");
    }

    // 4. Always save the final state of the cart
    localStorage.setItem("bohemian_cart", JSON.stringify(cart));
}
