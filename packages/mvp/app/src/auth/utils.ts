import { generateRandomString, alphabet } from "oslo/crypto";
import { Scrypt } from "oslo/password";

const alphanumeric = alphabet("a-z", "0-9");

/**
 * @see https://oslo.js.org/reference/crypto/generateRandomString 
 */
export function generateId() {
  return generateRandomString(16, alphanumeric);
};

/** 
 * Wraps `node:crypto`.
 * 
 * @see https://oslo.js.org/reference/password/Scrypt/
 * @see https://thecopenhagenbook.com/password-authentication#password-storage
 */
export const scrypt = new Scrypt();
