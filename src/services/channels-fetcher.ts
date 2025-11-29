import { RestClient } from "../clients/rest-client";
import { LightningChannel } from "../data/channel-by-node";
import { LightningChannelDetail } from "../data/channel-details";

export class ChannelsFetcher {
    private restClient: RestClient;
    private restClientChannelDetails: RestClient;

    //026165850492521f4ac8abd9bd8088123446d126f648ca35e60f88177dc149ceb2&status=open
    constructor() {
        this.restClient = new RestClient("https://yx3wrhufcfkiaetfrsgjx52qxx6emczrn5s7ftt6qpqlbbdfvyrebayd.local/api/v1/lightning/channels");
        this.restClientChannelDetails = new RestClient("https://yx3wrhufcfkiaetfrsgjx52qxx6emczrn5s7ftt6qpqlbbdfvyrebayd.local/api/v1/lightning/channels/");
    }

    async fetchChannels(nodeid: string[]): Promise<ChannelFetchResult[]> {
        //const results: LightningChannel[] = [];
        const results: { [key: string]: LightningChannelDetail[] } = {};

        for (const path of nodeid) {
            try {
                const response = await this.restClient.get(`?public_key=${path}&status=open`);
                const channelData: LightningChannel[] = response.data;


                for (const channel of channelData) {
                    const detailedChannelData = await this.fetchChannelDetails(channel.id);
                    if (!results[path]) {
                        results[path] = [];
                    }
                    results[path].push(detailedChannelData);
                }   
                // const channelDetailsResponse = await this.restClientChannelDetails.get(channelData.id);
                // const detailedChannelData: LightningChannel = channelDetailsResponse.data;


                //results.push(channelData);
            } catch (error) {
                console.error(`Failed to fetch ${path}`);
            }
        }
            const details: ChannelFetchResult[] = [];

        for (const key in results) {
            console.log(`Node ID: ${key}, Channels Fetched: ${results[key].length}`);

            const channelDetails = results[key];
            const nodesDetails = channelDetails.map(cd => {
                return cd.node_left.public_key === key ? cd.node_left : cd.node_right;
            });

            let min_base_fee_mtokens = Number.MAX_SAFE_INTEGER;
            let max_base_fee_mtokens = 0;
            let min_fee_rate = Number.MAX_SAFE_INTEGER;
            let max_fee_rate = 0;
            let total_capacity = 0;
            let total_channels = channelDetails.length;
            let alias = '';
            let public_key = '';
            let is_disabled = 0;
            let cltv_delta = 0;

            for (const nodeDetail of nodesDetails) {
                if(nodeDetail.base_fee_mtokens < min_base_fee_mtokens) {
                    min_base_fee_mtokens = nodeDetail.base_fee_mtokens;
                }
                if(nodeDetail.base_fee_mtokens > max_base_fee_mtokens) {
                    max_base_fee_mtokens = nodeDetail.base_fee_mtokens;
                }
                if(nodeDetail.fee_rate < min_fee_rate) {
                    min_fee_rate = nodeDetail.fee_rate;
                }
                if(nodeDetail.fee_rate > max_fee_rate) {
                    max_fee_rate = nodeDetail.fee_rate;
                }
            }

            for (const channelDetail of channelDetails) {
                total_capacity += channelDetail.capacity;
            }

            const sampleNodeDetail = nodesDetails[0];
            alias = sampleNodeDetail.alias;
            public_key = sampleNodeDetail.public_key;
            is_disabled = sampleNodeDetail.is_disabled;
            cltv_delta = sampleNodeDetail.cltv_delta;

            let d: ChannelFetchResult = {
                nodeId: key,    
                alias: alias,
                public_key: public_key,
                channels: total_channels,
                capacity: total_capacity,
                min_base_fee_mtokens: min_base_fee_mtokens,
                max_base_fee_mtokens: max_base_fee_mtokens,
                cltv_delta: cltv_delta,
                min_fee_rate: min_fee_rate,
                max_fee_rate: max_fee_rate,
                is_disabled: is_disabled
            };

            details.push(d);    
            // let d: ChannelFetchResult = {
            //         nodeId: key,    
            //         // alias: nodeDetail.alias,
            //         // public_key: nodeDetail.public_key,
            //         // channels: nodeDetail.channels,
            //         // capacity: channelDetail.capacity,
            //         min_base_fee_mtokens: 0,
            //         max_base_fee_mtokens: 0,
            //         //cltv_delta: nodeDetail.cltv_delta,
            //         min_fee_rate: 0,
            //         max_fee_rate: 0,
            //         //is_disabled: nodeDetail.is_disabled
            //     };
            // for (const channelDetail of channelDetails) {
            //     const nodeDetail = channelDetail.node_left.public_key === key ? channelDetail.node_left : channelDetail.node_right;
                
            //     if(nodeDetail.fee_rate > d) {
            //         d.min_fee_rate = nodeDetail.fee_rate;
            //         d.max_fee_rate = nodeDetail.fee_rate;
            //     }
            //     console.log(`  Channel ID: ${channelDetail.id}, Capacity: ${channelDetail.capacity}, Status: ${channelDetail.status}`);
                
            // }

        }

        return details;
    }

    async fetchChannelDetails(channelId: string): Promise<LightningChannelDetail> {
        try {
            const response = await this.restClientChannelDetails.get(new String(channelId).toString());
            const channelDetailData: LightningChannelDetail = response.data;
            return channelDetailData;
        } catch (error) {
            console.error(`Failed to fetch channel details for ${channelId}`);
            throw error;
        }
    }
}

export interface ChannelFetchResult {
    nodeId: string;
    alias: string;
   public_key: string;
  channels: number;
  capacity: number;
    cltv_delta: number;
  min_base_fee_mtokens: number;
  max_base_fee_mtokens: number;
  min_fee_rate: number;
  max_fee_rate: number;
  is_disabled: number;

}