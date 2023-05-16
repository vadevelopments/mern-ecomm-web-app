const mongoose = require('mongoose');
const User = require('./User');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        countInStock: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review',
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                name: {
                    type: String,
                    default: function () {
                        if (this.user && this.user.name) {
                            return this.user.name;
                        }
                        return this.user.email;
                    },
                },            
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);
  
productSchema.statics.getAllProducts = async function () {
    try {
		const products = await this.find().exec();
		return products;
    } catch (err) {
		console.error(err);
		throw new Error('Error fetching products from database');
    }
};

// Some validation to ensure the data is correct before saving/updating the product.

productSchema.statics.getProductById = async function (productId) {
    try {
        const product = await this.findById(productId).exec();
        console.log(`Fetched product with id ${productId} from database`);
        return product;
    } catch (err) {
        console.error(err);
        throw new Error(`Error fetching product with id ${productId} from database`);
    }
};

productSchema.statics.updateProductById = async function (productId, productData) {
    try {
        productData.updatedAt = Date.now();
        const product = await this.findByIdAndUpdate(productId, productData, { new: true }).exec();
        console.log(`Updated product with id ${productId}`);
        return product;
    } catch (err) {
        console.error(err);
        throw new Error(`Error updating product with id ${productId}`);
    }
};

productSchema.statics.deleteProductById = async function (productId) {
    try {
        const product = await this.findByIdAndDelete(productId).exec();
        console.log(`Deleted product with id ${productId}`);
        return product;
    } catch (err) {
        console.error(err);
        throw new Error(`Error deleting product with id ${productId}`);
    }
};

productSchema.methods.addComment = async function (commentData) {
    try {
        this.comments.push(commentData);
        await this.save();
        console.log('Comment added to product successfully');
    } catch (err) {
        console.error(err);
        throw new Error('Error adding comment to product');
    }
};

productSchema.methods.removeComment = async function (commentId) {
    try {

        // This is called "atomic update" approach on mongodb were server of database performs the manipulation af data.
        // Use the $pull operator to remove the comment by its _id
        await this.updateOne({ $pull: { comments: { _id: commentId } } });

        // This is called JavaScript's array filtering approach. Application fetches all the data in database and send again with the updated data. Atomic approach is better.
        // this.comments = this.comments.filter((comment) => !mongoose.Types.ObjectId(comment._id).equals(commentId));

        await this.save();
    } catch (err) {
        console.error(err);
        throw new Error('Error removing comment from product');
    }
};

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;