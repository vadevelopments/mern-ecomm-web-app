const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes); // for products
app.use('/api/users', userRoutes);  // for users
app.use('/api/auth', authRoutes); // for auth
app.use('/api/review', reviewRoutes); // for reviews
app.use('/api/cart', cartRoutes); // for carts
app.use('/api/order', orderRoutes); // for orders

app.get('/', (req, res) => {
    res.send('Server is running');
});

// connect to db
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        // Close the database connection when the Node.js process is exiting
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('Mongoose connection closed');
                process.exit(0);
            });
        });
    })
    .catch((err) => console.log(err));