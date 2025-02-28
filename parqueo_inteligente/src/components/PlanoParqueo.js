import React from "react";
import Espacio from '@/components/Espacio';

function PlanoParqueo({ estacionamientos, onSeleccionarParqueo }) {
    return (
        <div className="container mt-4">
            <div className="row g-3">
                {estacionamientos.map((espacio) => (
                    <div key={espacio.id} className="col-md-3">
                        <Espacio
                            id={espacio.id}
                            numero={espacio.numero}
                            disponible={espacio.disponible}
                            tiempoReserva={espacio.tiempoReserva}
                            onSeleccionarParqueo={onSeleccionarParqueo}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlanoParqueo;