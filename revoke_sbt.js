const { ethers } = require("hardhat");
const config = require("./sbt_config.json");

async function main() {
    const [issuer] = await ethers.getSigners();
    const sbt = await ethers.getContractAt("SoulboundToken", config.sbt, issuer);

    console.log("Revoking Token ID 0...");

    const tx = await sbt.revoke(0);
    await tx.wait();

    console.log("Token Revoked (Burned).");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
