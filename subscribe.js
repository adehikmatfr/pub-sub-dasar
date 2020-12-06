require("dotenv").config();

const { PubSub } = require("@google-cloud/pubsub");

const pubsub = new PubSub({ projectId: process.env.GOOGLE_PUBSUB_PROJECT_ID });

const subscription = pubsub.subscription('subtest');

// Create an event handler to handle messages
let messageCount = 0;
const messageHandler = (message) => {
  console.log(`Received message ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  console.log(message.attributes);
  messageCount += 1;

  // "Ack" (acknowledge receipt of) the message
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on("message", messageHandler);
setTimeout(() => {
  subscription.removeListener("message", messageHandler);
  console.log(`${messageCount} message(s) received.`);
},5*1000);

subscription.open();
