import React from 'react';

import CardHeader from './CardHeader';
import CardBody from './CardBody';



const Card = ({ children, className }) => {
  return <div className='Card'>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;