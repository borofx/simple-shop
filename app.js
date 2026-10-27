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
    }
];

for (const obj of products) {
    console.log(obj.title, obj.price);
}

const prodsList = document.querySelector("#prodlist1");
// const item = document.createElement("li");
// item.textContent = "Keyboard";
// prodsList.append(item);

for (const obj of products) {
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    checkbox.type = "checkbox";
    item.textContent = `${obj.title} - ${obj.price} eur.`;  
    label.append(checkbox, item);
    prodsList.append(item);
}