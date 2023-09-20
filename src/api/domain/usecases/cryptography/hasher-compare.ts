export interface IHasherCompare {
  compare(textPlain: string, hash: string): Promise<boolean>
}
