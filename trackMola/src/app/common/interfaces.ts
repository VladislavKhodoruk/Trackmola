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

export interface FireStoreResponce {
  type: string;
}

export enum TypeUser {
  Employee = 'Employee',
  Manager = 'Manager',
  CTO = 'CTO',
  Admin = 'Admin',
}
