export interface IPortfolioRepository {
  getByWallet(walletID: string, userID: string): Promise<any>
}
