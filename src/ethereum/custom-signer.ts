import { ethers, version } from 'ethers';
import { Deferrable, resolveProperties } from '@ethersproject/properties';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ExternallyOwnedAccount } from '@ethersproject/abstract-signer';

import { Logger } from '@ethersproject/logger';
const logger = new Logger(version);

export class CustomSigner extends ethers.Wallet {
  constructor(
    privateKey:
      | string
      | ethers.utils.Bytes
      | ExternallyOwnedAccount
      | ethers.utils.SigningKey,
    provider: ethers.providers.JsonRpcProvider
  ) {
    super(privateKey, provider);
  }

  async populateTransaction(
    transaction: Deferrable<TransactionRequest>
  ): Promise<TransactionRequest> {
    const tx: Deferrable<TransactionRequest> = await resolveProperties(
      this.checkTransaction(transaction)
    );

    if (tx.gasLimit == null) {
      tx.gasLimit = this.estimateGas(tx).catch(async (error) => {
        const { from, to, data, value } = tx;

        // @ts-ignore send is only available on JsonRpcProvider
        if (this.provider.send) {
          // @ts-ignore
          const result = await this.provider.send('trace_call', [
            { from, to: await to, data, value },
            ['vMtrace'],
          ]);

          if (result?.output) {
            const i = new ethers.utils.Interface(['function Error(string)']);
            return logger.throwError(
              i.decodeFunctionData('Error', result.output)[0],
              Logger.errors.CALL_EXCEPTION
            );
          }
        }

        return logger.throwError(
          'cannot estimate gas; transaction may fail or may require manual gas limit',
          Logger.errors.UNPREDICTABLE_GAS_LIMIT,
          {
            error: error,
            tx: tx,
          }
        );
      });
    }

    return await super.populateTransaction(tx);
  }
}
