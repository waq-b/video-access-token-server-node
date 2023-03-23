require("dotenv").load();

const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

function tokenGenerator(identity, room) {
  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  // Used specifically for creating Chat tokens
  const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;

  // Create a "grant" which enables a client to use Chat as a given user,
  // on a given device
  const chatGrant = new ChatGrant({
    serviceSid: serviceSid,
  });

  // Assign identity to the token
  token.identity = identity;

  // Grant the access token Twilio Video capabilities
  const grant = new VideoGrant();
  grant.room = room;
  token.addGrant(grant);
  token.addGrant(chatGrant);

  // Serialize the token to a JWT string
  return token.toJwt();
}

module.exports = tokenGenerator;
