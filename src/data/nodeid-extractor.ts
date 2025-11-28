import * as fs from 'fs';
import * as path from 'path';


// Define the interfaces
interface NodeJson {
  nodeid: string;
  alias: string;
  color: string;
  last_timestamp: number;
  features: string;
  addresses: Array<{
    type: string;
    address: string;
    port: number;
  }>;
}

interface NodesJsonData {
  nodes: NodeJson[];
}

// Function to extract node IDs
export function extractNodeIds(): string[] {
  const filePath = path.join(__dirname, '../listnodes.json');
    console.log(`Reading node data from: ${filePath}`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data: NodesJsonData = JSON.parse(fileContent);
  
  return data.nodes.map(node => node.nodeid);
}