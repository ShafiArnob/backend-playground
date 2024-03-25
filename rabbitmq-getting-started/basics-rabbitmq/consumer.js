const amqp = require("amqplib")

async function connect(){
  try {
    const connection = await amqp.connect("amqp://localhost:5672") //tcp connection
    const channel = await connection.createChannel()
    const result = channel.assertQueue("jobs")
    
    channel.consume("jobs", message=>{
      const input = JSON.parse(message.content.toString())
      console.log(`Recieved job: ${input.number}`);
      if(input.number==7){
        channel.ack(message)
      }
    })

    console.log("Waiting for messages...");
  } catch (error) {
    console.error(error)
  }
}

connect()