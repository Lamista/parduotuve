import React from 'react';

const LoadingComponent = () => (
    <div className='d-flex justify-content-center'>
        <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
        </div>
    </div>
)

export default LoadingComponent;