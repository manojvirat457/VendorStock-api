import fs from 'fs';
import Apparel from '../repository/apparel';


const JSON_FILE = 'vendor_stock.json';
let vendorStock: { [code: string]: Apparel } = {};

function loadVendorStock() {
    try {
        const data = fs.readFileSync(JSON_FILE, 'utf8');
        const jsonData = JSON.parse(data);

        for (const code in jsonData) {
            const { code: apparelCode, sizes } = jsonData[code];

            vendorStock[apparelCode] = new Apparel(apparelCode, sizes);
        }
    } catch (err) {
        console.error('Error loading vendor stock:', err);
    }
}

function saveVendorStock() {
    try {
        fs.writeFileSync(JSON_FILE, JSON.stringify(vendorStock), 'utf8');
        console.log('Vendor stock saved to file');
    } catch (err) {
        console.error('Error saving vendor stock:', err);
    }
}

export {
    vendorStock,
    loadVendorStock,
    saveVendorStock
}
