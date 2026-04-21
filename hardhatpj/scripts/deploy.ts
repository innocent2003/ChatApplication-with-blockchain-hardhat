import { network } from "hardhat";

async function main() {
  const { viem } = await network.create({
    network: "localhost",
  });

  const [wallet] = await viem.getWalletClients();

  const chat = await viem.deployContract("Chat", [], {
    client: { wallet },
  });

  console.log("Chat deployed to:", chat.address);
}

main().catch(console.error);