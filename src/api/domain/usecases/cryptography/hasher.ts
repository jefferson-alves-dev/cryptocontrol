export interface IHasher {
  compare(textPlain: string, hash: string): Promise<boolean>
  hash(textPlain: string): Promise<string>
}
