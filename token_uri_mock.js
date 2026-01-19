// Example metadata structure for an SBT
const metadata = {
    "name": "Verified Developer",
    "description": "This token proves the holder has passed the advanced Solidity exam.",
    "image": "ipfs://QmYourImageHash",
    "attributes": [
        {
            "trait_type": "Exam Score",
            "value": "98"
        },
        {
            "trait_type": "Date Issued",
            "value": "2024-01-01"
        }
    ]
};

console.log(JSON.stringify(metadata, null, 2));
