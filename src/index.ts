import express, { Request, Response } from 'express';
import { loadVendorStock, vendorStock, saveVendorStock } from './database';
import {addStockSchema, updateStockAndPriceSchema} from './utilities/validations'
import { validateSchema } from './middlewares/validation';
import Apparel from './repository/apparel';

const app = express();
app.use(express.json());

app.post('/vendor/stock', validateSchema(addStockSchema), (req: Request, res: Response) => {
    const { code, sizes } = req.body;
    if (!vendorStock.hasOwnProperty(code)) {
        vendorStock[code] = new Apparel(code, sizes);
        saveVendorStock(); 
        res.sendStatus(200);
    } else {
        res.status(400).send('Apparel with the same code already exists');
    }
});

app.put('/vendor/stock', validateSchema(updateStockAndPriceSchema), (req: Request, res: Response) => {
    const { code, size, quantity, price, name } = req.body;
    if (vendorStock.hasOwnProperty(code)) {
        vendorStock[code] = vendorStock[code].updateStockAndPrice(size, quantity, price, name);
        saveVendorStock(); 
        res.sendStatus(200);
    } else {
        res.status(500).send('Apparel not found');
    }
});

app.put('/vendor/stocks', (req: Request, res: Response) => {
    const updates: { code: string; size: string; quantity: number; price: number; name: string }[] = req.body;
    updates.forEach(update => {
        const { code, size, quantity, price, name } = update;
        if (vendorStock.hasOwnProperty(code)) {
            vendorStock[code] = vendorStock[code].updateStockAndPrice(size, quantity, price, name);
        }
    });
    saveVendorStock();
    res.sendStatus(200);
});

// User endpoints
app.post('/user/order', (req: Request, res: Response) => {
    const order: { code: string; size: string; quantity: number }[] = req.body;
    let lowestCost = Infinity;
    for (const code in vendorStock) {
        const cost = vendorStock[code].fulfillOrder(order);
        lowestCost = Math.min(lowestCost, cost);
    }
    if (lowestCost === Infinity) {
        res.status(404).send('Order cannot be fulfilled');
    } else {
        res.send(`Lowest cost for order fulfillment: ${lowestCost}`);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    loadVendorStock();
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
    saveVendorStock();
    process.exit(0);
});