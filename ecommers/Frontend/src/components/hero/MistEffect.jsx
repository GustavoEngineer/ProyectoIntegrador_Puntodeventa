import React from 'react';
import './MistEffect.css';

const MistEffect = () => {
    return (
        <div className="mist-container">
            {/* Niebla Izquierda densa */}
            <div className="smoke-cluster left-cluster">
                <div className="smoke-puff p1"></div>
                <div className="smoke-puff p2"></div>
                <div className="smoke-puff p3"></div>
            </div>

            {/* Niebla Derecha densa */}
            <div className="smoke-cluster right-cluster">
                <div className="smoke-puff p4"></div>
                <div className="smoke-puff p5"></div>
                <div className="smoke-puff p6"></div>
            </div>

            {/* Niebla base extendida */}
            <div className="mist-base"></div>
        </div>
    );
};

export default MistEffect;
