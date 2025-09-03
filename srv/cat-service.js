const cds = require('@sap/cds');

class CatalogService extends cds.ApplicationService {

    init() {
        const { Books } = this.entities;

        this.after('READ', Books, this.grantDiscount);

        return super.init();
    }

    grantDiscount(results) {
        for (let book of results) {
            if (book.stock > 200) {
                book.title += ' -- 11% Discount!';
            }
        }
    }

}

module.exports = CatalogService