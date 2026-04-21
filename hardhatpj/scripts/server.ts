// import express from "express";
// import { network } from "hardhat";

// const app = express();
// app.use(express.json());

// let viem, wallet, publicClient, chat;

// // init 1 lần
// async function init() {
//   const ctx = await network.create({
//     network: "localhost",
//   });

//   viem = ctx.viem;

//   publicClient = await viem.getPublicClient();
//   [wallet] = await viem.getWalletClients();

//   chat = await viem.getContractAt(
//     "Chat",
//     "0x5fbdb2315678afecb367f032d93f642f64180aa3"
//   );

//   console.log("✅ Node service ready");
// }

// await init();

// ---

// # 🔥 API gửi message

// app.post("/send", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const txHash = await chat.write.logMessage([message], {
//       account: wallet.account,
//     });

//     await publicClient.waitForTransactionReceipt({ hash: txHash });

//     res.json({ txHash });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });



// app.listen(3000, async () => {
//   console.log("🚀 Node API running on http://localhost:3000");

//   publicClient.watchContractEvent({
//     address: chat.address,
//     abi: chat.abi,
//     eventName: "MessageLogged",
//     onLogs: async (logs) => {
//       for (const log of logs) {
//         const data = {
//           user: log.args.user,
//           hash: log.args.hash,
//         };

//         console.log("📩 Event:", data);

//         await fetch("http://127.0.0.1:5000/event", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         });
//       }
//     },
//   });
// });