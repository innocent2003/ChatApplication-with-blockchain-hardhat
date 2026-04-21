from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

messages = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/event", methods=["POST"])
def receive_event():
    data = request.json
    messages.append(data)
    print("📩 Event:", data)
    return jsonify({"status": "ok"})

@app.route("/messages", methods=["GET"])
def get_messages():
    return jsonify(messages)


@app.route("/send", methods=["POST"])
def send():
    message = request.json["message"]

    print("🚀 Sending to blockchain:", message)

    # subprocess.Popen([
    #     "npx",
    #     "hardhat",
    #     "run",
    #     "scripts/send_message.ts",
    #     "--network",
    #     "localhost",
    #     message
    # ])

    return jsonify({"status": "sent"})
if __name__ == "__main__":
    app.run(port=5000, debug=True)