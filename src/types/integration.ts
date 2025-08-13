export interface Integration {
  id?: number;
  name: string;
  documentType: string;
  cron: string; 
  stageStart: string;
  stageEnd: string;
}