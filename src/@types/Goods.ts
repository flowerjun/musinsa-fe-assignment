export interface IGoods {
  goodsNo: number;
  goodsName: string;
  price: number;
  brandName: string;
  imageUrl: string;
  linkUrl: string;
  brandLinkUrl: string;
  normalPrice: number;
  isSale: boolean;
  saleRate: number;
  isSoldOut: boolean;
  isExclusive: boolean;
}

export interface IGoodsImage {
  imageUrl: string;
  alt: string;
  linkUrl: string;
  isSoldOut: boolean;
}

export interface IGoodsLabel {
  label: string;
  color: string;
}

export type IGoodsInfo = Omit<IGoods, 'goodsNo' | 'imageUrl' | 'isSoldOut'>;
