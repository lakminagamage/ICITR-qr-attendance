import Pusher from 'pusher';

// Configure Pusher with your app credentials
const pusher = new Pusher({
  appId: '1904627',
  key: '49aa52159c63a33968f8',
  secret: 'cf29a3a8176f45f7ec82',
  cluster: 'ap1',
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { participantID, clientID } = req.body;

    if(!participantID || !clientID) {
      return res.status(400).json({ error: 'Missing participantID or clientID' });
    }

    try {
      await pusher.trigger(clientID, 'update-participant-id', { participantID });

      return res.status(200).json({ message: 'Participant ID broadcasted to the client' });
    } catch (error) {
      console.error('Pusher error:', error);
      return res.status(500).json({ error: 'Failed to broadcast ID' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
