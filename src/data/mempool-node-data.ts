// types.ts
export interface NodeFeature {
  bit: number;
  name: string;
  is_required: boolean;
  is_known: boolean;
}

export interface NodeData {
  public_key: string;
  alias: string;
  first_seen: number;
  updated_at: number;
  color: string;
  sockets: string;
  as_number: number;
  city_id: number;
  country_id: number;
  subdivision_id: number;
  longitude: number;
  latitude: number;
  iso_code: string;
  as_organization: string;
  city: {
    [key: string]: string;
  };
  country: {
    [key: string]: string;
  };
  subdivision: {
    [key: string]: string;
  };
  features: NodeFeature[];
  featuresBits: string;
  active_channel_count: number;
  capacity: string;
  opened_channel_count: number;
  closed_channel_count: number;
  custom_records: Record<string, any>;
}