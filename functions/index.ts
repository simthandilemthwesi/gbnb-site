import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

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
