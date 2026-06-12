export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

export interface CountryCurrency {
  name: string;
  symbol?: string;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryCoatOfArms {
  png?: string;
  svg?: string;
}

export interface CountryMaps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Country {
  name: CountryName;
  cca3: string;
  cca2?: string;
  flags: CountryFlags;
  coatOfArms?: CountryCoatOfArms;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  currencies?: {
    [key: string]: CountryCurrency;
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  tld?: string[];
  maps?: CountryMaps;
  gini?: {
    [key: string]: number;
  };
  car?: {
    signs?: string[];
    side: string;
  };
  timezones?: string[];
  latlng?: [number, number];
}

export type Region = 'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic';

export type SortKey = 'name-asc' | 'name-desc' | 'population-desc' | 'population-asc' | 'area-desc' | 'area-asc';
