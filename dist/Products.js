export let products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        inStock: true,
        tags: ["Electronics", "Computer"]
    },
    {
        id: 2,
        name: "Wireless Mouse",
        price: 1200,
        inStock: true,
        tags: ["Electronics", "Accessories"]
    },
    {
        id: 3,
        name: "Keyboard",
        price: 1500,
        inStock: false,
        tags: ["Electronics", "Accessories"]
    },
    {
        id: 4,
        name: "Monitor",
        price: 12000,
        inStock: true,
        tags: ["Electronics", "Display"]
    }
];
export function getAvailableProducts(products) {
    return products.filter((product) => product.inStock === true);
}
export function applyDiscountToProducts(products) {
    const discountPercent = 10;
    return products.map((product) => ({
        ...product,
        price: product.price - (product.price * discountPercent / 100),
        discountPercent
    }));
}
