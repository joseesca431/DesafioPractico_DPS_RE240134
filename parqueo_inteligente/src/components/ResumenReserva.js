import React from "react";

function ResumenReserva({tiempoReserva, espaciosReservados, total, onCancelarReserva}){
    return(
        <div className="card border-primary mb-4">
        <div className="card-header bg-primary text-white">
            <h4>Resumen de Reserva</h4>
        </div>
        <div className="card-body">
            <p className="card-text">
                <strong>Tiempo de reserva seleccionado:</strong> {tiempoReserva} hora(s)
            </p>

            {espaciosReservados.length > 0 ? (
                <>
                    <h5>Espacios Reservados:</h5>
                    <ul className="list-group mb-3">
                        {espaciosReservados.map(espacio => (
                            <li key={espacio.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>Parqueo #{espacio.numero}</strong>
                                    <br />
                                    <small>Zona: {espacio.zona}</small>
                                    <br />
                                    <small>Tiempo: {espacio.tiempoReserva} hora(s)</small>
                                </div>
                                <button 
                                    className="btn btn-sm btn-danger" 
                                    onClick={() => onCancelarReserva(espacio.id)}
                                >
                                    Cancelar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="alert alert-success">
                        <strong>Total a pagar: ${total.toFixed(2)}</strong>
                    </div>
                    <button 
                        className="btn btn-primary w-100" 
                        onClick={() => alert("¡Reserva completada con éxito!")}
                        >
                        Completar Reserva
                    </button>
                </>
            ) : (
                <div className="alert alert-info">
                    No ha seleccionado ningún espacio de estacionamiento.
                </div>
            )}
        </div>
    </div>
    )
}
export default ResumenReserva;