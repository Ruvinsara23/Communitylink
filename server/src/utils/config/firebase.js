const admin = require('firebase-admin');
const serviceAccount = require('../communitylink-176f1-firebase.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
module.exports = auth;