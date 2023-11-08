import { ICryptoPrice } from "./Price";

export interface IAlert {
  id: number | undefined
  cryptocurrency: string;
  base_value: number,
  trigger_type: string;
  trigger_value: number;
  value: number;
  expires_at: string;
}

export interface IAlertListProps {
  alerts: IAlert[];
  setAlerts: React.Dispatch<React.SetStateAction<IAlert[]>>;
  userId: string;
  cryptoPrices: ICryptoPrice[]; 
}

