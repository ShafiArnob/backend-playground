from channels.generic.websocket import WebsocketConsumer

class MyConsumer(WebsocketConsumer):
    # groups = ["broadcast"]

    def connect(self):
        # Called on connection.
        # To accept the connection call:
        self.accept()
        # To reject the connection, call:
        # self.close()

    def receive(self, text_data=None, bytes_data=None):
        print(text_data)
        self.send(text_data= text_data)
        # Want to force-close the connection? Call:
        self.close() 

    def disconnect(self, close_code):
        pass