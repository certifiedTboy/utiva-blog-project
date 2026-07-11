import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} from "./constants.ts";
import { type IJWTPayload } from "./types.ts";

export class Jwt {
  private readonly accessTokenSecret: jwt.PrivateKey | jwt.Secret;
  private readonly refreshTokenSecret: jwt.PrivateKey | jwt.Secret;
  private readonly accessTokenExpiresIn: string;
  private readonly refreshTokenExpiresIn: string;

  constructor() {
    this.accessTokenSecret = ACCESS_TOKEN_SECRET!;
    this.refreshTokenSecret = REFRESH_TOKEN_SECRET!;
    this.accessTokenExpiresIn = ACCESS_TOKEN_EXPIRES_IN!;
    this.refreshTokenExpiresIn = REFRESH_TOKEN_EXPIRES_IN!;
  }

  public generateRefreshToken(payload: IJWTPayload): string {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiresIn,
    } as unknown as jwt.SignOptions);
  }

  public generateAccessToken(payload: IJWTPayload): string {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiresIn,
    } as unknown as jwt.SignOptions);
  }

  public verifyAccessToken(token: string): IJWTPayload {
    return jwt.verify(
      token,
      this.accessTokenSecret as jwt.Secret,
    ) as unknown as IJWTPayload;
  }

  public verifyRefreshToken(token: string): IJWTPayload {
    return jwt.verify(
      token,
      this.refreshTokenSecret as jwt.Secret,
    ) as unknown as IJWTPayload;
  }
}
