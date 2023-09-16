export interface IHasher {
  hash(textPlain: string): Promise<string>
}
