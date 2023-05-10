import { useState, useEffect, useCallback} from  'react'
import { Motion, spring } from 'react-motion';
const useContextMenu = (referencia) => {
    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [showMenu, setShowMenu] = useState(false);
    const el = referencia.current;
    //console.log('la referencia es ',el);
    const handleContextMenu = useCallback(
      (e) => {
        e.preventDefault();
  
        setXPos(`${e.pageX}px`);
        setYPos(`${e.pageY}px`);
        setShowMenu(true);
      },
      [setXPos, setYPos]
    );
  
    const handleClick = useCallback(() => {
      showMenu && setShowMenu(false);
    }, [showMenu]);
  
    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
          document.addEventListener("click", handleClick);
          document.removeEventListener("contextmenu", handleContextMenu);
        };
    });
  
    return { xPos, yPos, showMenu };
  };

  const ContextMenu = ({ menu, referencia }) => {
    const { xPos, yPos, showMenu } = useContextMenu(referencia);
    //console.log('posición de la referencia', xPos,yPos, showMenu);
    return (
      <Motion
        defaultStyle={{ opacity: 0 }}
        style={{ opacity: !showMenu ? spring(0) : spring(1) }}
      >
        {(interpolatedStyle) => (
          <>
            {showMenu ? (
              <div
                className="menu-container"
                style={{
                  top: yPos,
                  left: xPos,
                  position:'absolute',
                  background:'white',
                  zIndex:9999,
                  opacity: interpolatedStyle.opacity,
                }}
              >
                {menu}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </Motion>
    );
  };

  export default ContextMenu;