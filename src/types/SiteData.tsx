export interface PluginsList {
  name: string;
  version: string;
  updateAvailable: boolean;
  newVersion: string;
}

export interface Version {
  php: string;
  wp: string;
}

export interface SiteDataOK {
  name: string;
  marker: string;
  IP: string;
  date: number;
  phpVersion: string;
  wpVersion: string;
  admin: string;
  wpUrl: string;
  plugins: PluginsList[];
}

export interface SiteDataError {
  error: string;
}

export type SiteData = SiteDataOK | SiteDataError;