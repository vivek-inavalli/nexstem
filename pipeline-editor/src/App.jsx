import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls as FlowControls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Handle,
  Position,
  BackgroundVariant,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';

const CustomNode = ({ data }) => (
  <div style={{ padding: 10, border: '1px solid #555', background: 'white', position: 'relative' }}>
    <Handle type="target" position={Position.Left} />
    {data.label}
    <Handle type="source" position={Position.Right} />
  </div>
);

const nodeTypes = { custom: CustomNode };

const ControlsPanel = ({ onAddNode, onAutoLayout }) => (
  <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
    <button
  onClick={onAddNode}
  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
>
  Add Node
</button>

<button
  onClick={onAutoLayout}
  className="ml-2 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
>
  Auto Layout
</button>

  </div>
);

function applyAutoLayout(nodes, edges) {
  const spacingX = 200;
  const spacingY = 100;
  const layoutedNodes = nodes.map((node, index) => ({
    ...node,
    position: { x: index * spacingX, y: (index % 2) * spacingY + 100 }
  }));
  return { layoutedNodes, layoutedEdges: edges };
}

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const onConnect = useCallback((params) => {
    if (params.source === params.target) return;
    setEdges((eds) => addEdge({ ...params, markerEnd: { type: 'arrow' } }, eds));
  }, [setEdges]);

  const addNode = () => {
    const label = prompt('Enter node label:');
    if (!label) return;
    const newNode = {
      id: crypto.randomUUID(),
      type: 'custom',
      data: { label },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleAutoLayout = () => {
    const { layoutedNodes, layoutedEdges } = applyAutoLayout(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    fitView();
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <ControlsPanel onAddNode={addNode} onAutoLayout={handleAutoLayout} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background variant={BackgroundVariant.Cross} color="#900C3F"/>
          <FlowControls />
          <MiniMap/>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
