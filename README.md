# Apparel Inventory Management API

This API manages the inventory of apparels for vendors and processes orders from users.

## API Definition

### Vendor Stock Endpoints

1. **Add Stock**
   - Endpoint: `POST /vendor/stock`
   - Description: Adds new apparel stock to the vendor's inventory.
   - Request Body:
     - `code`: string (unique identifier for the apparel)
     - `sizes`: array of objects containing `size` (string) and `quantity` (number) properties
   - Response:
     - Status Code: 200 if successful, 400 if the apparel with the same code already exists

2. **Update Stock and Price**
   - Endpoint: `PUT /vendor/stock`
   - Description: Updates the stock and price of a specific apparel item.
   - Request Body:
     - `code`: string (identifier for the apparel to update)
     - `size`: string (size of the apparel to update)
     - `quantity`: number (updated quantity of the apparel)
     - `price`: number (updated price of the apparel)
     - `name`: string (optional, updated name of the apparel)
   - Response:
     - Status Code: 200 if successful, 500 if the apparel is not found

3. **Bulk Update Stocks**
   - Endpoint: `PUT /vendor/stocks`
   - Description: Bulk update operation for multiple apparel items.
   - Request Body:
     - Array of objects with properties:
       - `code`: string (identifier for the apparel to update)
       - `size`: string (size of the apparel to update)
       - `quantity`: number (updated quantity of the apparel)
       - `price`: number (updated price of the apparel)
       - `name`: string (optional, updated name of the apparel)
   - Response:
     - Status Code: 200 if successful

### User Endpoints

1. **Place Order**
   - Endpoint: `POST /user/order`
   - Description: Processes user orders by finding the vendor with the lowest cost for fulfilling the order.
   - Request Body:
     - Array of objects with properties:
       - `code`: string (identifier for the apparel to order)
       - `size`: string (size of the apparel to order)
       - `quantity`: number (quantity of the apparel to order)
   - Response:
     - Status Code: 200 if successful, 404 if the order cannot be fulfilled
     - Response Body: String indicating the lowest cost for order fulfillment

## How to Test

1. **Add Stock Endpoint**: Send a POST request to `/vendor/stock` with appropriate JSON data in the request body. Verify the response status code and message.

2. **Update Stock and Price Endpoint**: Send a PUT request to `/vendor/stock` with the apparel code and updated data in the request body. Verify the response status code.

3. **Bulk Update Stocks Endpoint**: Send a PUT request to `/vendor/stocks` with an array of updates in the request body. Verify the response status code.

4. **Place Order Endpoint**: Send a POST request to `/user/order` with the order details in the request body. Verify the response status code and message.

Ensure to include necessary headers such as `Content-Type: application/json` in your requests. Use tools like Postman, cURL, or write scripts using libraries like Axios or fetch for testing. 

For more details, Please import the `Freshprints.postman_collection.json` file into Postman and refer to the collection