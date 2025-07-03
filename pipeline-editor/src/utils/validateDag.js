export default function validateDag(nodes, edges) {
  if (nodes.length < 2) return { valid: false, message: 'At least 2 nodes required' };

  const adjList = {};
  nodes.forEach((node) => (adjList[node.id] = []));
  edges.forEach((edge) => {
    if (edge.source !== edge.target) {
      adjList[edge.source].push(edge.target);
    }
  });

  const visited = {};
  const recStack = {};

  const hasCycle = (v) => {
    if (!visited[v]) {
      visited[v] = true;
      recStack[v] = true;
      for (const neighbor of adjList[v]) {
        if (!visited[neighbor] && hasCycle(neighbor)) return true;
        else if (recStack[neighbor]) return true;
      }
    }
    recStack[v] = false;
    return false;
  };

  for (const node of nodes) {
    if (hasCycle(node.id)) return { valid: false, message: 'Graph has cycles' };
  }

  for (const node of nodes) {
    const connected = edges.some(
      (e) => e.source === node.id || e.target === node.id
    );
    if (!connected) return { valid: false, message: `Node ${node.data.label} is unconnected` };
  }

  return { valid: true, message: 'Structure is a valid DAG' };
}
