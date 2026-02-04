const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="alert alert-error mt-4">
      <span>{message}</span>
    </div>
  );
};

export default ErrorAlert;
