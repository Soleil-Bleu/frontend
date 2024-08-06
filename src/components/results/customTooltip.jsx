import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background p-4 rounded-lg border font-secondary text-primary">
                <p>{`Puissance : `}<b className='font-semibold'>{label}</b> {`kWc`}</p>
                <p>{`Amorti en : `}<b className='font-semibold'>{payload[0].value}</b> {`ans`}</p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
