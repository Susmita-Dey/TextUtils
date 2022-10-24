export default function Button({ action }) {
  const { disabled, handleOnClick = () => {}, label } = action;

  return (
    <button
      disabled={disabled}
      className="btn btn-primary mx-1 my-1"
      onClick={handleOnClick}
    >
      {label}
    </button>
  );
}
