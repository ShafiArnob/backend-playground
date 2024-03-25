from flask import Flask
from flask_restful import Resource, Api, reqparse, abort

app = Flask(__name__)
api = Api(app)

todos = {
  1: {"task":"Hello World", "summary":"write code"},
  2: {"task":"Hello World 2", "summary":"write code 2"},
  3: {"task":"Hello World 3", "summary":"write code 3"}

}

class ToDoList(Resource):
  def get(self):
    return todos


class ToDo(Resource):
  def get(self, todo_id):
    return todos[todo_id]

api.add_resource(ToDo, "/todo/<int:todo_id>")
api.add_resource(ToDoList, "/todo")

if __name__ == "__main__":
  app.run(debug=True)