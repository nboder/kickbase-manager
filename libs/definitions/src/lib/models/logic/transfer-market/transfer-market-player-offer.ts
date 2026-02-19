export class TransferMarketPlayerOffer {
  offer: number;
  offerId: string | undefined;

  constructor(
    currentOffer: number | undefined,
    currentOfferId: string | undefined,
  ) {
    this.offer = currentOffer === undefined ? 0 : currentOffer;
    this.offerId = currentOfferId;
  }

  static noOffer(): TransferMarketPlayerOffer {
    return new TransferMarketPlayerOffer(0, undefined);
  }
}
