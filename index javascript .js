```javascript
// ===============================
// MENU MOBILE
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Tutup menu setelah link diklik
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});


// ===============================
// FILTER PRODUK
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        products.forEach(product => {
            if (
                category === "all" ||
                product.dataset.category === category
            ) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
});


// ===============================
// KERANJANG BELANJA
// ===============================

let cart = [];

const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");


// Buka keranjang
openCart.addEventListener("click", () => {
    cartPanel.classList.add("open");
    cartOverlay.classList.add("show");
});


// Tutup keranjang
function closeCartPanel() {
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("show");
}

closeCart.addEventListener("click", closeCartPanel);
cartOverlay.addEventListener("click", closeCartPanel);


// Format Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}


// Tambahkan produk ke keranjang
document.querySelectorAll(".cart-btn").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            item => item.name === name
        );

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        cartPanel.classList.add("open");
        cartOverlay.classList.add("show");
    });
});


// Update keranjang
function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Keranjang masih kosong.
            </p>
        `;

    } else {

        cart.forEach((item, index) => {

            const cartItem = document.createElement("div");

            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <br>
                    <small>
                        ${item.quantity} × ${formatRupiah(item.price)}
                    </small>
                </div>

                <button onclick="removeItem(${index})">
                    Hapus
                </button>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    // Hitung total
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Hitung jumlah barang
    const count = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartTotal.textContent = formatRupiah(total);
    cartCount.textContent = count;
}


// Hapus produk
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// ===============================
// CHECKOUT
// ===============================

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Keranjang masih kosong. Silakan pilih produk terlebih dahulu.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Terima kasih telah berbelanja di FASHIONISTA!\\n\\n" +
        "Total pembayaran: " + formatRupiah(total)
    );

    cart = [];

    updateCart();

    closeCartPanel();
});


// Inisialisasi
updateCart();
```


