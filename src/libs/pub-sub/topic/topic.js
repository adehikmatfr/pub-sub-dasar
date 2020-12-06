require("dotenv").config();

const pubsubCliant = require("../connection/pubsub-connection");

// create topic return topic if exist
const createTopic = async (topicName = "", config = {}) => {
  try {
    const pubsub = await pubsubCliant(config);
    if (!topicExist(topicName, config)) {
      console.log(`topic ${topicName} exist`);
    }
    await pubsub.createTopic(topicName);
  } catch (err) {
    console.log(err);
  }
};

// delete topic return true if sucess
const deleteTopic = async (topicName = "", config = {}) => {
  try {
    const pubsub = await pubsubCliant(config);
    const topic = pubsub.topic(topicName);
    topic.delete((err, apiResponse) => {
      if (err) return err.details;
      return true;
    });
  } catch (err) {
    console.log(err);
  }
};

// get topic exist return boolean
const topicExist = async (topicName = "", config = {}) => {
  try {
    const pubsub = await pubsubCliant(config);
    const topic = pubsub.topic(topicName);
    const topicExist = await topic.exists();
    if (topicExist.length >= 0) return topicExist[0];
    return false;
  } catch (err) {
    console.log(err);
  }
};

// show all topic
const showListTopic = async (config = {}) => {
  try {
    const pubsub = await pubsubCliant(config);
    pubsub.getTopics({}, function (err, topics, nextQuery, apiResponse) {
      _.map(topics, (topic) => {
        console.log(topic.name);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createTopic,
  deleteTopic,
  topicExist,
  showListTopic,
};
