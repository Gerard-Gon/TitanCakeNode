import React from 'react';
import "../../styles/pages/home.css";
import Carrousel from '../../components/organisms/Carrousel';
 
function HomeAdmin() {
  return (
    <section>
        <div className="centrador">
            <h1 className="subtitulo">Bienvenidos al Panel de Administrador</h1> 
            <Carrousel/>
        </div>
    </section>
  );
}

export default HomeAdmin;