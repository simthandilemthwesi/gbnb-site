import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

admin.initializeApp();

const HF_API_KEY = functions.config().huggingface?.key || process.env.HF_API_KEY || '';

const HF_BASE = 'https://api-inference.huggingface.co/models';

function formatText(json: any): string {
  if (Array.isArray(json) && json[0]?.generated_text) return String(json[0].generated_text);
  if (typeof json === 'string') return json;
  if (json?.generated_text) return String(json.generated_text);
  if (json?.error) return `Error: ${json.error}`;
  return JSON.stringify(json);
}

function formatImage(json: any): string {
  if (Array.isArray(json)) {
    return json
      .slice(0, 5)
      .map((x: any) => `${x.label} (${(Number(x.score) * 100).toFixed(1)}%)`)
      .join(', ');
  }
  if (json?.error) return `Error: ${json.error}`;
  return JSON.stringify(json);
}

function formatAudio(json: any): string {
  if (json?.text) return String(json.text);
  if (json?.error) return `Error: ${json.error}`;
  return JSON.stringify(json);
}

export const assistantProxy = functions
  .https.onCall(async (data: any) => {
    if (!HF_API_KEY) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Hugging Face API key is not configured. Run: firebase functions:config:set huggingface.key "hf_..."'
      );
    }

    const type = data?.type;
    try {
      if (type === 'text') {
        const model = data.model || 'microsoft/phi-2';
        const isInstruct = /mistral|llama|falcon|gemma/i.test(model);
        const prompt = isInstruct ? `<s>[INST] ${data.inputs || ''} [/INST]` : data.inputs || '';
        const res = await fetch(`${HF_BASE}/${model}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ inputs: prompt })
        });
        return { type: 'text', result: formatText(await res.json()) };
      }

      if (type === 'image') {
        const model = data.model || 'google/vit-base-patch16-224';
        const buffer = Buffer.from(data.data || '', 'base64');
        const res = await fetch(`${HF_BASE}/${model}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            'Content-Type': data.mimeType || 'image/jpeg'
          },
          body: buffer
        });
        return { type: 'image', result: formatImage(await res.json()) };
      }

      if (type === 'audio') {
        const model = data.model || 'openai/whisper-small';
        const buffer = Buffer.from(data.data || '', 'base64');
        const res = await fetch(`${HF_BASE}/${model}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            'Content-Type': data.mimeType || 'audio/wav'
          },
          body: buffer
        });
        return { type: 'audio', result: formatAudio(await res.json()) };
      }

      throw new functions.https.HttpsError('invalid-argument', `Unsupported type: ${type}`);
    } catch (err: any) {
      console.error('assistantProxy error:', err);
      throw new functions.https.HttpsError(
        'internal',
        err?.message || 'Request to Hugging Face failed.'
      );
    }
  });

const db = admin.firestore();

export const onVolunteerSubmit = functions.firestore
  .document('volunteers/{volunteerId}')
  .onCreate(async (snap, context) => {
    const volunteer = snap.data();
    console.log('New volunteer application:', volunteer);
    return null;
  });

export const onContactSubmit = functions.firestore
  .document('contact_submissions/{submissionId}')
  .onCreate(async (snap, context) => {
    const submission = snap.data();
    console.log('New contact submission:', submission);
    return null;
  });

export const onDonationSubmit = functions.firestore
  .document('donations/{donationId}')
  .onCreate(async (snap, context) => {
    const donation = snap.data();
    console.log('New donation:', donation);
    return null;
  });

export const onPartnershipSubmit = functions.firestore
  .document('partnerships/{partnershipId}')
  .onCreate(async (snap, context) => {
    const partnership = snap.data();
    console.log('New partnership inquiry:', partnership);
    return null;
  });

export const sendContactNotification = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).send('Method not allowed');
    return;
  }

  const { name, email, subject, message } = req.body;

  try {
    await db.collection('notifications').add({
      type: 'contact',
      name,
      email,
      subject,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

export const sendDonationNotification = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).send('Method not allowed');
    return;
  }

  const { donorName, email, amount, currency, message } = req.body;

  try {
    await db.collection('notifications').add({
      type: 'donation',
      donorName,
      email,
      amount,
      currency,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});
