export interface IHasher {
  hash(textPlain: string, hashSecret: string, salt: number): Promise<string>
  compare(textPlain: string, hash: string): Promise<boolean>
}
