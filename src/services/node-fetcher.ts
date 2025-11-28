import { RestClient, ApiResponse } from '../clients/rest-client';

export class NodeFetcher {
  private restClient: RestClient;

  constructor(baseUrl: string) {
    this.restClient = new RestClient(baseUrl);
  }

  async fetchMultiple(paths: string[]): Promise<ApiResponse[]> {
    const results: ApiResponse[] = [];

    for (const path of paths) {
      try {
        const response = await this.restClient.get(path);
        results.push(response);
      } catch (error) {
        console.error(`Failed to fetch ${path}`);
      }
    }

    return results;
  }
}