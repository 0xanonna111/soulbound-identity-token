const { ethers } = require("hardhat");
const config = require("./sbt_config.json");

async function main() {
    const [_, user, other] = await ethers.getSigners();
    const sbt = await ethers.getContractAt("SoulboundToken", config.sbt, user);

    console.log(`User attempting to sell/transfer SBT to ${other.address}...`);

    try {
        // ID 0
        const tx = await sbt.transferFrom(user.address, other.address, 0);
        await tx.wait();
        console.log("CRITICAL ERROR: Transfer succeeded (It should have failed!)");
    } catch (e) {
        console.log("SUCCESS: Transfer failed as expected.");
        console.log(`Reason: ${e.message}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
