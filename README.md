# Soulbound Identity Token (SBT)

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![Standard](https://img.shields.io/badge/EIP-5192-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**Soulbound Identity Token** allows organizations to issue non-transferable credentials. Once minted to a user's wallet ("Soul"), the token stays there forever unless revoked by the issuer. This prevents users from buying/selling certifications.

## Features

-   **Non-Transferable**: The `transferFrom` and `safeTransferFrom` functions are overridden to revert.
-   **Locking**: Implements the EIP-5192 locking mechanism for wallet indexers.
-   **Revocable**: The issuer can burn the token if the credential is no longer valid (e.g., expiration).
-   **Metadata**: Supports standard URI storage for certificate details.

## Usage

```bash
# 1. Install
npm install

# 2. Deploy Contract
npx hardhat run deploy.js --network localhost

# 3. Issue a Credential (Mint SBT)
node issue_sbt.js

# 4. Verify Identity
node verify_sbt.js

# 5. Attempt Transfer (Will Fail)
node attempt_transfer.js
