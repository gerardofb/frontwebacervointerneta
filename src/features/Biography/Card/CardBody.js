import React from 'react';



const CardBody = ({ children, className, ...props }) => {
  return (
    <div className='CardBody' {...props}>
      {children}
    </div>
  );
};

export default CardBody;