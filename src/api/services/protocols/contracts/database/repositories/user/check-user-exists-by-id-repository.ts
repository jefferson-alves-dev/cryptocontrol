export interface ICheckUserExistsByIdRepository {
  check(id: string): Promise<boolean>
}
