export interface PriceTable {
  id: number;
  code: string;
  fromDate: Date;
  toDate: Date;
  name: string;
  details: PriceTableDetail[];
  priceTable_TableSection_Detail: PriceTableTableSectionDetail[];
  priceTable_Tenant_Detail: PriceTableTenantDetail[];
}

export interface PriceTableDetail {
  id: number;
  priceTableId: number;
  productCode: number;
  discount: number;
  price: number;
}

export interface PriceTableTableSectionDetail {
  id: number;
  priceTableId: number;
  tableSectionId: number;
}

export interface PriceTableTenantDetail {
  id: number;
  priceTableId: number;
  tenantId: number;
}
