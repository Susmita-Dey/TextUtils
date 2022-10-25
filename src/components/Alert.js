import { useSelector } from 'react-redux';

import { capitalize } from '../helper/capitalize';

export default function Alert() {
  const alert = useSelector((state) => state.alert);

  return (
    // <div style={{ height: '50px' }}>
    <div>
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
