export class AccessToken {
  tokenType: string;
  scope: string;
  expiresIn: string;
  extExpiresIn: string;
  expiresOn: string;
  notBefore: string;
  resource: string;
  accessToken: string;
  refreshToken: string;


  constructor(tokenType: string, scope: string, expiresIn: string, extExpiresIn: string, expiresOn: string,
              notBefore: string, resource: string, accessToken: string, refreshToken: string) {
    this.tokenType = tokenType;
    this.scope = scope;
    this.expiresIn = expiresIn;
    this.extExpiresIn = extExpiresIn;
    this.expiresOn = expiresOn;
    this.notBefore = notBefore;
    this.resource = resource;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
