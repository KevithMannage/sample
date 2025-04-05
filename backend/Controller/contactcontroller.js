import Contact from "../Models/Contact.js"; // Import the Contactus model

export const contactus = async (req, res) => {
  const { name, email, message } = req.body;

  // Ensure both name, email, and message are provided
  if (!name || !message || !email) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    // Create a new contact message
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save the contact message to the database
    await newContact.save();

    // Respond with success message
    res.status(201).json({ message: 'Your message has been successfully received', status1: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving message', status: 'error' });
  }
};
