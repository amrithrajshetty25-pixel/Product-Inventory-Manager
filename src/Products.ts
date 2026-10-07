export interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    tags?: string[];
}

export let products: Product[] = [
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

export function getAvailableProducts(products: Product[]): Product[] {
    return products.filter((product) => product.inStock === true);
}

export interface DiscountedProduct extends Product {
    discountPercent: number;
}

export function applyDiscountToProducts(
    products: Product[]
): DiscountedProduct[] {
    const discountPercent = 10;

    return products.map((product) => ({
        ...product,
        price: product.price - (product.price * discountPercent / 100),
        discountPercent
    }));
}
