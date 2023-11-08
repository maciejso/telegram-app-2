
export interface IAlert {
  id: number;
  cryptocurrency: string;
  trigger_type: string;
  trigger_value: number;
  value: number;
  expires_at: string;
}

export interface IAlertListProps {
  alerts: IAlert[];
  setAlerts: React.Dispatch<React.SetStateAction<IAlert[]>>;
  userId: string;
}


