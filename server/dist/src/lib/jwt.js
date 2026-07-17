import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET, } from "./constants.js";
import {} from "./types.js";
/**
 * @class Jwt
 * @description A utility class for handling JSON Web Tokens (JWTs).
 * This class provides methods to generate and verify both access and refresh tokens
 * using the 'jsonwebtoken' library. It reads secrets and expiration settings from
 * environment constants.
 */
class Jwt {
    /** @private @readonly The secret key used for signing access tokens. */
    accessTokenSecret;
    /** @private @readonly The secret key used for signing refresh tokens. */
    refreshTokenSecret;
    /** @private @readonly The expiration time for access tokens (e.g., "15m"). */
    accessTokenExpiresIn;
    /** @private @readonly The expiration time for refresh tokens (e.g., "7d"). */
    refreshTokenExpiresIn;
    /**
     * @constructor
     * @description Initializes the Jwt instance by loading secrets and expiration settings
     * from environment variables. It throws an error if the required constants are not set.
     */
    constructor() {
        this.accessTokenSecret = ACCESS_TOKEN_SECRET;
        this.refreshTokenSecret = REFRESH_TOKEN_SECRET;
        this.accessTokenExpiresIn = ACCESS_TOKEN_EXPIRES_IN;
        this.refreshTokenExpiresIn = REFRESH_TOKEN_EXPIRES_IN;
    }
    /**
     * Generates a new refresh token.
     * @public
     * @param {IJWTPayload} payload - The data to include in the token.
     * @returns {string} The generated refresh token.
     */
    generateRefreshToken(payload) {
        return jwt.sign(payload, this.refreshTokenSecret, {
            expiresIn: this.refreshTokenExpiresIn,
        });
    }
    /**
     * Generates a new access token.
     * @public
     * @param {IJWTPayload} payload - The data to include in the token.
     * @returns {string} The generated access token.
     */
    generateAccessToken(payload) {
        return jwt.sign(payload, this.accessTokenSecret, {
            expiresIn: this.accessTokenExpiresIn,
        });
    }
    /**
     * Verifies an access token.
     * @public
     * @param {string} token - The access token to verify.
     * @returns {IJWTPayload} The decoded payload if the token is valid.
     * @throws {jwt.JsonWebTokenError} If the token is invalid or expired.
     */
    verifyAccessToken(token) {
        return jwt.verify(token, this.accessTokenSecret);
    }
    /**
     * Verifies a refresh token.
     * @public
     * @param {string} token - The refresh token to verify.
     * @returns {IJWTPayload} The decoded payload if the token is valid.
     * @throws {jwt.JsonWebTokenError} If the token is invalid or expired.
     */
    verifyRefreshToken(token) {
        return jwt.verify(token, this.refreshTokenSecret);
    }
}
/**
 * A singleton instance of the Jwt class.
 * This instance is exported for use throughout the application to ensure
 * consistent token generation and verification.
 */
export const newJwt = new Jwt();
