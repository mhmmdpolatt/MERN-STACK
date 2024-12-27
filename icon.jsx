import React from 'react';

const LogoutIcon = ({ width = 24, height = 24, color = 'currentColor' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={color}
        viewBox="0 0 24 24"
    >
        <path d="M10 9v-3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3h2v5a1 1 0 0 1-1 1H5c-1.103 0-2-.897-2-2V6c0-1.103.897-2 2-2h4a1 1 0 0 1 1 1v5h-2zm10.293-2.707-4-4-1.414 1.414L16.586 7H9v2h7.586l-2.707 2.707 1.414 1.414 4-4a.999.999 0 0 0 0-1.414z" />
    </svg>
);

export default LogoutIcon;
