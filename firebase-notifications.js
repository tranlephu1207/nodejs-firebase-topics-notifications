const admin = require('firebase-admin');

async function sendNotificationToAllDevices({
  title,
  body,
  data = {},
  hasSound = true,
  imageUrl = ""
}) {
  try {
    // Single message targeting the specific topic
    const message = {
      notification: {
        title,
        body
      },
      data: {
        ...data
      },
      topic: 'indigo-announcements-uat',  // Your specific topic
      android: {
        priority: 'high'
      },
      apns: {
        payload: {
          aps: {
            sound: hasSound ? 'default' : undefined
          }
        }
      }
    };

    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return { 
      success: true, 
      messageId: response 
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

module.exports = {
  sendNotificationToAllDevices
};