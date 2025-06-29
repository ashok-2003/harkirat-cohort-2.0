const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:ashok2678@cluster0.d44br.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(async () => {
    console.log('Connected to MongoDB!');

    // Define the User model
    const User = mongoose.model('User', { 
      name: String, 
      email: String, 
      password: String 
    });

    // Create and save a new user
    const testUser = new User({ 
      name: "asho gupat", 
      email: "ash@gmail.com", 
      password: "123" 
    });


    return testUser.save();
  })
  .then(() => {
    console.log('Test user saved successfully!');
  })
  .catch(err => {
    console.error('Error:', err.message);
  });
