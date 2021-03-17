/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { PetConvert } from "./PetConvert";

export class PetConvertFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<PetConvert> {
    return super.deploy(overrides || {}) as Promise<PetConvert>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PetConvert {
    return super.attach(address) as PetConvert;
  }
  connect(signer: Signer): PetConvertFactory {
    return super.connect(signer) as PetConvertFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PetConvert {
    return new Contract(address, _abi, signerOrProvider) as PetConvert;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "AllowedWES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ClaimedWES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "ConvertWES",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "lastWithdrawMonthID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_petId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endAnnuityMonthId",
        type: "uint256",
      },
    ],
    name: "monthlyAnnuity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pet",
    outputs: [
      {
        internalType: "contract TimeAllyPET",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_petId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_powerBoosterId",
        type: "uint256",
      },
    ],
    name: "powerBooster",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "powerBoosterId",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prepaidEs",
    outputs: [
      {
        internalType: "contract PrepaidEs",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600080546001600160a01b0319908116736325e975a09e047720f6d8cf25bd2577fb70625017909155600180549091167209006c385ce986a576d6adca928888afc8cddb17905534801561005757600080fd5b50610d8a806100676000396000f3fe608060405234801561001057600080fd5b50600436106100835760003560e01c80634418e7b3146100885780635143ed70146100b1578063b1b7ecad146100c4578063b913ecb2146100d9578063cc097838146100f9578063cc3611f71461010c578063d4541fa31461011f578063e9b7d7dd14610132578063f456795114610147575b600080fd5b61009b6100963660046109cc565b61014f565b6040516100a89190610d4b565b60405180910390f35b61009b6100bf3660046109cc565b610161565b6100d76100d2366004610a68565b610173565b005b6100ec6100e7366004610a16565b6102bd565b6040516100a89190610b88565b6100d7610107366004610a16565b6102e3565b61009b61011a3660046109ed565b6106eb565b61009b61012d366004610a16565b610708565b61013a610992565b6040516100a89190610b93565b61013a6109a1565b60046020526000908152604090205481565b60056020526000908152604090205481565b3360009081526005602090815260408083205460049092529091205490820111156101b95760405162461bcd60e51b81526004016101b090610d02565b60405180910390fd5b6000546040516323b872dd60e01b81526001600160a01b03909116906323b872dd906101ed90339030908690600401610ae1565b602060405180830381600087803b15801561020757600080fd5b505af115801561021b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061023f9190610a48565b50600054604051634c184ca960e11b81526001600160a01b03909116906398309952906102729033908590600401610b05565b600060405180830381600087803b15801561028c57600080fd5b505af11580156102a0573d6000803e3d6000fd5b505033600090815260056020526040902080549093019092555050565b600360209081526000938452604080852082529284528284209052825290205460ff1681565b336001600160a01b038416146103935760015460405163174b90db60e11b81526001600160a01b0390911690632e9721b69061032790869086903390600401610b1e565b60206040518083038186803b15801561033f57600080fd5b505afa158015610353573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103779190610a48565b6103935760405162461bcd60e51b81526004016101b090610bdb565b6001600160a01b0380841660009081526003602090815260408083208684528252808320858452909152808220546001549151633ee20a8960e01b815260ff9091169383928392839283928392911690633ee20a89906103f9908d908d90600401610b05565b60c06040518083038186803b15801561041157600080fd5b505afa158015610425573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104499190610a98565b955095509550955095509550876001111580156104675750600c8811155b6104835760405162461bcd60e51b81526004016101b090610c0f565b86156104a15760405162461bcd60e51b81526004016101b090610ccf565b600154604051637b89e3cf60e11b815285916001600160a01b03169063f713c79e906104d9908e908e90600d8f900390600401610b41565b60206040518083038186803b1580156104f157600080fd5b505afa158015610505573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105299190610a80565b10156105475760405162461bcd60e51b81526004016101b090610ca1565b6000600160009054906101000a90046001600160a01b03166001600160a01b0316634cd963cf8c8c8c6005026001016040518463ffffffff1660e01b815260040161059493929190610b41565b60206040518083038186803b1580156105ac57600080fd5b505afa1580156105c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e49190610a80565b9050804210156106065760405162461bcd60e51b81526004016101b090610c3e565b60015460405163452f142360e01b81526000916001600160a01b03169063452f142390610639908f908f90600401610b05565b60206040518083038186803b15801561065157600080fd5b505afa158015610665573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106899190610a80565b6001600160a01b038d1660009081526003602090815260408083208f845282528083208e84529091529020805460ff19166001179055905080156106dd573360009081526004602052604090208054820190555b505050505050505050505050565b600260209081526000928352604080842090915290825290205481565b6000336001600160a01b038516146107ba5760015460405163174b90db60e11b81526001600160a01b0390911690632e9721b69061074e90879087903390600401610b1e565b60206040518083038186803b15801561076657600080fd5b505afa15801561077a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061079e9190610a48565b6107ba5760405162461bcd60e51b81526004016101b090610bdb565b6001600160a01b03841660009081526002602090815260408083208684529091529020548281106107fd5760405162461bcd60e51b81526004016101b090610c6d565b603c83111561081e5760405162461bcd60e51b81526004016101b090610ba7565b600154604051634cd963cf60e01b81526000916001600160a01b031690634cd963cf9061085390899089908990600401610b41565b60206040518083038186803b15801561086b57600080fd5b505afa15801561087f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a39190610a80565b9050804210156108c55760405162461bcd60e51b81526004016101b090610c3e565b60018054604051634762653160e01b81526000926001600160a01b0390921691634762653191610900918b918b918901908b90600401610b62565b60206040518083038186803b15801561091857600080fd5b505afa15801561092c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109509190610a80565b6001600160a01b03881660009081526002602090815260408083208a845282528083208990553383526004909152902080548201905593505050509392505050565b6001546001600160a01b031681565b6000546001600160a01b031681565b80356001600160a01b03811681146109c757600080fd5b919050565b6000602082840312156109dd578081fd5b6109e6826109b0565b9392505050565b600080604083850312156109ff578081fd5b610a08836109b0565b946020939093013593505050565b600080600060608486031215610a2a578081fd5b610a33846109b0565b95602085013595506040909401359392505050565b600060208284031215610a59578081fd5b815180151581146109e6578182fd5b600060208284031215610a79578081fd5b5035919050565b600060208284031215610a91578081fd5b5051919050565b60008060008060008060c08789031215610ab0578182fd5b865195506020870151945060408701519350606087015192506080870151915060a087015190509295509295509295565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0393841681526020810192909252909116604082015260600190565b6001600160a01b039390931683526020830191909152604082015260600190565b6001600160a01b0394909416845260208401929092526040830152606082015260800190565b901515815260200190565b6001600160a01b0391909116815260200190565b6020808252601a90820152796f6e6c7920363020416e6e756974792077697468647261776c7360301b604082015260600190565b6020808252601a90820152796e6f6d696e6174696f6e2073686f756c6420626520746865726560301b604082015260600190565b60208082526015908201527469642073686f756c6420626520696e2072616e676560581b604082015260600190565b60208082526015908201527463616e6e6f74207769746864726177206561726c7960581b604082015260600190565b6020808252601a90820152791cdd185c9d081cda1bdd5b19081899481899599bdc9948195b9960321b604082015260600190565b6020808252601490820152731d185c99d95d081b9bdd081858da1a595d99481960621b604082015260600190565b6020808252601990820152783137b7b9ba32b91030b63932b0b23c903bb4ba34323930bbb760391b604082015260600190565b60208082526029908201527f596f7520417265206e6f7420416c6c6f77656420746f2074686573652077697460408201526868647261772057455360b81b606082015260800190565b9081526020019056fea264697066735822122091dc56c714e6fce7c80798b1693478061c80e39fde144f7f0e66b537e935b98864736f6c63430007050033";