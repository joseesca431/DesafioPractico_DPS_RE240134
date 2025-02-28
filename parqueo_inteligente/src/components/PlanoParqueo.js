import React from "react";
import Espacio from '@/components/Espacio';

function PlanoParqueo({estacionamiento, onSeleccionarEstacionamiento}){
    return(
        <div className="container mt-4">
            <h2 className="mb-3">Plano del parqueo UDB</h2>
            <div className="row g-3">
                {estacionamiento.map((estacionamiento) =>(
                <div key={estacionamiento.id} className='col-md-3 col-md-6'>
                    <Espacio
                    id={estacionamiento}
                    numero={estacionamiento.numero}
                    disponible={estacionamiento.disponible}
                    tiempoReserva={estacionamiento.tiempoReserva}
                    />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default PlanoParqueo;