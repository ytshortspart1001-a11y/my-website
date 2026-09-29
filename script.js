/* =========================
   WELCOME SCREEN
========================= */

window.addEventListener("load", function () {

    setTimeout(function () {

        const welcome = document.getElementById("welcomeScreen");

        welcome.style.opacity = "0";

        welcome.style.transition = "opacity 0.7s ease";

        setTimeout(function () {
            welcome.style.display = "none";
        }, 700);

    }, 2800);

});


/* =========================
   CART
========================= */

let cart = [];


/* ADD ITEM */

function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " cart mein add ho gaya! ☕");

}


/* UPDATE CART */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    let totalItems = 0;
    let totalPrice = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    cartCount.innerText = totalItems;

    cartTotal.innerText = totalPrice;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty ☕</p>";

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>
                <strong>${item.name}</strong>
                <br>
                ₹${item.price} × ${item.quantity}
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>

        `;

        cartItems.appendChild(div);

    });

}


/* REMOVE ITEM */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document.getElementById("cartModal")
        .style.display = "block";

    updateCart();

}


/* CLOSE CART */

function closeCart() {

    document.getElementById("cartModal")
        .style.display = "none";

}


/* =========================
   CHECKOUT
========================= */

function openCheckout() {

    if (cart.length === 0) {

        alert("Please cart mein item add karein.");

        return;
    }

    closeCart();

    document.getElementById("checkoutModal")
        .style.display = "block";

}


function closeCheckout() {

    document.getElementById("checkoutModal")
        .style.display = "none";

}


/* PLACE ORDER */

function placeOrder() {

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    if (name === "" ||
        phone === "" ||
        address === "") {

        alert("Please saari details fill karein.");

        return;
    }


    let orderText =
        "NEW ORDER - Momujhwe Coffee Shop\n\n";


    orderText +=
        "Customer: " + name + "\n";

    orderText +=
        "Phone: " + phone + "\n";

    orderText +=
        "Address: " + address + "\n";

    orderText +=
        "Payment: " + payment + "\n\n";


    orderText += "Items:\n";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        orderText +=
            item.name +
            " x " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "\n";

    });


    orderText +=
        "\nTotal: ₹" + total;


    /*
       WhatsApp order

       IMPORTANT:
       Yahan shop owner ka WhatsApp number
       919856321254 use kiya gaya hai.
    */

    const whatsappNumber =
        "919856321254";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(orderText);


    alert(
        "Order ready hai! WhatsApp open ho raha hai."
    );


    window.open(
        whatsappURL,
        "_blank"
    );


    cart = [];

    updateCart();

    closeCheckout();

}


/* =========================
   TABLE BOOKING
========================= */

function openBooking() {

    document.getElementById("bookingModal")
        .style.display = "block";

}


function closeBooking() {

    document.getElementById("bookingModal")
        .style.display = "none";

}


function bookTable() {

    const name =
        document.getElementById("bookingName")
            .value.trim();

    const phone =
        document.getElementById("bookingPhone")
            .value.trim();

    const date =
        document.getElementById("bookingDate")
            .value;

    const time =
        document.getElementById("bookingTime")
            .value;

    const guests =
        document.getElementById("guestNumber")
            .value;


    if (
        name === "" ||
        phone === "" ||
        date === "" ||
        time === "" ||
        guests === ""
    ) {

        alert(
            "Please booking ki saari details fill karein."
        );

        return;
    }


    let bookingText =
        "TABLE BOOKING - Momujhwe Coffee Shop\n\n";


    bookingText +=
        "Name: " + name + "\n";

    bookingText +=
        "Phone: " + phone + "\n";

    bookingText +=
        "Date: " + date + "\n";

    bookingText +=
        "Time: " + time + "\n";

    bookingText +=
        "Guests: " + guests;


    const whatsappNumber =
        "919856321254";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(bookingText);


    alert(
        "Table booking request WhatsApp par bheji ja rahi hai."
    );


    window.open(
        whatsappURL,
        "_blank"
    );


    closeBooking();

}


/* =========================
   MENU FILTER
========================= */

function filterMenu(category, button) {

    const items =
        document.querySelectorAll(".food-card");


    const buttons =
        document.querySelectorAll(".category");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    items.forEach(item => {

        const itemCategory =
            item.getAttribute("data-category");


        if (
            category === "all" ||
            itemCategory === category
        ) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}


/* =========================
   SCROLL TO MENU
========================= */

function scrollToMenu() {

    document.getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   CLOSE MODAL WHEN CLICK
   OUTSIDE BOX
========================= */

window.addEventListener("click", function (event) {

    const cartModal =
        document.getElementById("cartModal");

    const checkoutModal =
        document.getElementById("checkoutModal");

    const bookingModal =
        document.getElementById("bookingModal");


    if (event.target === cartModal) {

        closeCart();

    }


    if (event.target === checkoutModal) {

        closeCheckout();

    }


    if (event.target === bookingModal) {

        closeBooking();

    }

});