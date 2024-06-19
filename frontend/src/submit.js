import React from 'react';
import { useStore } from './store'; 

export const SubmitButton = () => {
    const submitPipeline = useStore(state => state.submitPipeline);

    const handleSubmit = () => {
        submitPipeline();
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};
