import React from 'react'

const LoadingPage = () => {
    return (
        <div className="d-flex justify-content-center  align-items-center gap-3" style={{ minHeight: '100vh' }}>
            <div className="spinner-grow text-primary mr-1" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow text-warning mr-1" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="spinner-grow text-dark mr-1" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}

export default LoadingPage