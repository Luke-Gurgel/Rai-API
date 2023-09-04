export interface MaterialCategoryTable {
  materialCategoryId: number;
  name: string;
}

export interface Material {
  materialId: number;
  categoryId: number;
  name: string;
  minQuantity: number;
  grupoQuimico: string;
  principioAtivo: string;
}

export interface MaterialInventory {
  materialInventoryId: number;
  materialId: number;
  lote: string;
  expDate: string;
  quantity: number;
  purchaseDate: string;
  price: number;
}
