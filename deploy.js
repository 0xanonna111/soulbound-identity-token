const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [issuer] = await ethers.getSigners();
    console.log("Deploying SBT Contract with issuer:", issuer.address);

    const SBT = await ethers.getContractFactory("SoulboundToken");
    const sbt = await SBT.deploy();
    await sbt.waitForDeployment();
    const address = await sbt.getAddress();

    console.log(`SBT Deployed at: ${address}`);

    // Save Config
    const config = { sbt: address };
    fs.writeFileSync("sbt_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
