export default function applyAutoLayout(nodes, edges) {
  const spacingX = 200;
  const spacingY = 100;
  const layoutedNodes = nodes.map((node, index) => {
    return {
      ...node,
      position: {
        x: index * spacingX,
        y: 100 + (index % 2) * spacingY,
      },
    };
  });

  return { layoutedNodes, layoutedEdges: edges };
}
