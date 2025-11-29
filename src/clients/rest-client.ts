import axios, { AxiosInstance } from 'axios';

export interface ApiResponse {
  url: string;
  data: any;
  status: number;
}

export class RestClient {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 10000
    });
  }

  async get(path: string): Promise<ApiResponse> {
    try {
      const url = `${this.baseUrl}/${path}`;
      
      const response = await this.axiosInstance.get(path);
      // console.log(`Response from ${url}:`);
      // console.log(response.data);
      return {
        url: url,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error(`Error fetching ${path}:`, error);
      throw error;
    }
  }
}