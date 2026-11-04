const products = [
    {
        id: 1,
        title: "Keyboard",
        price: 3000,
        category: "Tech",
        description: "Mechanical keyboard"
    },
    {
        id: 2,
        title: "Mouse",
        price: 1050,
        category: "Tech",
        description: "Wireless mouse"
    },
    {
        id: 3,
        title: "The tale of the ladder",
        price: 1500,
        category: "Books",
        description: "authored by Christo Smirnenski"
    },
    {
        id: 4,
        title: "Le petit prince",
        price: 2000,
        category: "Books",
        description: "authored by Antoan de Saint-Exupery "
    }
];

const productsList = document.querySelector("#product-list");
const cartList = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const tooltip = document.querySelector("#tooltip");
const categoryButtons = document.querySelectorAll("[data-category]");
const productTemplate = document.querySelector("#product-template");
const shopError = document.querySelector("#shop-error");

const checkedItems = new Set();
let currentCategory = "All";

function validateProductInput() {
    const ids = new Set();

    for (const product of products) {
        if (
            product === null ||
            typeof product !== "object" ||
            !Number.isInteger(product.id) ||
            typeof product.title !== "string" ||
            !Number.isInteger(product.price) ||
            product.price < 0 ||
            typeof product.category !== "string" ||
            typeof product.description !== "string"
        ) {
            alert("Invalid product data");
        }

        if (ids.has(product.id)) {
            throw new Error("A product already exists with ID: " + product.id);
        }

        ids.add(product.id);
    }
}

function showError(error) {
    console.error(error);
    if (shopError !== null) {
        shopError.textContent = error.message;
    } else {
        alert(error.message);
    }
}

try {
    if (
        productsList === null ||
        cartList === null ||
        cartCount === null ||
        cartTotal === null ||
        tooltip === null ||
        productTemplate === null
    ) {
        throw new Error("Missing HTML element");
    }

    validateProductInput();

    showProducts();
    showCart();
    setupCategoryButtons();

} catch (error) {
    showError(error);
}

function setupCategoryButtons() {
    for (const button of categoryButtons) {
        button.addEventListener("click", () => {
            currentCategory = button.getAttribute("data-category");
            showProducts();
        });
    }
}

function showProducts() {
    productsList.replaceChildren();
    for (const obj of products) {
        if (obj.category === currentCategory || currentCategory === "All") {
            const content = productTemplate.content;
            const productRow = content.firstElementChild;

            const item = productRow.cloneNode(true);
            const label = item.querySelector("label");
            const checkbox = item.querySelector("input");
            const title = item.querySelector(".product-title");
            const price = item.querySelector(".product-price");

            title.textContent = obj.title;
            price.textContent = ` ${obj.price/100} eur`;

            checkbox.checked = checkedItems.has(obj.id);

            productsList.append(item);

            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    checkedItems.add(obj.id);
                } else {
                    checkedItems.delete(obj.id);
                }
                showCart();
            });
            label.addEventListener("mouseenter", function (event) {
                tooltip.textContent = obj.description;
                tooltip.style.display = "block";
                tooltip.style.left = event.clientX + 10 + "px";
                tooltip.style.top = event.clientY + 10 + "px";
            });

            label.addEventListener("mousemove", function (event) {
                tooltip.style.left = event.clientX + 10 + "px";
                tooltip.style.top = event.clientY + 10 + "px";
            });

            label.addEventListener("mouseleave", function () {
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
            const cartItem = document.createElement("li");
            cartItem.textContent = prod.title;
            cartList.append(cartItem)
            total += prod.price;
        }
    }
    cartCount.textContent = checkedItems.size;
    cartTotal.textContent = total / 100;
}