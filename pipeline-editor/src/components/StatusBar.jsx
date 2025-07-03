const StatusBar = ({ valid, message }) => (
  <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 10 }}>
    <strong>Status:</strong> {valid ? '✅ Valid DAG' : '❌ Invalid DAG'} - {message}
  </div>
);

export default StatusBar;
