import React from 'react';
import useRandomEquipos from '@/common/hooks/useRandomEquipos';
import './PromotionDevice.css';

const PromotionDevice = ({ onSelectEquipo }) => {
    const { equipos, loading } = useRandomEquipos();

    if (loading || equipos.length === 0) {
        return <div className="promotion-device-placeholder"></div>;
    }

    return (
        <div className="promotion-device-container">
            {equipos.map((equipo) => (
                <div
                    key={equipo.Id_EquipoCompatible}
                    className="promotion-device-card"
                    onClick={() => onSelectEquipo(equipo)}
                >
                    <div className="device-card-content">
                        <span className="device-tag">Equipo Médico</span>
                        <h3>{equipo.Nombre}</h3>
                        <button className="device-view-btn">Ver piezas</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PromotionDevice;
