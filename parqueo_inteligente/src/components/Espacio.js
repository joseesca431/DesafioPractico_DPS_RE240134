import React from "react";
function Espacio({id,numero, disponible, tiempoReserva, onSeleccionarParqueo}){
    const estadoClase = disponible ? "btn-success" : "btn-danger";
    const estadoTexto = disponible ? "Disponible" : "Reservada";

    const imagen = disponible ? "/disponible.jpg" : "/reservada.jpg";


    return(
        <>
        <button
        className={`btn ${estadoClase} w-100  p-3`}
        onClick={()=> onSeleccionarParqueo(id)}
        disabled={!disponible}
        >
            <div className="d-flex flex-column align-items-center">
            <img 
            src={imagen} 
            alt={estadoTexto} 
            style={{ width: "100px", height: "80px", marginBottom: "10px" }} 
            />
            <span className="fs-5">Parqueo #{numero}</span>
            <span className="badge bg-light text-dark mt-1">
            {!disponible &&(
                <span className="badge bg-light text-dark mt-1">
                    Horas reservadas
                </span>
            )}
            </span>
            <span className="mt-2">{estadoTexto}</span>
            </div>

        </button>
        </>
    )
}
export default Espacio;