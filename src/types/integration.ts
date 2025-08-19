export interface Integration {
  id?: number;
  name: string;
  documentType: string;

  everyMinutes: number;

  stageStart: string;
  stageEnd: string;
  color?: string;
}