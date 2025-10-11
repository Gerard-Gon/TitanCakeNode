import Card from 'react-bootstrap/Card';
import Logo from '../../img/Logo.webp'
import Image from '../atoms/Image'
import '../../styles/pages/nosotros.css'

function NosotrosCard() {
  return (
    <div className="centrador">
      <Card className='cardnosotros'>
        <Image src={Logo} alt="logo titancake" className="imagen" />
        <Card.Body>
          <Card.Text>
            👨‍🍳 Nuestro equipo titánico<br/>
            En TitanCake, los pasteles no se hacen por arte de magia (aunque a veces lo parece). Detrás de cada berlín relleno con precisión quirúrgica y cada chilenito que desafía las leyes de la física está nuestro escuadrón pastelero:<br/>
            - Gérard González, maestro del merengue y domador oficial de batidoras rebeldes. Si el manjar está perfectamente cremoso, es porque él lo convenció con pura paciencia y talento.<br/>
            - Oscar Astudillo, el estratega de los empolvados. Sabe exactamente cuánta azúcar flor es suficiente para que no parezca una tormenta de nieve. Su técnica es tan precisa que los empolvados salen suaves, parejitos y con actitud.<br/>
            - Franco Astudillo, el arquitecto de los chilenitos y visionario del vitrineo. Cada pastelito está alineado como si fuera una formación militar, y su estética pastelera hace que hasta los berlines posen para la foto. Si algo se ve bonito y sabe mejor, probablemente es culpa suya.<br/>
            Juntos, trabajan con cariño, técnica y un toque de locura dulce para que cada cliente se lleve no solo un pastel, sino una experiencia TitanCake.
            
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NosotrosCard;
