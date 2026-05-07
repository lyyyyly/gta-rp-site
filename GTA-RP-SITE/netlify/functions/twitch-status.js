exports.handler = async () => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  // Token Twitch
  const tokenRes = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    {
      method: "POST"
    }
  );

  const tokenData = await tokenRes.json();

  const accessToken = tokenData.access_token;

  // Liste streamers
  const users = [
    "locklear",
    "kamet0",
    "doigby"
  ];

  const query = users.map(u => `user_login=${u}`).join("&");

  const streamsRes = await fetch(
    `https://api.twitch.tv/helix/streams?${query}`,
    {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  const data = await streamsRes.json();

  const online = data.data.map(s =>
    s.user_login.toLowerCase()
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ online })
  };
};