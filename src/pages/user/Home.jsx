import React from 'react';
import "../../styles/pages/home.css";
import Carrousel from '../../components/organisms/Carrousel';
 
function Home() {
  return (
    <section>
        <div className="centrador">
            <h1 className="subtitulo">Bienvenidos</h1> 
            <Carrousel/>
        </div>
    </section>
  );
}

export default Home;