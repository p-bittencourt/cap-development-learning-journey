const cds = require('@sap/cds');

class CatalogService extends cds.ApplicationService {

    init() {
        const { Books } = this.entities;

        // Grants discount to overstocked books
        this.after('READ', Books, this.grantDiscount);

        // Places an order and adjusts the stock
        this.on('submitOrder', this.reduceStock);

        return super.init();
    }

    grantDiscount(results) {
        for (let book of results) {
            if (book.stock > 200) {
                book.title += ' -- 11% Discount!';
            }
        }
    }

    reduceStock(req) {
        const { Books } = this.entities;
        const { book, quantity } = req.data;

        if (quantity < 1) {
            return req.error(400, 'Quantity must be at least 1.');
        }

        let stock = 10;
        return stock;
    }

    /**
     * We could have implemented the submitOrder function as a conventional JS method.
     * In this case, the name would have to match the name of the definition on the .cds file
     * 
     * submitOrder(book, quantity) {
				const { Books } = this.entities;
				if (quantity < 1) {
				  return req.error('The quantity must be at least 1.');
				}

				let stock = 10;
				return { stock };
		}
     */

}

module.exports = CatalogService