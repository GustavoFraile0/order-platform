function StatusMessage({ type, message }) {
  return <p className={`status ${type === 'error' ? 'error' : ''}`}>{message}</p>;
}

export default StatusMessage;