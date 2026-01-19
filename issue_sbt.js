const { ethers } = require("hardhat");
const config = require("./sbt_config.json");

async function main() {
    const [issuer, user] = await ethers.getSigners();
    const sbt = await ethers.getContractAt("SoulboundToken", config.sbt, issuer);

    console.log(`Issuing credential to ${user.address}...`);

    const tx = await sbt.safeMint(user.address);
    const receipt = await tx.wait();

    console.log("SBT Minted Successfully!");
    console.log("Token is now bound to the user wallet.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
