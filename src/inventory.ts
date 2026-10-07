import { products, Product } from "./Products.js";

const productForm = document.getElementById("productForm") as HTMLFormElement;
const productIdInput = document.getElementById("productId") as HTMLInputElement;
const productNameInput = document.getElementById("productName") as HTMLInputElement;
const priceInput = document.getElementById("price") as HTMLInputElement;
const tagsInput = document.getElementById("tags") as HTMLInputElement;
const inStockInput = document.getElementById("inStock") as HTMLInputElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const showAllButton = document.getElementById("showAll") as HTMLButtonElement;
const availableOnlyButton = document.getElementById("availableOnly") as HTMLButtonElement;
const discountInput = document.getElementById("discountPercent") as HTMLInputElement;
const applyDiscountButton = document.getElementById("applyDiscount") as HTMLButtonElement;
const inventoryBody = document.getElementById("inventoryBody") as HTMLTableSectionElement;
const productCount = document.getElementById("productCount") as HTMLElement;

let currentDiscount = 0;

function renderProducts(list: Product[] = products): void {
    inventoryBody.innerHTML = "";

    list.forEach((product) => {
        const row = document.createElement("tr");
        const discountedPrice =
            currentDiscount > 0
                ? product.price - (product.price * currentDiscount / 100)
                : product.price;

        row.innerHTML = `
            <td>${product.id}</td>
            <td><strong>${product.name}</strong></td>
            <td>₹${product.price.toFixed(2)}</td>
            <td>
                <span class="${product.inStock ? "status in-stock" : "status out-stock"}">
                    ${product.inStock ? "In Stock" : "Out of Stock"}
                </span>
            </td>
            <td>${product.tags?.length ? product.tags.join(", ") : "—"}</td>
            <td>₹${discountedPrice.toFixed(2)}</td>
            <td>
                <button class="remove-btn" data-id="${product.id}">
                    Remove
                </button>
            </td>
        `;

        inventoryBody.appendChild(row);
    });

    productCount.textContent = `Products Shown: ${list.length}`;
}

function getFilteredProducts(): Product[] {
    const text = searchInput.value.trim().toLowerCase();

    if (!text) {
        return products;
    }

   return products.filter((product) =>
    product.name.toLowerCase().includes(text) ||
    (product.tags?.some((tag) =>
        tag.toLowerCase().includes(text)
    ) ?? false)
);
}

productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = productNameInput.value.trim();
    const price = Number(priceInput.value);
    const tags = tagsInput.value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    const inStock = inStockInput.checked;

    if (!name || price <= 0) {
        alert("Please enter a valid product name and price.");
        return;
    }

    const newProduct: Product = {
        id: Number(productIdInput.value),
        name,
        price,
        inStock,
        tags
    };

    products.push(newProduct);
    productForm.reset();
    renderProducts(getFilteredProducts());
});

searchInput.addEventListener("input", () => {
    renderProducts(getFilteredProducts());
});

showAllButton.addEventListener("click", () => {
    searchInput.value = "";
    renderProducts(products);
});

availableOnlyButton.addEventListener("click", () => {
    searchInput.value = "";
    renderProducts(products.filter((product) => product.inStock));
});

applyDiscountButton.addEventListener("click", () => {
    const value = Number(discountInput.value);

    if (value < 0 || value > 100 || Number.isNaN(value)) {
        alert("Enter a discount between 0 and 100.");
        return;
    }

    currentDiscount = value;
    renderProducts(getFilteredProducts());
});

inventoryBody.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (!target.classList.contains("remove-btn")) {
        return;
    }

    const id = Number(target.dataset.id);

    if (confirm("Are you sure you want to remove this product?")) {
        const index = products.findIndex((product) => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
        }

        renderProducts(getFilteredProducts());
    }
});

renderProducts();
