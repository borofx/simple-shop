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

const checkedItems = new Set();

for (const obj of products) {
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const price = document.createElement("span");

    price.textContent = ` ${obj.price} eur.`;
    checkbox.type = "checkbox";
    label.append(checkbox, obj.title);
    item.append(label, price);
    prodsList.append(item);

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            checkedItems.add(obj.id);
        } else {
            checkedItems.delete(obj.id);
        }

        showCart();
    });
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

showCart();
