export class User {
  constructor(
    public email: string,
    public token: string,
    public localId: string,
    public expirationDate: Date
  ) {}
}
