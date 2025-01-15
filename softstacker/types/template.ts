export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  targetOS: 'windows' | 'macos' | 'linux';
  apps: App[];
  votes: number;
  createdAt: string;
  updatedAt: string;
}

export interface App {
  name: string;
  description: string;
  website: string;
  category: string;
  subcategory?: string;
  isRequired: boolean;
  chocolateyPackage?: string;
  brewPackage?: string;
  aptPackage?: string;
  dnfPackage?: string;
  pacmanPackage?: string;
}

export interface TemplateResponse {
  template: Template;
  error?: string;
}

export interface TemplatesResponse {
  templates: Template[];
  error?: string;
} 