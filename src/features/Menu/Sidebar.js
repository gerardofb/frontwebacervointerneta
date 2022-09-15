import {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubMenu from './Submenu';
import {getMenuData} from './menuAPI'


const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const SidebarNav = styled.nav`
  background: #15171c;
  width: 350px;
  height: 100vh;
  display: flex;
  justify-content: left;
  position: fixed;
  top: 1em;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 1500;
  overflow-y:scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  webkit-scrollbar:none;
`;
  
const SidebarWrap = styled.div`
  width: 100%;
`;



const SideBar = ()=>{
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = ()=> setSidebar(!sidebar);
    const sideBarData = getMenuData();
    return (
        <>  
        <FontAwesomeIcon title='menú principal' icon={faBars} style={{ color: 'white', float: 'left', cursor: 'pointer', padding: '0 .25em' }} onClick={(e) => { e.preventDefault(); setSidebar(!sidebar) }} />              
        <SidebarNav onMouseLeave={(e)=>setSidebar(false)} sidebar={sidebar} id="sidebar">
                <div className="">
                    <div className="">
                        <div className="">
                            <SidebarWrap>
                                <ul className="menu-main-list">
                                    <li>
                                    {sideBarData.map((item, index) => {
                                        return <SubMenu item={item} key={index}></SubMenu>
                                    })}
                                    </li>
                                </ul>
                            </SidebarWrap>
                        </div>
                    </div>
                </div>
            </SidebarNav>
        </>
    );
}
export default SideBar;