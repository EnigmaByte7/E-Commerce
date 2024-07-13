const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
const corsOptions = {
    origin: 'https://e-commerce-frontend-app-seven.vercel.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));


// MongoDB connection
const mongoURI = `mongodb+srv://saxenay117:mongoDB2024%23@cluster1.unzxb3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);

app.get("/", (req, res) => res.send("Express on Vercel"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
