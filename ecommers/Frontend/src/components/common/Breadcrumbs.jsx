import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                            {index > 0 && <span className="breadcrumb-separator">&gt;</span>}
                            {isLast ? (
                                <span className="current-page" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <button
                                    className="breadcrumb-link"
                                    onClick={item.action}
                                    type="button"
                                >
                                    {item.label}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
