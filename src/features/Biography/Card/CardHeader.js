import React from 'react';



const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className='CardHeader' {...props}>
      {children}
    </div>
  );
};

export default CardHeader;