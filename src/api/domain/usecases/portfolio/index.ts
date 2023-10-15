export interface IPortfolioUsecase {
  getByWallet(walletID: string, userID: string): Promise<any>
}
