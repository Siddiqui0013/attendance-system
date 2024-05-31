import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import loginRoute from './login.js'

const mongoDBUrl = "mongodb+srv://admin:admin@attendence-management-s.26893ri.mongodb.net/?retryWrites=true&w=majority&appName=Attendence-management-system";
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to Mongo DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/login', loginRoute)  
        

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
