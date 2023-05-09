const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes); // for products
app.use('/api/users', userRoutes);  // for users
app.use('/api/auth', authRoutes); // for auth

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