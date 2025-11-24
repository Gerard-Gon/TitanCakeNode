import React from 'react';
import Text from '../atoms/Text';


function CardBody({ title, description, price }) {
 return (
   <>
     <Text variant="h5">{title}</Text>
     <Text variant="p">{description}</Text>
           {price !== undefined && (
        <Text variant="span" className="text-white">${price.toLocaleString('es-CL')}</Text>
        )}
   </>
 );
}


export default CardBody;