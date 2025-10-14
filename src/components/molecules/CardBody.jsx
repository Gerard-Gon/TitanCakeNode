import Text from '../atoms/Text';
import React from 'react';


function CardBody({ title, description, price }) {
 return (
   <>
     <Text variant="h5">{title}</Text>
     <Text variant="p">{description}</Text>
           {price !== undefined && (
        <Text variant="span" className="text-white">${price}</Text>//Solucion para que aparezca solo en details y no en productos con valor vacio
        )}
   </>
 );
}


export default CardBody;