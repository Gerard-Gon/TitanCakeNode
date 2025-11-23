import React from 'react';
import "../../styles/pages/home.css";
import Carrousel from '../../components/organisms/Carrousel';
 
function Home() {
  return (
    <section>
        <div className="home-wrapper">
            <h1 className="home-welcome-title">Bienvenidos</h1> 
            <Carrousel/>
        </div>
    </section>
  );
}

export default Home;