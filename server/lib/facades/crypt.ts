import { Crypt as CryptUtil } from "~~/server/lib/utils/crypt";

/**
 * Laravel-style Crypt Facade.
 */
export const Crypt = {
  /**
   * Encrypt the given value.
   *
   * @param value - The value to encrypt.
   * @returns The encrypted string.
   */
  encrypt(value: unknown): string {
    return CryptUtil.encrypt(value);
  },

  /**
   * Decrypt the given payload.
   *
   * @param payloadStr - The encrypted payload.
   * @returns The decrypted value.
   */
  decrypt(payloadStr: string): unknown {
    return CryptUtil.decrypt(payloadStr);
  },

  /**
   * Encrypt the given string value without any extra serialization.
   *
   * @param value - The string to encrypt.
   * @returns The encrypted payload.
   */
  encryptString(value: string): string {
    return CryptUtil.encryptString(value);
  },

  /**
   * Decrypt the given payload and return as a string.
   *
   * @param payloadStr - The encrypted payload.
   * @returns The decrypted string.
   */
  decryptString(payloadStr: string): string {
    return CryptUtil.decryptString(payloadStr);
  }
};
export { DecryptException } from "~~/server/lib/utils/crypt";
