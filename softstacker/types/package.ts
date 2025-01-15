export interface PackageInfo {
  name: string;
  description: string;
  version?: string;
  downloads?: number;
  website?: string;
  aptPackage?: string;
  dnfPackage?: string;
  pacmanPackage?: string;
  brewPackage?: string;
  chocolateyPackage?: string;
}

export interface WindowsPackage {
  Title: string;
  Id: string;
  Description: string;
  Version: string;
  DownloadCount: number;
  ProjectUrl: string;
}

export interface MacPackage {
  name: string;
  desc: string;
  versions: {
    stable: string;
  };
  homepage: string;
  full_name: string;
  tap: string;
}

export interface LinuxPackage {
  name: string;
  description: string;
  version: string;
  website: string;
  aptPackage?: string;
  dnfPackage?: string;
  pacmanPackage?: string;
}

export interface AURPackage {
  Name: string;
  Description: string;
  Version: string;
  URL?: string;
} 