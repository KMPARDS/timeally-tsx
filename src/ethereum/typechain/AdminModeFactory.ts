/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import { Contract, ContractFactory, Overrides } from '@ethersproject/contracts';

import { AdminMode } from './AdminMode';

export class AdminModeFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<AdminMode> {
    return super.deploy(overrides || {}) as Promise<AdminMode>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AdminMode {
    return super.attach(address) as AdminMode;
  }
  connect(signer: Signer): AdminModeFactory {
    return super.connect(signer) as AdminModeFactory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): AdminMode {
    return new Contract(address, _abi, signerOrProvider) as AdminMode;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'isAdminMode',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceAdminMode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const _bytecode =
  '0x60806040526000805460ff60a01b1916600160a01b17905534801561002357600080fd5b50600061002e61007d565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350610081565b3390565b61044e806100906000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80638da5cb5b116100505780638da5cb5b1461007e578063b5955eed146100af578063f2fde38b146100cb57610067565b806351b199fb1461006c578063715018a614610076575b600080fd5b6100746100fe565b005b61007461020e565b61008661025b565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6100b7610277565b604080519115158252519081900360200190f35b610074600480360360208110156100e157600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610298565b60005474010000000000000000000000000000000000000000900460ff1661016d576040805162461bcd60e51b815260206004820152601e60248201527f41646d696e4d6f64653a2041444d494e5f4d4f44455f494e4143544956450000604482015290519081900360640190fd5b6101756103ee565b60005473ffffffffffffffffffffffffffffffffffffffff9081169116146101e4576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff169055565b6040805162461bcd60e51b815260206004820152601c60248201527f4552433137333a2052454e4f554e43455f4e4f545f414c4c4f57454400000000604482015290519081900360640190fd5b60005473ffffffffffffffffffffffffffffffffffffffff1690565b60005474010000000000000000000000000000000000000000900460ff1690565b6102a06103ee565b60005473ffffffffffffffffffffffffffffffffffffffff90811691161461030f576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff81166103615760405162461bcd60e51b81526004018080602001828103825260268152602001806103f36026913960400191505060405180910390fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b339056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a2646970667358221220eb732901da711be89c367c6a99fd2dddc45358209ac67b0a5c3d916a85c00a4664736f6c63430007010033';