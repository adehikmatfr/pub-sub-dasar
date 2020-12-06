require('dotenv').config();

const {PubSub}=require('@google-cloud/pubsub');

module.exports = async (config={}) => {
    return new PubSub(config);
}