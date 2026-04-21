import { network } from "hardhat";

async function main() {
  const message = process.argv[2]; // nhận từ Flask

  const { viem } = await network.create({
    network: "localhost",
  });

  const publicClient = await viem.getPublicClient();
  const [wallet] = await viem.getWalletClients();

  const chat = await viem.getContractAt(
    "Chat",
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
  );

  const txHash = await chat.write.logMessage([message], {
    account: wallet.account,
  });

  await publicClient.waitForTransactionReceipt({ hash: txHash });

  console.log("TX:", txHash);
}

main().catch(console.error);