import mongoose from 'mongoose';

// User Schema
const Contactusschema = new mongoose.Schema({
 name: { type: String, required: true },
 email:{ type: String, required: true },
 message: { type: String, required: true },
  
});

const Contact = mongoose.model('Contact', Contactusschema);

export default Contact;