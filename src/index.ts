import { NodeFetcher } from './services/node-fetcher';
import { extractNodeIds } from './data/nodeid-extractor';
import * as fs from 'fs/promises';
import * as path from 'path';

async function main(): Promise<void> {
  const baseUrl = "https://yx3wrhufcfkiaetfrsgjx52qxx6emczrn5s7ftt6qpqlbbdfvyrebayd.local/api/v1/lightning/nodes/";

  const fetcher = new NodeFetcher(baseUrl);
  
  try {
    const nodeids = extractNodeIds();
    const results = await fetcher.fetchMultiple(nodeids);
    
    // Sort by opened_channel_count (descending) and capacity (descending)
    const sortedResults = results.sort((a, b) => {
      if (b.opened_channel_count !== a.opened_channel_count) {
        return b.opened_channel_count - a.opened_channel_count;
      }
      return Number(b.capacity) - Number(a.capacity);
    });

    console.log('\nAll results collected:');
    sortedResults.forEach(result => {
      console.log(`Data: ${JSON.stringify(result)}`);
    });

    // Save to JSON file
    const outputPath = path.join('/home/svet/code/mempool-rest-client', 'results.json');
    await fs.writeFile(outputPath, JSON.stringify(sortedResults, null, 2));
    console.log(`\nResults saved to ${outputPath}`);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

main();
