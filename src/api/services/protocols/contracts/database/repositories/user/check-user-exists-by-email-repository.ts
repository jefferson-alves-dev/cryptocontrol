export interface ICheckUserExistsByEmailRepository {
  check(email: string): Promise<boolean>
}
