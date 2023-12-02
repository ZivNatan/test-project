export interface ListItem {
    id: number;
    color: string;
    name: string;
    createdDate: string | Date;
    lastUpdate: string | Date;
    createdBy: string;
    description?: string
  }