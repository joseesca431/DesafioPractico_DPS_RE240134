import React from "react";

function SelectorZona({zonas, zonaActual, onCambiarZona}){
    return(
    <div className="mb-4">
      <h5>Seleccione una zona:</h5>
      <div className="btn-group w-100">
        <button 
          className={`btn ${zonaActual === 'todas' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onCambiarZona('todas')}
        >
          Todas
        </button>
        {zonas.map(zona => (
          <button 
            key={zona}
            className={`btn ${zonaActual === zona ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onCambiarZona(zona)}
          >
            {zona}
          </button>
        ))}
      </div>
    </div>
    )
}
export default SelectorZona;