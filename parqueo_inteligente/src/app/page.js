"use client"
import React, { useState, useEffect } from 'react';
import PlanoParqueo from '../components/PlanoParqueo';
import ResumenReserva from '../components/ResumenReserva';
import SelectorZona from '../components/SelectorZona';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  // Aqui agregamos los datos iniciales del estacionamiento y la zona 
  const espaciosIniciales = [
    { id: 1, numero: 1, disponible: true, tiempoReserva: 0, zona: 'Cubierto' },
    { id: 2, numero: 2, disponible: true, tiempoReserva: 0, zona: 'Cubierto' },
    { id: 3, numero: 3, disponible: true, tiempoReserva: 2, zona: 'Cubierto' },
    { id: 4, numero: 4, disponible: true, tiempoReserva: 0, zona: 'Cubierto' },
    { id: 5, numero: 5, disponible: true, tiempoReserva: 0, zona: 'Descubierto' },
    { id: 6, numero: 6, disponible: true, tiempoReserva: 0, zona: 'Descubierto' },
    { id: 7, numero: 7, disponible: true, tiempoReserva: 3, zona: 'Descubierto' },
    { id: 8, numero: 8, disponible: true, tiempoReserva: 0, zona: 'Descubierto' },
    { id: 9, numero: 9, disponible: true, tiempoReserva: 0, zona: 'VIP' },
    { id: 10, numero: 10, disponible: true, tiempoReserva: 0, zona: 'VIP' },
    { id: 11, numero: 11, disponible: true, tiempoReserva: 1, zona: 'VIP' },
    { id: 12, numero: 12, disponible: true, tiempoReserva: 0, zona: 'VIP' },
    { id: 13, numero: 13, disponible: true, tiempoReserva: 0, zona: 'VIP' },
    { id: 14, numero: 14, disponible: true, tiempoReserva: 1, zona: 'VIP' },
    { id: 15, numero: 15, disponible: true, tiempoReserva: 0, zona: 'VIP' },
  ];

  // Estos estados manejan la info, por ejemplo la lista de estacionamientos disponibles, su zona, etc
  const [espacios, setEspacios] = useState(espaciosIniciales);
  const [zonaActual, setZonaActual] = useState('todas');
  const [espaciosReservados, setEspaciosReservados] = useState([]);
  const [tiempoReserva, setTiempoReserva] = useState(1);//En este caso serian horas
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState('');

  // Precios por zona de cada espacio por hora
  const precios = {
    'Cubierto': 2.5,
    'Descubierto': 1.5,
    'VIP': 5.0
  };

  //Usamos UseEffect para actualizar el total cuando cambian los espacios reservados o el tiempo
  useEffect(() => {
    const nuevoTotal = espaciosReservados.reduce((total, espacio) => {//
      return total + (precios[espacio.zona] * espacio.tiempoReserva);
    }, 0);
    setTotal(nuevoTotal);
  }, [espaciosReservados, tiempoReserva]);

  // Filtrar estacionamientos por zona
  const espaciosFiltrados = zonaActual === 'todas' 
    ? espacios 
    : espacios.filter(espacio => espacio.zona === zonaActual);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Sistema de Reserva de Estacionamientos UDB</h1>
      
      {mensaje && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {mensaje}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMensaje('')}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h3>Plano del Parqueo</h3>
            </div>
            <div className="card-body">
              <SelectorZona 
                zonas={['Cubierto', 'Descubierto', 'VIP']} 
                zonaActual={zonaActual} 
                onCambiarZona={setZonaActual}
              />
              
              <PlanoParqueo 
                estacionamientos={espaciosFiltrados} 
                onSeleccionarParqueo={(id) => {
                  const espacioSeleccionado = espacios.find(espacio => espacio.id === id);
                  if (!espacioSeleccionado.disponible) {
                    setMensaje('Este espacio ya está reservado');
                    return;
                  }
                  const nuevosEspacios = espacios.map(espacio => {
                    if (espacio.id === id) {
                      return { 
                        ...espacio, 
                        disponible: false, 
                        tiempoReserva: tiempoReserva 
                      };
                    }
                    return espacio;
                  });
                  setEspacios(nuevosEspacios);
                  setEspaciosReservados([...espaciosReservados, { 
                    id: espacioSeleccionado.id, 
                    numero: espacioSeleccionado.numero, 
                    zona: espacioSeleccionado.zona, 
                    tiempoReserva: tiempoReserva 
                  }]);
                  setMensaje(`¡El espacio #${espacioSeleccionado.numero} ha sido reservado por ${tiempoReserva} horas!`);
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h3>Configuración de Reserva</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="tiempoReserva" className="form-label">Tiempo de Reserva (horas):</label>
                <input 
                  type="number" 
                  id="tiempoReserva" 
                  className="form-control" 
                  value={tiempoReserva} 
                  onChange={(e) => {
                    const tiempo = parseInt(e.target.value);
                    if (tiempo > 0 && tiempo <= 24) {
                      setTiempoReserva(tiempo);
                    }
                  }}
                  min="1" 
                  max="24" 
                />
              </div>
              
              <div className="mb-3">
                <h5>Precios por Zona (por hora):</h5>
                <ul className="list-group">
                  <li className="list-group-item">Cubierto: ${precios.Cubierto.toFixed(2)}</li>
                  <li className="list-group-item">Descubierto: ${precios.Descubierto.toFixed(2)}</li>
                  <li className="list-group-item">VIP: ${precios.VIP.toFixed(2)}</li>
                </ul>
              </div>
            </div>
          </div>
          
          <ResumenReserva 
            tiempoReserva={tiempoReserva} 
            espaciosReservados={espaciosReservados}
            total={total}
            onCancelarReserva={(id) => {
              const nuevosEspacios = espacios.map(espacio => {
                if (espacio.id === id) {
                  return { 
                    ...espacio, 
                    disponible: true, 
                    tiempoReserva: 0 
                  };
                }
                return espacio;
              });
              setEspacios(nuevosEspacios);
              const nuevosEspaciosReservados = espaciosReservados.filter(espacio => espacio.id !== id);
              setEspaciosReservados(nuevosEspaciosReservados);
              const espacioInfo = espacios.find(espacio => espacio.id === id);
              setMensaje(`La reserva del espacio #${espacioInfo.numero} ha sido cancelada`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
