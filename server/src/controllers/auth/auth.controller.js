const auth = require('../../utils/config/firebase');
const User = require('../../models/auth/user.model')


exports.registerUser = async (req, res) => {
  const { email, password, displayName, profilePicture, authProvider } = req.body;

  try {
    const user = await auth.createUser({displayName, email, password });

    const newUser = new User({
        firebaseUID: user.uid,
        displayName,
        email,
        profilePicture: profilePicture || null,
        authProvider: authProvider || 'email-password',
    
      });
  
      await newUser.save();
  

    res.status(200).json({
      message: 'User registered successfully!',
      userId: user.uid,
    });
    

  } catch (error) {
    res.status(400).json({
      message: 'Error registering user',
      error: error.message,
    });
  }
};


exports.verifyToken = async (req, res) => {
  const idToken = req.headers.authorization?.split(' ')[1]; 

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    res.status(200).json({
      message: 'Token verified successfully!',
      userId: decodedToken.uid,
    });
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }
  
    try {

      const user = await auth.getUserByEmail(email,password);

      res.status(200).json({
        message: 'User logged in successfully!',
        userId: user.uid,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Invalid email or password',
        error: error.message,
      });
    }
  };
