const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const app = express();

// Middleware to parse JSON reque
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));

app.use(express.json());
// MongoDB connection
const mongoURI = `mongodb+srv://saxenay117:mongoDB2024%23@cluster1.unzxb3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use((req, res, next) => {
    res.status(404).send('Not Found');
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
