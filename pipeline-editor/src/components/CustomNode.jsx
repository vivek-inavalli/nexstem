import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => (
  <div className="bg-white border rounded p-2 shadow-md text-sm">
    <Handle type="target" position={Position.Left} />
    <div>{data.label}</div>
    <Handle type="source" position={Position.Right} />
  </div>
);

export default CustomNode;
