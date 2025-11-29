import { NodeFetcher } from './services/node-fetcher';
import { extractNodeIds, extractNodes } from './data/nodeid-extractor';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ChannelsFetcher } from './services/channels-fetcher';

// async function main(): Promise<void> {
//   const baseUrl = "https://yx3wrhufcfkiaetfrsgjx52qxx6emczrn5s7ftt6qpqlbbdfvyrebayd.local/api/v1/lightning/nodes/";

//   const fetcher = new NodeFetcher(baseUrl);
  
//   try {
//     const filePath = './listnodes.json';

//     const nodeids = extractNodeIds(filePath);
//     const results = await fetcher.fetchMultiple(nodeids.slice(4200, 10000)); // Limit to first 50 for testing
    
//     // Sort by opened_channel_count (descending) and capacity (descending)
//     const sortedResults = results.sort((a, b) => {
//       if (b.opened_channel_count !== a.opened_channel_count) {
//         return b.opened_channel_count - a.opened_channel_count;
//       }
//       return Number(b.capacity) - Number(a.capacity);
//     });

//     console.log('\nAll results collected:');
//     sortedResults.forEach(result => {
//       console.log(`Data: ${JSON.stringify(result)}`);
//     });

//     // Save to JSON file
//     const outputPath = path.join('/home/svet/code/mempool-rest-client', 'results.json');
//     await fs.writeFile(outputPath, JSON.stringify(sortedResults, null, 2));
//     console.log(`\nResults saved to ${outputPath}`);
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//   }
// }

async function main(): Promise<void> {
    const nodeChannelsFetcher = new ChannelsFetcher();
    try {
        const filePath = './4200_10000nodes.json';
        const nodeids = extractNodes(filePath);
        const results = await nodeChannelsFetcher.fetchChannels(nodeids); // Limit to first 50 for testing

        // Sort by fee fields
        const sortedResults = results.sort((a, b) => {
            if (b.max_fee_rate !== a.max_fee_rate) {
                return b.max_fee_rate - a.max_fee_rate;
            }
            if (b.max_base_fee_mtokens !== a.max_base_fee_mtokens) {
                return b.max_base_fee_mtokens - a.max_base_fee_mtokens;
            }
            if (b.min_base_fee_mtokens !== a.min_base_fee_mtokens) {
                return b.min_base_fee_mtokens - a.min_base_fee_mtokens;
            }
            return b.min_fee_rate - a.min_fee_rate;
        });

        console.log('\nAll channel results collected:');
        sortedResults.forEach(result => {
            console.log(`Data: ${JSON.stringify(result)}`);
        });

        // Save to JSON file
        const outputPath = path.join('/home/svet/code/mempool-rest-client', 'channels-results.json');
        await fs.writeFile(outputPath, JSON.stringify(sortedResults, null, 2));
        console.log(`\nResults saved to ${outputPath}`);
    } catch (error) {
        console.error('Failed to fetch channel data:', error);
    }
}
main();
