require("dotenv").config();

const { isObject, isString } = require("lodash");
const pubsubCliant = require("../connection/pubsub-connection");

const { topicExist, createTopic } = require("../topic/topic");
// const { retrySettings } = require("../constanta");

const publishMessage = async (
  topic = "", //this is a topic name
  config = {}, //config object
  message = "", //message
  customAttributes = {}, //optional atribut data
  enableMessageOrdering = false, //optional ordering message
  orderingKey = "" //optioanl ordering key
) => {
  try {
    const pubsub = await pubsubCliant(config);
    if (!(await topicExist(topic, config))) {
      await createTopic(topic, config);
    }
    const topicPub = pubsub.topic(
      topic,
      enableMessageOrdering
        ? { enableMessageOrdering } //queque message (antrean)
        : { enableMessageOrdering } //no queque
    );
    if (isString(message)) {
      let data = Buffer.from(message);
      if (enableMessageOrdering) {
        data = { data: Buffer.from(message), orderingKey };
        topicPub.publishMessage(data, (err, data) => cbMessage(err, data));
      } else {
        topicPub.publish(data, customAttributes, (err, data) =>
          cbMessage(err, data)
        );
      }
    } else if (isObject(message)) {
      if (enableMessageOrdering) message = { ...message, orderingKey };
      topicPub.publishJSON(message, customAttributes, (err, data) =>
        cbMessage(err, data)
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const cbMessage = (err, messageId) => {
  if (err) console.log(err);
  if (messageId) console.log(messageId);
};

module.exports = {
  publishMessage,
};
