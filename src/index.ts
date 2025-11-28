import { NodeFetcher } from './services/node-fetcher';
import { extractNodeIds } from './data/nodeid-extractor';


async function main(): Promise<void> {
  const baseUrl = "https://yx3wrhufcfkiaetfrsgjx52qxx6emczrn5s7ftt6qpqlbbdfvyrebayd.local/api/v1/lightning/nodes/";

  const fetcher = new NodeFetcher(baseUrl);
  
  try {
    const nodeids = extractNodeIds();
    const results = await fetcher.fetchMultiple(nodeids);
    
    console.log('\nAll results collected:');
    results.forEach(result => {
      console.log(`\nURL: ${result.url}`);
      console.log(`Status: ${result.status}`);
      console.log(`Data: ${result.data}`);      
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

main();
