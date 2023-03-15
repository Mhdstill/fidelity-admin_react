import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Alert } from 'react-bootstrap';

function Notification({ message, type }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timeout = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
      {type == 'success' ? (
        <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>)
        :
        (
          <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
            {message}
          </Alert>
        )
      }
    </div>
  );
}

function showNotification(message, type = "success") {
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(<Notification message={message} type={type} />, container);
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  }, 4000);
}

export default showNotification;