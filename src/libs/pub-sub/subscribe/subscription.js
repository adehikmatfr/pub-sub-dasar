const pubsubCliant = require("../connection/pubsub-connection");
const { topicExist, createTopic } = require("../topic/topic");

// comming soon
const createSubscription=(topic = "",config = {})=>{
    const pubsub = await pubsubCliant(config);
    if (!(await topicExist(topic, config))) {
      await createTopic(topic, config);
    }
}