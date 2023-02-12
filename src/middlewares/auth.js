const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});
async function auth(req, res, next) {
  const token = req.headers.authtoken;
  if (token && token != "") {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.userData = decodedToken;
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403);
  }
  next();
}
module.exports = auth;
