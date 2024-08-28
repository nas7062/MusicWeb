const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

// Spotify API 엔드포인트
app.get('/api/playlists', async (req, res) => {
  try {
    const { accessToken } = req.query;
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
