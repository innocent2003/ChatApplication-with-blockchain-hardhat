// import { network } from "hardhat";

// async function main() {
//   const { viem } = await network.create({
//     network: "localhost",
//   });

//   const publicClient = await viem.getPublicClient();

//   const chat = await viem.getContractAt(
//     "Chat",
//     "0x5fbdb2315678afecb367f032d93f642f64180aa3"
//   );

//   console.log("👂 Listening events...");

//   publicClient.watchContractEvent({
//     address: chat.address,
//     abi: chat.abi,
//     eventName: "MessageLogged",
//     onLogs: (logs) => {
//       for (const log of logs) {
//         console.log("📩 New message:", log.args);
//       }
//     },
//   });
// }

// main();


import { network } from "hardhat";
import axios from "axios";

async function main() {
  const { viem } = await network.create({
    network: "localhost",
  });

  const publicClient = await viem.getPublicClient();

  const chat = await viem.getContractAt(
    "Chat",
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
  );

  console.log("👂 Listening events...");

  publicClient.watchContractEvent({
    address: chat.address,
    abi: chat.abi,
    eventName: "MessageLogged",
    onLogs: async (logs) => {
      for (const log of logs) {
        const data = {
          user: log.args.user,
          hash: log.args.hash,
        };

        console.log("📩 Sending to Flask:", data);

        await axios.post("http://127.0.0.1:5000/event", data);
      }
    },
  });
}

main();