import React from "react"

import './styles.css'

interface AlertProps {
    message: string;
    type: 'success' | 'error' | 'info';
  }
function Alert(props: AlertProps) {
    const { message, type } = props;
    return(
        <div className={`alert ${type}`}>
            {message}
        </div>
    )
}

export default Alert
