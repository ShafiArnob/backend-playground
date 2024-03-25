const amqp = require("amqplib")

const msg = {number:process.argv[2]}

async function connect(){
  try {
    const connection = await amqp.connect("amqp://localhost:5672") //tcp connection
    const channel = await connection.createChannel()
    const result = await channel.assertQueue("jobs")
    
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
    console.log(`Job sent successfully ${msg.number}`);

    await channel.close()
    await connection.close()
  } catch (error) {
    console.error(error)
  }
}

connect()