const products = [
    {
        id: 1,
        title: "Keyboard",
        price: 30,
        category: "Tech",
        description: "Mechanical keyboard"
    },
    {
        id: 2,
        title: "Mouse",
        price: 10,
        category: "Tech",
        description: "Wireless mouse"
    },
    {
        id: 3,
        title: "The tale of the ladder",
        price: 12,
        category: "Books",
        description: "authored by Christo Smirnenski"
    },
    {
        id: 4,
        title: "Le petit prince",
        price: 3,
        category: "Books",
        description: "authored by Antoan de Saint-Exupery "
    },
];

const prodsList = document.querySelector("#prodlist1");
const cartList = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const tooltip = document.querySelector("#tooltip");

const checkedItems = new Set();

let currentCategory = "All";

function showProducts() {
    prodsList.replaceChildren();
    for (const obj of products) {
        if (obj.category === currentCategory || currentCategory === "All") {
            const item = document.createElement("li");
            const checkbox = document.createElement("input");
            const label = document.createElement("label");
            const price = document.createElement("span");

            price.textContent = ` ${obj.price} eur`;
            checkbox.type = "checkbox";
            checkbox.checked = checkedItems.has(obj.id);
            label.append(checkbox, " " + obj.title, price);
            item.append(label);
            prodsList.append(item);

            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    checkedItems.add(obj.id);
                } else {
                    checkedItems.delete(obj.id);
                }

                showCart();
            });
            item.addEventListener("mouseenter", function (event) {
                tooltip.textContent = obj.description;
                tooltip.style.display = "block";
                tooltip.style.left = event.clientX + 10 + "px";
                tooltip.style.top = event.clientY + 10 + "px";
            });

            item.addEventListener("mousemove", function (event) {
                tooltip.style.left = event.clientX + 10 + "px";
                tooltip.style.top = event.clientY + 10 + "px";
            });

            item.addEventListener("mouseleave", function () {
                tooltip.style.display = "none";
            });
        }
    }
}

function showCart() {
    cartList.replaceChildren();

    let total = 0;

    for (const prod of products) {
        if (checkedItems.has(prod.id)) {
            const cartItem = document.createElement('li');
            cartItem.textContent = prod.title;
            cartList.append(cartItem)
            total += prod.price;
        }
    }
    cartCount.textContent = checkedItems.size;
    cartTotal.textContent = total.toFixed(2);
}

document.querySelector('#all').addEventListener("click", function () {
    currentCategory = "All";
    showProducts();
});
document.querySelector('#tech').addEventListener("click", function () {
    currentCategory = "Tech";
    showProducts();
});
document.querySelector('#books').addEventListener("click", function () {
    currentCategory = "Books";
    showProducts();
});
showCart();
showProducts();
