const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: String,
    inStock: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

productSchema.statics.findByIdentifier = async function (identifier) {
    let product = await this.findById(identifier);

    if (!product) {
        product = await this.findOne({ name: identifier });
    }

    return product;
}

const Product = mongoose.model('Product', productSchema);
module.exports = Product;