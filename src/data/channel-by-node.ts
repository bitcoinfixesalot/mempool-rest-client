export interface LightningNode {
  alias: string;
  public_key: string;
  channels: number;
  capacity: string;
}

export interface LightningChannel {
  status: number;
  closing_reason: string | null;
  closing_date: string | null;
  capacity: number;
  short_id: string;
  id: string;
  fee_rate: number;
  node: LightningNode;
}   