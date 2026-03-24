const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const os = require('os');
const axios = require('axios');
const connectDB = require('./config/db');

// Route files
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Get local IP
  const interfaces = os.networkInterfaces();
  let localIp = 'localhost';
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIp = iface.address;
        break;
      }
    }
  }
  
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Local:            http://localhost:${PORT}`);
  console.log(`On Your Network:  http://${localIp}:${PORT}`);
});

// Keep-Alive Ping (Self-pinging to reduce sleeping)
const SERVICE_URL = process.env.SELF_PING_URL || process.env.RENDER_EXTERNAL_URL;

const keepAlive = () => {
  if (!SERVICE_URL) {
    console.warn('SELF_PING_URL or RENDER_EXTERNAL_URL is not set. Keep-alive ping is disabled.');
    return;
  }

  setInterval(async () => {
    try {
      await axios.get(SERVICE_URL);
      console.log('Keep-alive ping successful');
    } catch (error) {
      console.error('Keep-alive ping failed:', error.message);
    }
  }, 14 * 60 * 1000);
};

if (process.env.NODE_ENV === 'production') {
  keepAlive();
}
