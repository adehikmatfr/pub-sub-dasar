const { publishMessage } = require("./src/libs/pub-sub/config");

async function quickstart(
  projectId = "your-project-id",
  topicName = "my-topic" 
) {
  // Instantiates a client
  for (let i = 0; i < 10; i++) {
    await publishMessage(
      topicName,
      { projectId },
       "this message" + i ,
      {aku:'cinta'},
      false,
      i
    );
  }
}

quickstart(process.env.GOOGLE_PUBSUB_PROJECT_ID, "test");
