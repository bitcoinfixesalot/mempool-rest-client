import { RestClient } from '../clients/rest-client';
import { NodeData } from '../data/mempool-node-data';

export class NodeFetcher {
  private restClient: RestClient;

  constructor(baseUrl: string) {
    this.restClient = new RestClient(baseUrl);
  }

  async fetchMultiple(paths: string[]): Promise<NodeData[]> {
    const results: NodeData[] = [];

    for (const path of paths) {
      try {
        const response = await this.restClient.get(path);
        const nodeData: NodeData = response.data;
        if(nodeData.opened_channel_count >10) {
            results.push(response.data);
        }
      } catch (error) {
        console.error(`Failed to fetch ${path}`);
      }
    }

    return results;
  }
}