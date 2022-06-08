export interface User {
  email: string;
  password: string;
}

interface ProviderData {
  displayName: boolean;
  email: string;
  phoneNumber: boolean;
  photoURL: boolean;
  providerId: string;
  uid: string;
}

export interface AuthorizationResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export interface FireBaseResponse {
  apiKey: string;
  appName: string;
  createdAt: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  providerData: ProviderData[];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  uid: string;
}

export interface UserInfo {
  [key: string]: string;
}

export interface UserFields {
  [key: string]: { stringValue: string };
}

export interface FireStoreResponce {
  createTime: string;
  fields: UserFields;
  name: string;
  updateTime: string;
}
