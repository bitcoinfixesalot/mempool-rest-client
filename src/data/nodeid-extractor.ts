import * as fs from 'fs';
import * as path from 'path';


// Define the interfaces
interface Node {
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

interface NodesData {
  nodes: Node[];
}

// Function to extract node IDs
export function extractNodeIds(): string[] {
  const filePath = path.join(__dirname, '../listnodes.json');
    console.log(`Reading node data from: ${filePath}`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data: NodesData = JSON.parse(fileContent);
  
  return data.nodes.map(node => node.nodeid);
}