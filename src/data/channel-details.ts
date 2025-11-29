export interface LightningNodeInfo {
  alias: string;
  public_key: string;
  channels: number;
  capacity: number;
  base_fee_mtokens: number;
  cltv_delta: number;
  fee_rate: number;
  is_disabled: number;
  max_htlc_mtokens: number;
  min_htlc_mtokens: number;
  updated_at: string;
  longitude: number;
  latitude: number;
  funding_balance: number;
  closing_balance: number;
}

export interface LightningChannelDetail {
  id: string;
  short_id: string;
  capacity: number;
  transaction_id: string;
  transaction_vout: number;
  closing_transaction_id: null | string;
  closing_fee: number;
  closing_reason: null | string;
  closing_date: null | string;
  updated_at: string;
  created: string;
  status: number;
  funding_ratio: null | number;
  closed_by: null | string;
  single_funded: boolean;
  node_left: LightningNodeInfo;
  node_right: LightningNodeInfo;
}