import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const driveClient = google.drive({
  version: "v3",
  auth: oauth2Client,
});
export default driveClient;
