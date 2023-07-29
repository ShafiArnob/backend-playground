from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

class WebChatConsumer(JsonWebsocketConsumer):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.channel_id = None
    self.user = None

  def connect(self):
    self.accept()
    print(self.scope)
    self.channel_id = self.scope["url_route"]["kwargs"]["channelId"]

    async_to_sync(self.channel_layer.group_add)(
        self.channel_id,
        self.channel_name
    )

  def receive_json(self, content):
    async_to_sync(self.channel_layer.group_send)(
      self.channel_id, # group name
      # the message
      {
        "type":"chat.message",
        "new_message":content["message"]
      }
    )
    # self.close() 

  #this method is envoked when chat message type:"chat.message" is invoked above 
  def chat_message(self, event):
    self.send_json(event)

  def disconnect(self, close_code):
    pass