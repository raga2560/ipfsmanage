import React from 'react';
import { InputText } from 'primereact/inputtext';

import './AppTopbar.scss';

export const AppTopbar = (props) => {
    return (
        <div className="layout-topbar ">
            <div className="layout-topbar-icons">
                <a href={'/ipfsmanage'} className="nav-link"> Ipfs Manage </a>
            </div>
        </div>
    );
}
