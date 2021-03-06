import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';

function TabMenuDemo () {

    const [activeIndex, setActiveIndex] = useState(3);

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
        {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    return (
        <div>
            <div className="card">
                <h5>Default</h5>
                <TabMenu model={items} />
            </div>

            <div className="card">
                <h5>Programmatic</h5>
                <div className="p-pt-2 p-pb-4">
                    <Button onClick={() => setActiveIndex(0)} className="p-button-text" label="Activate 1st" />
                    <Button onClick={() => setActiveIndex(1)} className="p-button-text" label="Activate 2nd" />
                    <Button onClick={() => setActiveIndex(2)} className="p-button-text" label="Activate 3rd" />
                </div>

                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            </div>
        </div>
    );
}
export default TabMenuDemo ;
