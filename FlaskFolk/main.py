from flask import Flask, request, jsonify, render_template
from web3 import Web3
import json

app = Flask(__name__)

# Kết nối Hardhat node
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))

# Account mặc định của Hardhat
account = w3.eth.accounts[0]

# Địa chỉ contract bạn đã deploy
contract_address = Web3.to_checksum_address(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
)

# contract = w3.eth.contract(address=contract_address, abi=abi)

# ABI (lấy từ artifacts/contracts/Chat.sol/Chat.json)
with open("D:\\blockchainpj\\hardhatpj\\artifacts\\contracts\\Chat.sol\\Chat.json") as f:
    abi = json.load(f)["abi"]

contract = w3.eth.contract(address=contract_address, abi=abi)

messages = []
last_block = 0

@app.route("/send", methods=["POST"])
def send():
    message = request.json["message"]

    tx_hash = contract.functions.logMessage(message).transact({
        "from": account
    })

    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    return jsonify({
        "tx": tx_hash.hex(),
        "status": "ok"
    })
def fetch_events():
    global last_block

    latest = w3.eth.block_number

    # không có block mới thì bỏ qua
    if latest <= last_block:
        return

    events = contract.events.MessageLogged.get_logs(
        from_block=last_block + 1,
        to_block=latest
    )

    for e in events:
        msg = {
            "user": e["args"]["user"],
            "hash": e["args"]["hash"]
        }

        print("📩 Event:", msg)  # DEBUG

        messages.append(msg)

    last_block = latest

@app.route("/messages")
def get_messages():
    fetch_events()
    return jsonify(messages)

@app.route("/")
def index():
    return render_template("index.html")   

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)