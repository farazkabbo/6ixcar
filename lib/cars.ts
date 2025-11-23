export interface CarSpec {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  trim: string;
  province: string;
  listing_price?: number; // optional for valuation
  purchasePrice?: number; // optional for depreciation (falls back to listing/fair price)
}

export const CAR_CATALOG: CarSpec[] = [
  {
    id: 'toyota-rav4-2024',
    make: 'Toyota',
    model: 'RAV4',
    year: 2024,
    mileage: 5000,
    trim: 'XLE',
    province: 'ON',
    listing_price: 38500,
    purchasePrice: 38500,
  },
  {
    id: 'honda-crv-2022',
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    mileage: 35000,
    trim: 'EX',
    province: 'ON',
    listing_price: 28500,
    purchasePrice: 28500,
  },
  {
    id: 'tesla-model3-2023',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    mileage: 12000,
    trim: 'Long Range',
    province: 'BC',
    listing_price: 52000,
    purchasePrice: 52000,
  },
  {
    id: 'ford-f150-2021',
    make: 'Ford',
    model: 'F-150',
    year: 2021,
    mileage: 45000,
    trim: 'XLT',
    province: 'AB',
    listing_price: 43000,
    purchasePrice: 43000,
  },
  {
    id: 'bmw-3series-2022',
    make: 'BMW',
    model: '330i',
    year: 2022,
    mileage: 22000,
    trim: 'xDrive',
    province: 'QC',
    listing_price: 47000,
    purchasePrice: 47000,
  },
  {
    id: 'subaru-outback-2023',
    make: 'Subaru',
    model: 'Outback',
    year: 2023,
    mileage: 15000,
    trim: 'Limited',
    province: 'MB',
    listing_price: 41000,
    purchasePrice: 41000,
  }
];
