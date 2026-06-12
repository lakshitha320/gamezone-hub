const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  // Read MongoDB URI from environment variables or default to a dummy URI if not provided
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.log('⚠️ No MONGODB_URI provided in environment variables. Falling back to In-Memory DB Mode.');
    global.useMongo = false;
    return false;
  }

  try {
    // Attempt Mongoose connection with a timeout so it doesn't hang indefinitely if offline
    console.log('🔌 Attempting to connect to MongoDB Atlas/Local...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    isConnected = true;
    global.useMongo = true;
    console.log('✅ MongoDB Connected Successfully.');
    return true;
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    console.log('⚠️ Falling back to In-Memory DB Mode.');
    global.useMongo = false;
    return false;
  }
};

module.exports = connectDB;
