from flask import Flask, request, jsonify

app = Flask(__name__)

messages = []

@app.route("/event", methods=["POST"])
def receive_event():
    data = request.json

    print("📩 Event received:", data)

    messages.append(data)

    return jsonify({"status": "ok"})

@app.route("/messages", methods=["GET"])
def get_messages():
    return jsonify(messages)

if __name__ == "__main__":
    app.run(port=5000)