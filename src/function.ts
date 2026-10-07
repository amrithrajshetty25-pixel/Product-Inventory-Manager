export function calculateDiscount(
    price: number,
    discountPercent: number = 10
): number {
    return price - (price * discountPercent / 100);
}

export function applyBulkDiscount(
    prices: number[],
    discountRate: number
): number[] {
    return prices.map((price) =>
        price - (price * discountRate / 100)
    );
}

export function scopeExample(): void {
    for (let i = 0; i < 3; i++) {
        let message = `Inside loop: ${i}`;
        console.log(message);
    }

    // message cannot be accessed here because let has block scope.
}

console.log("Discounted Price:", calculateDiscount(1000));
console.log("Bulk Discount:", applyBulkDiscount([1000, 2000, 3000], 10));
scopeExample();
