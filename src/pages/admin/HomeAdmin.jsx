import React from 'react';
import '../../styles/pages/admin.css'; 
import Carrousel from '../../components/organisms/Carrousel';
 
function HomeAdmin() {
  return (
    <section className="titan-page-bg">
        <div className="admin-dashboard-wrapper">
            <h1 className="admin-welcome-title">
                Bienvenidos al Panel de Administrador
            </h1> 
            <Carrousel/>
        </div>
    </section>
  );
}

export default HomeAdmin;