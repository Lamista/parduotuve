import React from "react";

const Alerts = ({ message }) => {
    let alertClass = '';
    message === 'Success' ? alertClass = 'alert-success' : alertClass = 'alert-danger';
    return (
        <div className={`alert ${alertClass} mt-2 w-50`} role="alert">
            {message}
        </div>
    );
};

export default Alerts;