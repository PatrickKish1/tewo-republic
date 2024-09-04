export const CONTRACT_ADDRESS = "0xb9C992eF068a2a7b71e5EaeE22AAc2eB48D98d04"
export const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "defaultAdmin",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "pauser",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "InvalidAmount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidId",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "by",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "FundsWithdrawn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "gigId",
          "type": "uint256"
        }
      ],
      "name": "GigAssigned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "GigCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "gigId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "worker",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "GigPaidOut",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Received",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "GIG_OWNER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PAUSER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allGigs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "gigId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "assignedApplicant",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "img",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "bounty",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "userSelected",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "paid",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "appCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gigId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_coverLetter",
          "type": "string"
        }
      ],
      "name": "applyJob",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_img",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "_kpis",
          "type": "string[]"
        }
      ],
      "name": "createGig",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllGigs",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "gigId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "assignedApplicant",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "img",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "bounty",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "kpis",
              "type": "string[]"
            },
            {
              "internalType": "bool",
              "name": "userSelected",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "paid",
              "type": "bool"
            }
          ],
          "internalType": "struct GigsHub.Gigs[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gigId",
          "type": "uint256"
        }
      ],
      "name": "getGigApplications",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "appId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gigId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "applicant",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "coverLetter",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "selected",
              "type": "bool"
            }
          ],
          "internalType": "struct GigsHub.Application[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gigId",
          "type": "uint256"
        }
      ],
      "name": "getGigById",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "gigId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "assignedApplicant",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "img",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "bounty",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "kpis",
              "type": "string[]"
            },
            {
              "internalType": "bool",
              "name": "userSelected",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "paid",
              "type": "bool"
            }
          ],
          "internalType": "struct GigsHub.Gigs",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserAppl",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "appId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gigId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "applicant",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "coverLetter",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "selected",
              "type": "bool"
            }
          ],
          "internalType": "struct GigsHub.Application[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUsersGig",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "gigId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "assignedApplicant",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "img",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "bounty",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "kpis",
              "type": "string[]"
            },
            {
              "internalType": "bool",
              "name": "userSelected",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "paid",
              "type": "bool"
            }
          ],
          "internalType": "struct GigsHub.Gigs[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gigsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gigId",
          "type": "uint256"
        }
      ],
      "name": "payout",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gigId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_appId",
          "type": "uint256"
        }
      ],
      "name": "selectWorker",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]