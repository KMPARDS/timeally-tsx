/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers';
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from '@ethersproject/contracts';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';

interface TimeAllyStakingInterface extends ethers.utils.Interface {
  functions: {
    'delegate(address,address,uint256,uint256[])': FunctionFragment;
    'endMonth()': FunctionFragment;
    'extend()': FunctionFragment;
    'getDelegation(uint256,uint256)': FunctionFragment;
    'getDelegations(uint256)': FunctionFragment;
    'getIssTimeInterest()': FunctionFragment;
    'getMonthlyReward(uint256)': FunctionFragment;
    'getPrincipalAmount(uint256)': FunctionFragment;
    'getSplitFee(uint256,uint256)': FunctionFragment;
    'getTotalIssTime(bool)': FunctionFragment;
    'hasDelegations()': FunctionFragment;
    'increaseIssTime(uint256)': FunctionFragment;
    'init(address,uint256,uint256,address,address,bool[])': FunctionFragment;
    'isMonthClaimed(uint256)': FunctionFragment;
    'isMonthDelegated(uint256)': FunctionFragment;
    'issTimeLimit()': FunctionFragment;
    'issTimeTakenValue()': FunctionFragment;
    'issTimeTimestamp()': FunctionFragment;
    'lastIssTimeMonth()': FunctionFragment;
    'mergeIn(address)': FunctionFragment;
    'nextMonthPrincipalAmount()': FunctionFragment;
    'nrtManager()': FunctionFragment;
    'owner()': FunctionFragment;
    'prepaidFallback(address,uint256)': FunctionFragment;
    'receiveMerge(address,uint256)': FunctionFragment;
    'reportIssTime()': FunctionFragment;
    'split(uint256)': FunctionFragment;
    'startIssTime(uint256,bool)': FunctionFragment;
    'startMonth()': FunctionFragment;
    'submitIssTime()': FunctionFragment;
    'timeAllyManager()': FunctionFragment;
    'timestamp()': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
    'validatorManager()': FunctionFragment;
    'withdrawMonthlyNRT(uint256[],uint8)': FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: 'delegate',
    values: [string, string, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: 'endMonth', values?: undefined): string;
  encodeFunctionData(functionFragment: 'extend', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getDelegation',
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'getDelegations', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getIssTimeInterest', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMonthlyReward', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getPrincipalAmount', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getSplitFee', values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'getTotalIssTime', values: [boolean]): string;
  encodeFunctionData(functionFragment: 'hasDelegations', values?: undefined): string;
  encodeFunctionData(functionFragment: 'increaseIssTime', values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: 'init',
    values: [string, BigNumberish, BigNumberish, string, string, boolean[]]
  ): string;
  encodeFunctionData(functionFragment: 'isMonthClaimed', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'isMonthDelegated', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'issTimeLimit', values?: undefined): string;
  encodeFunctionData(functionFragment: 'issTimeTakenValue', values?: undefined): string;
  encodeFunctionData(functionFragment: 'issTimeTimestamp', values?: undefined): string;
  encodeFunctionData(functionFragment: 'lastIssTimeMonth', values?: undefined): string;
  encodeFunctionData(functionFragment: 'mergeIn', values: [string]): string;
  encodeFunctionData(functionFragment: 'nextMonthPrincipalAmount', values?: undefined): string;
  encodeFunctionData(functionFragment: 'nrtManager', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'prepaidFallback', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'receiveMerge', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'reportIssTime', values?: undefined): string;
  encodeFunctionData(functionFragment: 'split', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'startIssTime', values: [BigNumberish, boolean]): string;
  encodeFunctionData(functionFragment: 'startMonth', values?: undefined): string;
  encodeFunctionData(functionFragment: 'submitIssTime', values?: undefined): string;
  encodeFunctionData(functionFragment: 'timeAllyManager', values?: undefined): string;
  encodeFunctionData(functionFragment: 'timestamp', values?: undefined): string;
  encodeFunctionData(functionFragment: 'transferOwnership', values: [string]): string;
  encodeFunctionData(functionFragment: 'validatorManager', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'withdrawMonthlyNRT',
    values: [BigNumberish[], BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: 'delegate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'endMonth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'extend', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getDelegation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getDelegations', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getIssTimeInterest', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMonthlyReward', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPrincipalAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSplitFee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTotalIssTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'hasDelegations', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'increaseIssTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'init', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isMonthClaimed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isMonthDelegated', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'issTimeLimit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'issTimeTakenValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'issTimeTimestamp', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lastIssTimeMonth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mergeIn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nextMonthPrincipalAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nrtManager', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'prepaidFallback', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'receiveMerge', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'reportIssTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'split', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'startIssTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'startMonth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'submitIssTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'timeAllyManager', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'timestamp', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'validatorManager', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawMonthlyNRT', data: BytesLike): Result;

  events: {
    'Claim(uint256,uint256,uint8)': EventFragment;
    'Delegate(uint256,address,address,uint256)': EventFragment;
    'Topup(uint256,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Claim'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Delegate'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Topup'): EventFragment;
}

export class TimeAllyStaking extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: TimeAllyStakingInterface;

  functions: {
    delegate(
      _platform: string,
      _delegatee: string,
      _amount: BigNumberish,
      _months: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    endMonth(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    extend(overrides?: Overrides): Promise<ContractTransaction>;

    getDelegation(
      _month: BigNumberish,
      _delegationIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: {
        platform: string;
        delegatee: string;
        amount: BigNumber;
        0: string;
        1: string;
        2: BigNumber;
      };
    }>;

    getDelegations(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: {
        platform: string;
        delegatee: string;
        amount: BigNumber;
        0: string;
        1: string;
        2: BigNumber;
      }[];
    }>;

    getIssTimeInterest(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getMonthlyReward(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getPrincipalAmount(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getSplitFee(
      _value: BigNumberish,
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getTotalIssTime(
      _destroy: boolean,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    hasDelegations(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    increaseIssTime(
      _increaseValue: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    init(
      _owner: string,
      _defaultMonths: BigNumberish,
      _initialIssTimeLimit: BigNumberish,
      _nrtManager: string,
      _validatorManager: string,
      _claimedMonths: boolean[],
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    isMonthClaimed(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    isMonthDelegated(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    issTimeLimit(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    issTimeTakenValue(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    issTimeTimestamp(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    lastIssTimeMonth(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    mergeIn(_masterStaking: string, overrides?: Overrides): Promise<ContractTransaction>;

    nextMonthPrincipalAmount(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    nrtManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    prepaidFallback(
      arg0: string,
      _value: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    receiveMerge(
      _childOwner: string,
      _childIssTimeLimit: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    reportIssTime(overrides?: Overrides): Promise<ContractTransaction>;

    split(_value: BigNumberish, overrides?: PayableOverrides): Promise<ContractTransaction>;

    startIssTime(
      _value: BigNumberish,
      _destroy: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    startMonth(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    submitIssTime(overrides?: PayableOverrides): Promise<ContractTransaction>;

    timeAllyManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    timestamp(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    transferOwnership(_newOwner: string, overrides?: Overrides): Promise<ContractTransaction>;

    validatorManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    withdrawMonthlyNRT(
      _months: BigNumberish[],
      _rewardType: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  delegate(
    _platform: string,
    _delegatee: string,
    _amount: BigNumberish,
    _months: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  endMonth(overrides?: CallOverrides): Promise<BigNumber>;

  extend(overrides?: Overrides): Promise<ContractTransaction>;

  getDelegation(
    _month: BigNumberish,
    _delegationIndex: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    platform: string;
    delegatee: string;
    amount: BigNumber;
    0: string;
    1: string;
    2: BigNumber;
  }>;

  getDelegations(
    _month: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    {
      platform: string;
      delegatee: string;
      amount: BigNumber;
      0: string;
      1: string;
      2: BigNumber;
    }[]
  >;

  getIssTimeInterest(overrides?: CallOverrides): Promise<BigNumber>;

  getMonthlyReward(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getPrincipalAmount(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getSplitFee(
    _value: BigNumberish,
    _month: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTotalIssTime(_destroy: boolean, overrides?: CallOverrides): Promise<BigNumber>;

  hasDelegations(overrides?: CallOverrides): Promise<boolean>;

  increaseIssTime(
    _increaseValue: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  init(
    _owner: string,
    _defaultMonths: BigNumberish,
    _initialIssTimeLimit: BigNumberish,
    _nrtManager: string,
    _validatorManager: string,
    _claimedMonths: boolean[],
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  isMonthClaimed(_month: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  isMonthDelegated(_month: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  issTimeLimit(overrides?: CallOverrides): Promise<BigNumber>;

  issTimeTakenValue(overrides?: CallOverrides): Promise<BigNumber>;

  issTimeTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  lastIssTimeMonth(overrides?: CallOverrides): Promise<BigNumber>;

  mergeIn(_masterStaking: string, overrides?: Overrides): Promise<ContractTransaction>;

  nextMonthPrincipalAmount(overrides?: CallOverrides): Promise<BigNumber>;

  nrtManager(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  prepaidFallback(
    arg0: string,
    _value: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  receiveMerge(
    _childOwner: string,
    _childIssTimeLimit: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  reportIssTime(overrides?: Overrides): Promise<ContractTransaction>;

  split(_value: BigNumberish, overrides?: PayableOverrides): Promise<ContractTransaction>;

  startIssTime(
    _value: BigNumberish,
    _destroy: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  startMonth(overrides?: CallOverrides): Promise<BigNumber>;

  submitIssTime(overrides?: PayableOverrides): Promise<ContractTransaction>;

  timeAllyManager(overrides?: CallOverrides): Promise<string>;

  timestamp(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(_newOwner: string, overrides?: Overrides): Promise<ContractTransaction>;

  validatorManager(overrides?: CallOverrides): Promise<string>;

  withdrawMonthlyNRT(
    _months: BigNumberish[],
    _rewardType: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    delegate(
      _platform: string,
      _delegatee: string,
      _amount: BigNumberish,
      _months: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    endMonth(overrides?: CallOverrides): Promise<BigNumber>;

    extend(overrides?: CallOverrides): Promise<void>;

    getDelegation(
      _month: BigNumberish,
      _delegationIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      platform: string;
      delegatee: string;
      amount: BigNumber;
      0: string;
      1: string;
      2: BigNumber;
    }>;

    getDelegations(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      {
        platform: string;
        delegatee: string;
        amount: BigNumber;
        0: string;
        1: string;
        2: BigNumber;
      }[]
    >;

    getIssTimeInterest(overrides?: CallOverrides): Promise<BigNumber>;

    getMonthlyReward(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPrincipalAmount(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getSplitFee(
      _value: BigNumberish,
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalIssTime(_destroy: boolean, overrides?: CallOverrides): Promise<BigNumber>;

    hasDelegations(overrides?: CallOverrides): Promise<boolean>;

    increaseIssTime(_increaseValue: BigNumberish, overrides?: CallOverrides): Promise<void>;

    init(
      _owner: string,
      _defaultMonths: BigNumberish,
      _initialIssTimeLimit: BigNumberish,
      _nrtManager: string,
      _validatorManager: string,
      _claimedMonths: boolean[],
      overrides?: CallOverrides
    ): Promise<void>;

    isMonthClaimed(_month: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    isMonthDelegated(_month: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    issTimeLimit(overrides?: CallOverrides): Promise<BigNumber>;

    issTimeTakenValue(overrides?: CallOverrides): Promise<BigNumber>;

    issTimeTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    lastIssTimeMonth(overrides?: CallOverrides): Promise<BigNumber>;

    mergeIn(_masterStaking: string, overrides?: CallOverrides): Promise<void>;

    nextMonthPrincipalAmount(overrides?: CallOverrides): Promise<BigNumber>;

    nrtManager(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    prepaidFallback(
      arg0: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    receiveMerge(
      _childOwner: string,
      _childIssTimeLimit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    reportIssTime(overrides?: CallOverrides): Promise<void>;

    split(_value: BigNumberish, overrides?: CallOverrides): Promise<void>;

    startIssTime(_value: BigNumberish, _destroy: boolean, overrides?: CallOverrides): Promise<void>;

    startMonth(overrides?: CallOverrides): Promise<BigNumber>;

    submitIssTime(overrides?: CallOverrides): Promise<void>;

    timeAllyManager(overrides?: CallOverrides): Promise<string>;

    timestamp(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(_newOwner: string, overrides?: CallOverrides): Promise<void>;

    validatorManager(overrides?: CallOverrides): Promise<string>;

    withdrawMonthlyNRT(
      _months: BigNumberish[],
      _rewardType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Claim(month: null, amount: null, rewardType: null): EventFilter;

    Delegate(
      month: BigNumberish | null,
      platform: string | null,
      delegatee: string | null,
      amount: null
    ): EventFilter;

    Topup(amount: null, benefactor: null): EventFilter;
  };

  estimateGas: {
    delegate(
      _platform: string,
      _delegatee: string,
      _amount: BigNumberish,
      _months: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    endMonth(overrides?: CallOverrides): Promise<BigNumber>;

    extend(overrides?: Overrides): Promise<BigNumber>;

    getDelegation(
      _month: BigNumberish,
      _delegationIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDelegations(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getIssTimeInterest(overrides?: CallOverrides): Promise<BigNumber>;

    getMonthlyReward(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getPrincipalAmount(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getSplitFee(
      _value: BigNumberish,
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalIssTime(_destroy: boolean, overrides?: CallOverrides): Promise<BigNumber>;

    hasDelegations(overrides?: CallOverrides): Promise<BigNumber>;

    increaseIssTime(_increaseValue: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    init(
      _owner: string,
      _defaultMonths: BigNumberish,
      _initialIssTimeLimit: BigNumberish,
      _nrtManager: string,
      _validatorManager: string,
      _claimedMonths: boolean[],
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    isMonthClaimed(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    isMonthDelegated(_month: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    issTimeLimit(overrides?: CallOverrides): Promise<BigNumber>;

    issTimeTakenValue(overrides?: CallOverrides): Promise<BigNumber>;

    issTimeTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    lastIssTimeMonth(overrides?: CallOverrides): Promise<BigNumber>;

    mergeIn(_masterStaking: string, overrides?: Overrides): Promise<BigNumber>;

    nextMonthPrincipalAmount(overrides?: CallOverrides): Promise<BigNumber>;

    nrtManager(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    prepaidFallback(arg0: string, _value: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    receiveMerge(
      _childOwner: string,
      _childIssTimeLimit: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    reportIssTime(overrides?: Overrides): Promise<BigNumber>;

    split(_value: BigNumberish, overrides?: PayableOverrides): Promise<BigNumber>;

    startIssTime(
      _value: BigNumberish,
      _destroy: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    startMonth(overrides?: CallOverrides): Promise<BigNumber>;

    submitIssTime(overrides?: PayableOverrides): Promise<BigNumber>;

    timeAllyManager(overrides?: CallOverrides): Promise<BigNumber>;

    timestamp(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(_newOwner: string, overrides?: Overrides): Promise<BigNumber>;

    validatorManager(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawMonthlyNRT(
      _months: BigNumberish[],
      _rewardType: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    delegate(
      _platform: string,
      _delegatee: string,
      _amount: BigNumberish,
      _months: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    endMonth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    extend(overrides?: Overrides): Promise<PopulatedTransaction>;

    getDelegation(
      _month: BigNumberish,
      _delegationIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDelegations(_month: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getIssTimeInterest(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMonthlyReward(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPrincipalAmount(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSplitFee(
      _value: BigNumberish,
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalIssTime(_destroy: boolean, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hasDelegations(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    increaseIssTime(
      _increaseValue: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    init(
      _owner: string,
      _defaultMonths: BigNumberish,
      _initialIssTimeLimit: BigNumberish,
      _nrtManager: string,
      _validatorManager: string,
      _claimedMonths: boolean[],
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    isMonthClaimed(_month: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isMonthDelegated(
      _month: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    issTimeLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    issTimeTakenValue(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    issTimeTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastIssTimeMonth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mergeIn(_masterStaking: string, overrides?: Overrides): Promise<PopulatedTransaction>;

    nextMonthPrincipalAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nrtManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    prepaidFallback(
      arg0: string,
      _value: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    receiveMerge(
      _childOwner: string,
      _childIssTimeLimit: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    reportIssTime(overrides?: Overrides): Promise<PopulatedTransaction>;

    split(_value: BigNumberish, overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    startIssTime(
      _value: BigNumberish,
      _destroy: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    startMonth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    submitIssTime(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    timeAllyManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    timestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(_newOwner: string, overrides?: Overrides): Promise<PopulatedTransaction>;

    validatorManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawMonthlyNRT(
      _months: BigNumberish[],
      _rewardType: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
