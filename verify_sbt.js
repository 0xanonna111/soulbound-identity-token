const { ethers } = require("hardhat");
const config = require("./sbt_config.json");

async function main() {
    const [_, user] = await ethers.getSigners();
    const sbt = await ethers.getContractAt("SoulboundToken", config.sbt);

    const balance = await sbt.balanceOf(user.address);
    
    console.log(`Checking Identity for ${user.address}...`);
    
    if (balance > 0) {
        console.log("✅ Verified: User holds a Soulbound Token.");
        // Check lock status
        // In EIP-5192, we can call locked(tokenId)
        // Ideally we iterate tokens, here we assume ID 0
        try {
            const isLocked = await sbt.locked(0);
            console.log(`Token 0 Locked Status: ${isLocked}`);
        } catch (e) {
            console.log("Token 0 does not exist or not owned.");
        }
    } else {
        console.log("❌ Failed: No credential found.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
