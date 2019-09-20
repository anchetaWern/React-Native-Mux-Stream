const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pusher = require("pusher");
const randomId = require("random-id");

require("dotenv").config();
const app = express();

const pusher = new Pusher({
  appId: process.env.CHANNELS_APP_ID,
  key: process.env.CHANNELS_APP_KEY,
  secret:  process.env.CHANNELS_APP_SECRET,
  cluster: process.env.CHANNELS_APP_CLUSTER,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const streams = [];

app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

app.post("/stream", (req, res) => {
  const { id, mux_stream_key, mux_playback_id } = req.body;
  const index = streams.findIndex(strm => strm.id == id);
  if (index === -1) {
    streams.push({
      id,
      mux_stream_key,
      mux_playback_id
    });
  }
  res.send('ok');
});

app.get("/stream/:id", (req, res) => {
  const id = req.params.id;
  const data = streams.find(strm => strm.id == id);
  res.send({ playback_id: data.mux_playback_id });
});

app.get('/send/:channel_name/:comment', (req, res) => {
  pusher.trigger(
    `private-stream-${req.params.channel_name}`,
    'client-viewer-comment',
    { id: randomId(5), text: req.params.comment }
  );
  res.send('ok');
});

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on ports ${PORT}`);
  }
});