import React from 'react';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';

import './Chart.prime.css';

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };



function ChartPrime () {
  return (
          <div style={{ width: 800 }}>
            <div className='content-section implementation'>
              <h3>Vertical</h3>
<div className="p-grid">
    <div className="p-col p-col-align-start">4</div>
    <div className="p-col p-col-align-center">4</div>
    <div className="p-col p-col-align-end">4</div>
</div>

     <Button type="submit" label="Submit" icon="pi pi-check" className="p-ml-2"/>
     <Button type="submit" label="Submit"  className="p-button p-component p-disabled"/>

                <h3>Vertical</h3>
                <Chart type="bar" data={data} />


            </div>
          </div>
  )
}
export default ChartPrime;
