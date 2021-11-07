

export class User {
constructor(
  public id: number | null,
  public name: string | null,
  public password: string | null,
  public email: string | null,
  public age: string | number | null,
  public role: string | null
) {}
}