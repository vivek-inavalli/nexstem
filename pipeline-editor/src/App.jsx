import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls as FlowControls,
  useNodesState,
  useEdgesState,
  MiniMap,
  useReactFlow,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './components/CustomNode';
import Controls from './components/Controls';
import StatusBar from './components/StatusBar';
import validateDag from './utils/validateDag';
import applyAutoLayout from './utils/autoLayout';

const nodeTypes = { custom: CustomNode };

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isValidDag, setIsValidDag] = useState(false);
  const [validationMsg, setValidationMsg] = useState('');

  const { project, fitView } = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      if (params.source === params.target) return;
      setEdges((eds) => addEdge({ ...params, markerEnd: { type: 'arrow' } }, eds));
    },
    [setEdges]
  );

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

  const handleDelete = useCallback((event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      setNodes((nds) => nds.filter((node) => !node.selected));
      setEdges((eds) => eds.filter((edge) => !edge.selected));
    }
  }, []);

  const handleAutoLayout = () => {
    const { layoutedNodes, layoutedEdges } = applyAutoLayout(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    fitView();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleDelete);
    return () => window.removeEventListener('keydown', handleDelete);
  }, [handleDelete]);

  useEffect(() => {
    const { valid, message } = validateDag(nodes, edges);
    setIsValidDag(valid);
    setValidationMsg(message);
  }, [nodes, edges]);

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Controls onAddNode={addNode} onAutoLayout={handleAutoLayout} />
        <StatusBar valid={isValidDag} message={validationMsg} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          {/* <MiniMap /> */}
          <Background  color="#FF0000" bgColor="#000000" variant={BackgroundVariant.Cross}/>
          <FlowControls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
