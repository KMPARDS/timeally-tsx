/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface DistributeIncentiveInterface extends ethers.utils.Interface {
  functions: {
    "Admin(address)": FunctionFragment;
    "addFund()": FunctionFragment;
    "dayswappers()": FunctionFragment;
    "getFund()": FunctionFragment;
    "kycDapp()": FunctionFragment;
    "nrtManager()": FunctionFragment;
    "owner()": FunctionFragment;
    "prepaidEs()": FunctionFragment;
    "randomnessManager()": FunctionFragment;
    "removeAdmin(address)": FunctionFragment;
    "resolveAddress(bytes32)": FunctionFragment;
    "resolveAddressStrict(bytes32)": FunctionFragment;
    "resolveUsername(address)": FunctionFragment;
    "resolveUsernameStrict(address)": FunctionFragment;
    "sendIncentive(address,address,uint256,uint256)": FunctionFragment;
    "setAdmin(address)": FunctionFragment;
    "setKycDapp(address)": FunctionFragment;
    "timeallyClub()": FunctionFragment;
    "timeallyManager()": FunctionFragment;
    "timeallyPromotionalBucket()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "validatorManager()": FunctionFragment;
    "withdrawFund()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "Admin", values: [string]): string;
  encodeFunctionData(functionFragment: "addFund", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "dayswappers",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getFund", values?: undefined): string;
  encodeFunctionData(functionFragment: "kycDapp", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nrtManager",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "prepaidEs", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "randomnessManager",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "removeAdmin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "resolveAddress",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "resolveAddressStrict",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "resolveUsername",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "resolveUsernameStrict",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "sendIncentive",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setAdmin", values: [string]): string;
  encodeFunctionData(functionFragment: "setKycDapp", values: [string]): string;
  encodeFunctionData(
    functionFragment: "timeallyClub",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timeallyManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timeallyPromotionalBucket",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "validatorManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFund",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "Admin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addFund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "dayswappers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFund", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "kycDapp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nrtManager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "prepaidEs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "randomnessManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolveAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolveAddressStrict",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolveUsername",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolveUsernameStrict",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAdmin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setKycDapp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "timeallyClub",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timeallyManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timeallyPromotionalBucket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validatorManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFund",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "SendIncentive(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SendIncentive"): EventFragment;
}

export class DistributeIncentive extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: DistributeIncentiveInterface;

  functions: {
    Admin(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "Admin(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    addFund(overrides?: PayableOverrides): Promise<ContractTransaction>;

    "addFund()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

    dayswappers(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "dayswappers()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getFund(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getFund()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    kycDapp(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "kycDapp()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    nrtManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "nrtManager()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Returns the address of the current owner.
     */
    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Returns the address of the current owner.
     */
    "owner()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    prepaidEs(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "prepaidEs()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    randomnessManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "randomnessManager()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    removeAdmin(
      user: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "removeAdmin(address)"(
      user: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    resolveAddress(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "resolveAddress(bytes32)"(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    resolveAddressStrict(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "resolveAddressStrict(bytes32)"(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    resolveUsername(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "resolveUsername(address)"(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    resolveUsernameStrict(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "resolveUsernameStrict(address)"(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    sendIncentive(
      _seller: string,
      _buyer: string,
      _value: BigNumberish,
      _incentivefortxn: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "sendIncentive(address,address,uint256,uint256)"(
      _seller: string,
      _buyer: string,
      _value: BigNumberish,
      _incentivefortxn: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    setAdmin(user: string, overrides?: Overrides): Promise<ContractTransaction>;

    "setAdmin(address)"(
      user: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setKycDapp(
      _kycDapp: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setKycDapp(address)"(
      _kycDapp: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    timeallyClub(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "timeallyClub()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    timeallyManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "timeallyManager()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    timeallyPromotionalBucket(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "timeallyPromotionalBucket()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    validatorManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "validatorManager()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    withdrawFund(overrides?: PayableOverrides): Promise<ContractTransaction>;

    "withdrawFund()"(
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;
  };

  Admin(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  "Admin(address)"(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  addFund(overrides?: PayableOverrides): Promise<ContractTransaction>;

  "addFund()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

  dayswappers(overrides?: CallOverrides): Promise<string>;

  "dayswappers()"(overrides?: CallOverrides): Promise<string>;

  getFund(overrides?: CallOverrides): Promise<BigNumber>;

  "getFund()"(overrides?: CallOverrides): Promise<BigNumber>;

  kycDapp(overrides?: CallOverrides): Promise<string>;

  "kycDapp()"(overrides?: CallOverrides): Promise<string>;

  nrtManager(overrides?: CallOverrides): Promise<string>;

  "nrtManager()"(overrides?: CallOverrides): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  owner(overrides?: CallOverrides): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  "owner()"(overrides?: CallOverrides): Promise<string>;

  prepaidEs(overrides?: CallOverrides): Promise<string>;

  "prepaidEs()"(overrides?: CallOverrides): Promise<string>;

  randomnessManager(overrides?: CallOverrides): Promise<string>;

  "randomnessManager()"(overrides?: CallOverrides): Promise<string>;

  removeAdmin(
    user: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "removeAdmin(address)"(
    user: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  resolveAddress(
    _username: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "resolveAddress(bytes32)"(
    _username: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  resolveAddressStrict(
    _username: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "resolveAddressStrict(bytes32)"(
    _username: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  resolveUsername(_wallet: string, overrides?: CallOverrides): Promise<string>;

  "resolveUsername(address)"(
    _wallet: string,
    overrides?: CallOverrides
  ): Promise<string>;

  resolveUsernameStrict(
    _wallet: string,
    overrides?: CallOverrides
  ): Promise<string>;

  "resolveUsernameStrict(address)"(
    _wallet: string,
    overrides?: CallOverrides
  ): Promise<string>;

  sendIncentive(
    _seller: string,
    _buyer: string,
    _value: BigNumberish,
    _incentivefortxn: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "sendIncentive(address,address,uint256,uint256)"(
    _seller: string,
    _buyer: string,
    _value: BigNumberish,
    _incentivefortxn: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  setAdmin(user: string, overrides?: Overrides): Promise<ContractTransaction>;

  "setAdmin(address)"(
    user: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setKycDapp(
    _kycDapp: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setKycDapp(address)"(
    _kycDapp: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  timeallyClub(overrides?: CallOverrides): Promise<string>;

  "timeallyClub()"(overrides?: CallOverrides): Promise<string>;

  timeallyManager(overrides?: CallOverrides): Promise<string>;

  "timeallyManager()"(overrides?: CallOverrides): Promise<string>;

  timeallyPromotionalBucket(overrides?: CallOverrides): Promise<string>;

  "timeallyPromotionalBucket()"(overrides?: CallOverrides): Promise<string>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  validatorManager(overrides?: CallOverrides): Promise<string>;

  "validatorManager()"(overrides?: CallOverrides): Promise<string>;

  withdrawFund(overrides?: PayableOverrides): Promise<ContractTransaction>;

  "withdrawFund()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

  callStatic: {
    Admin(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    "Admin(address)"(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    addFund(overrides?: CallOverrides): Promise<void>;

    "addFund()"(overrides?: CallOverrides): Promise<void>;

    dayswappers(overrides?: CallOverrides): Promise<string>;

    "dayswappers()"(overrides?: CallOverrides): Promise<string>;

    getFund(overrides?: CallOverrides): Promise<BigNumber>;

    "getFund()"(overrides?: CallOverrides): Promise<BigNumber>;

    kycDapp(overrides?: CallOverrides): Promise<string>;

    "kycDapp()"(overrides?: CallOverrides): Promise<string>;

    nrtManager(overrides?: CallOverrides): Promise<string>;

    "nrtManager()"(overrides?: CallOverrides): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    "owner()"(overrides?: CallOverrides): Promise<string>;

    prepaidEs(overrides?: CallOverrides): Promise<string>;

    "prepaidEs()"(overrides?: CallOverrides): Promise<string>;

    randomnessManager(overrides?: CallOverrides): Promise<string>;

    "randomnessManager()"(overrides?: CallOverrides): Promise<string>;

    removeAdmin(user: string, overrides?: CallOverrides): Promise<void>;

    "removeAdmin(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<void>;

    resolveAddress(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "resolveAddress(bytes32)"(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    resolveAddressStrict(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "resolveAddressStrict(bytes32)"(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    resolveUsername(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "resolveUsername(address)"(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<string>;

    resolveUsernameStrict(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "resolveUsernameStrict(address)"(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<string>;

    sendIncentive(
      _seller: string,
      _buyer: string,
      _value: BigNumberish,
      _incentivefortxn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "sendIncentive(address,address,uint256,uint256)"(
      _seller: string,
      _buyer: string,
      _value: BigNumberish,
      _incentivefortxn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setAdmin(user: string, overrides?: CallOverrides): Promise<void>;

    "setAdmin(address)"(user: string, overrides?: CallOverrides): Promise<void>;

    setKycDapp(_kycDapp: string, overrides?: CallOverrides): Promise<void>;

    "setKycDapp(address)"(
      _kycDapp: string,
      overrides?: CallOverrides
    ): Promise<void>;

    timeallyClub(overrides?: CallOverrides): Promise<string>;

    "timeallyClub()"(overrides?: CallOverrides): Promise<string>;

    timeallyManager(overrides?: CallOverrides): Promise<string>;

    "timeallyManager()"(overrides?: CallOverrides): Promise<string>;

    timeallyPromotionalBucket(overrides?: CallOverrides): Promise<string>;

    "timeallyPromotionalBucket()"(overrides?: CallOverrides): Promise<string>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    validatorManager(overrides?: CallOverrides): Promise<string>;

    "validatorManager()"(overrides?: CallOverrides): Promise<string>;

    withdrawFund(overrides?: CallOverrides): Promise<void>;

    "withdrawFund()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    SendIncentive(Seller: null, Buyer: null, Value: null): EventFilter;
  };

  estimateGas: {
    Admin(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "Admin(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addFund(overrides?: PayableOverrides): Promise<BigNumber>;

    "addFund()"(overrides?: PayableOverrides): Promise<BigNumber>;

    dayswappers(overrides?: CallOverrides): Promise<BigNumber>;

    "dayswappers()"(overrides?: CallOverrides): Promise<BigNumber>;

    getFund(overrides?: CallOverrides): Promise<BigNumber>;

    "getFund()"(overrides?: CallOverrides): Promise<BigNumber>;

    kycDapp(overrides?: CallOverrides): Promise<BigNumber>;

    "kycDapp()"(overrides?: CallOverrides): Promise<BigNumber>;

    nrtManager(overrides?: CallOverrides): Promise<BigNumber>;

    "nrtManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    prepaidEs(overrides?: CallOverrides): Promise<BigNumber>;

    "prepaidEs()"(overrides?: CallOverrides): Promise<BigNumber>;

    randomnessManager(overrides?: CallOverrides): Promise<BigNumber>;

    "randomnessManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    removeAdmin(user: string, overrides?: Overrides): Promise<BigNumber>;

    "removeAdmin(address)"(
      user: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    resolveAddress(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "resolveAddress(bytes32)"(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    resolveAddressStrict(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "resolveAddressStrict(bytes32)"(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    resolveUsername(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "resolveUsername(address)"(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    resolveUsernameStrict(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "resolveUsernameStrict(address)"(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendIncentive(
      _seller: string,
      _buyer: string,
      _value: BigNumberish,
      _incentivefortxn: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "sendIncentive(address,address,uint256,uint256)"(
      _seller: string,
      _buyer: string,
      _value: BigNumberish,
      _incentivefortxn: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    setAdmin(user: string, overrides?: Overrides): Promise<BigNumber>;

    "setAdmin(address)"(
      user: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setKycDapp(_kycDapp: string, overrides?: Overrides): Promise<BigNumber>;

    "setKycDapp(address)"(
      _kycDapp: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    timeallyClub(overrides?: CallOverrides): Promise<BigNumber>;

    "timeallyClub()"(overrides?: CallOverrides): Promise<BigNumber>;

    timeallyManager(overrides?: CallOverrides): Promise<BigNumber>;

    "timeallyManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    timeallyPromotionalBucket(overrides?: CallOverrides): Promise<BigNumber>;

    "timeallyPromotionalBucket()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    validatorManager(overrides?: CallOverrides): Promise<BigNumber>;

    "validatorManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawFund(overrides?: PayableOverrides): Promise<BigNumber>;

    "withdrawFund()"(overrides?: PayableOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    Admin(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "Admin(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addFund(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    "addFund()"(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    dayswappers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "dayswappers()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFund(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getFund()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    kycDapp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "kycDapp()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nrtManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "nrtManager()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current owner.
     */
    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    prepaidEs(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "prepaidEs()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    randomnessManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "randomnessManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeAdmin(
      user: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "removeAdmin(address)"(
      user: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    resolveAddress(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "resolveAddress(bytes32)"(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resolveAddressStrict(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "resolveAddressStrict(bytes32)"(
      _username: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resolveUsername(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "resolveUsername(address)"(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resolveUsernameStrict(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "resolveUsernameStrict(address)"(
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sendIncentive(
      _seller: string,
      _buyer: string,
      _value: BigNumberish,
      _incentivefortxn: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "sendIncentive(address,address,uint256,uint256)"(
      _seller: string,
      _buyer: string,
      _value: BigNumberish,
      _incentivefortxn: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    setAdmin(
      user: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setAdmin(address)"(
      user: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setKycDapp(
      _kycDapp: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setKycDapp(address)"(
      _kycDapp: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    timeallyClub(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "timeallyClub()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    timeallyManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "timeallyManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    timeallyPromotionalBucket(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "timeallyPromotionalBucket()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    validatorManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "validatorManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawFund(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    "withdrawFund()"(
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;
  };
}
