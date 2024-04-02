export default class Apparel {
    code: string;
    sizes: { [size: string]: { quantity: number; price: number; name: string } };

    constructor(code: string, sizes: string[] | { [size: string]: { quantity: number; price: number; name: string } }) {
        this.code = code;
        this.sizes = {};
        if (Array.isArray(sizes)) {
            sizes.forEach(size => {
                this.sizes[size] = { quantity: 0, price: 0, name: "" };
            });
        }
        else this.sizes = sizes;
        // if(sizes instanceof Object) {
        //     Object.entries(sizes).forEach(([key, value])=>{
        //         this.sizes[key] = value as { quantity: number; price: number; name: string }  ;
        //         switch (key) {
        //             case "name":
        //                 this.sizes[code].name = value.toString();
        //                 break;
        //             case "quantity":
        //                 this.sizes[code].quantity = value as number;
        //                 break;
        //             case "price":
        //                 this.sizes[code].price = value as number;
        //                 break;
                
        //             default:
        //                 break;
        //         }
        //     });
        // }
    }

    updateStockAndPrice(size: string, quantity: number, price: number, name: string): Apparel {
        if (this.sizes.hasOwnProperty(size)) {
            const updatedSizes = { ...this.sizes, [size]: { quantity, price, name } };
            return new Apparel(this.code, Object.keys(updatedSizes)).withSizes(updatedSizes);
        } else {
            return this;
        }
    }

    private withSizes(sizes: { [size: string]: { quantity: number; price: number; name: string } }): Apparel {
        const apparel = new Apparel(this.code, Object.keys(sizes));
        for (const size in sizes) {
            apparel.sizes[size] = { ...sizes[size] };
        }
        return apparel;
    }

    fulfillOrder(order: { code: string; size: string; quantity: number }[]): number {
        let totalCost = 0;
        for (const { code, size, quantity } of order) {
            if (code === this.code && this.sizes.hasOwnProperty(size) && this.sizes[size].quantity >= quantity) {
                totalCost += quantity * this.sizes[size].price;
            } else {
                return Infinity; // Order cannot be fulfilled
            }
        }
        return totalCost;
    }
}