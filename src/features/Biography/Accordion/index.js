import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AccordionContext from './AccordionContext';

import Collapse from './Collapse';
import Toggle from './Toggle';

const Accordion = ({
  element: Component,
  activeEventKey,
  onToggle,
  children,
  ...otherProps
}) => {
  const context = useMemo(() => {
    return {
      activeEventKey,
      onToggle
    };
  }, [activeEventKey, onToggle]);
  return (
    <AccordionContext.Provider value={context}>
      <Component {...otherProps}>{children}</Component>
    </AccordionContext.Provider>
  );
};

Accordion.propTypes = {
  // Element or Component to be rendered as the parent for accordion.
  element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // `eventKey` of the accordion/section which is active/open
  activeEventKey: PropTypes.oneOf([PropTypes.string, PropTypes.number]),

  // onToggle callback.
  onToggle: PropTypes.func
};

Accordion.defaultProps = {
  // default render as div
  element: 'div',
  // noop
  onToggle: () => {}
};

Accordion.Toggle = Toggle;
Accordion.Collapse = Collapse;

export default Accordion;
