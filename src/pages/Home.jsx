import '../styles/pages/home.css'
import Carrousel from '../components/organisms/Carrousel';
 
function Home() {
  return (
    <section>
        <div class="centrador">
            <h1 class="subtitulo">Bienvenidos</h1> 
            <Carrousel/>
        </div>
    </section>
  );
}

export default Home;