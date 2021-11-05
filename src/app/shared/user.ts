

export class User {
constructor(
  public id: number,
  public name: string | null,
  public role: string | null,
  public age?: number | null
) {}
}