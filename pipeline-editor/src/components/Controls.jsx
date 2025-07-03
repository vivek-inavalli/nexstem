const Controls = ({ onAddNode, onAutoLayout }) => (
  <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
    <button onClick={onAddNode}>Add Node</button>
    <button onClick={onAutoLayout} style={{ marginLeft: '10px' }}>
      Auto Layout
    </button>
  </div>
);

export default Controls;
