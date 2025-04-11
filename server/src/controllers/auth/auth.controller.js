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




  exports.registergoogleuser = async(req,res)=>{
    const {firebaseUID,displayName,email,profilePicture,authProvider}=req.body

    try{

      const newUser = new User({
        firebaseUID,
        displayName,
        email,
        profilePicture: profilePicture || null,
        authProvider: authProvider || 'email-password',
    
      });
      
      await newUser.save();
      res.status(200).json({
        message:"user check cretae successfully"

      })

      console.log("user sved successfully in mongodb",newUser);

    }catch(error){
      console.log("user saving Error in mongodb",error);
      res.status(400).json({
        message:"error",
        error:error.message
      })
      
      
    }

  }

  exports.getUserByFirebaseUID = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUID: req.params.firebaseUID });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};