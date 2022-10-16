import React from 'react';
import { useSelector } from 'react-redux';

export default function Alert(props) {
  const alert = useSelector((state) => state.alert);

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: '50px' }}>
      {alert.show && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(alert.type)}</strong>: {alert.message}
        </div>
      )}
    </div>
  );
}
