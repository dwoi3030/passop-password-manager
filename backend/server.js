const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const cors = require('cors');

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'passOP';
const PORT = Number(process.env.PORT || 3000);
const FRONTEND_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

if (!MONGO_URL) {
  throw new Error('Missing MONGO_URL in backend/.env');
}

const app = express();
const client = new MongoClient(MONGO_URL);

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

const isValidPasswordPayload = (payload) => {
  return (
    payload &&
    typeof payload.site === 'string' &&
    typeof payload.username === 'string' &&
    typeof payload.password === 'string' &&
    typeof payload.id === 'string' &&
    payload.site.trim().length > 0 &&
    payload.username.trim().length > 0 &&
    payload.password.trim().length > 0
  );
};

const getPasswordsCollection = () => client.db(DB_NAME).collection('passwords');

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/passwords', async (_req, res) => {
  try {
    const passwords = await getPasswordsCollection().find({}).sort({ site: 1 }).toArray();
    res.json(passwords);
  } catch (error) {
    console.error('Failed to load passwords:', error);
    res.status(500).json({ success: false, message: 'Failed to load passwords' });
  }
});

app.post('/api/passwords', async (req, res) => {
  try {
    const password = req.body;

    if (!isValidPasswordPayload(password)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password payload',
      });
    }

    await getPasswordsCollection().insertOne(password);

    res.status(201).json({
      success: true,
      password,
    });
  } catch (error) {
    console.error('Failed to save password:', error);
    res.status(500).json({ success: false, message: 'Failed to save password' });
  }
});

app.put('/api/passwords/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const password = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Missing password id' });
    }

    if (!isValidPasswordPayload(password)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password payload',
      });
    }

    const collection = getPasswordsCollection();
    const result = await collection.updateOne(
      { id },
      {
        $set: {
          site: password.site,
          username: password.username,
          password: password.password,
          id: password.id,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Password not found' });
    }

    const updatedPassword = await collection.findOne({ id: password.id });

    res.json({
      success: true,
      password: updatedPassword,
    });
  } catch (error) {
    console.error('Failed to update password:', error);
    res.status(500).json({ success: false, message: 'Failed to update password' });
  }
});

app.delete('/api/passwords/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const passwordId = id || req.body?.id;

    if (!passwordId) {
      return res.status(400).json({ success: false, message: 'Missing password id' });
    }

    const result = await getPasswordsCollection().deleteOne({ id: passwordId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Password not found' });
    }

    res.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Failed to delete password:', error);
    res.status(500).json({ success: false, message: 'Failed to delete password' });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

startServer();
