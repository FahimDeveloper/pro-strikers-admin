export interface IAddon {
  _id: string;
  sport: string;
  facility: string;
  addons: Array<{
    addon_title: string;
    addon_description: string;
    addon_price: number;
    addon_ini_price: number;
    addon_image: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
