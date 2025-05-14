export type PrimaryProductInfo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type ProductInfo = PrimaryProductInfo & {
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  price: number;
  rating: number;
  reviewCount: number;
  quantity?: number;
};

export type ProductModalData = {
  isModalOpen: boolean;
  openedCameraId: null | number;
};

export type ProductTabOption = {
  tab: 'characteristics' | 'description';
};
