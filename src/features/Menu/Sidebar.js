import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubMenu from './Submenu';
import { getMenuData } from './menuAPI'
import axios from 'axios';
import { getBaseAdressApi } from '../MainAPI';

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
  width: 370px;
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
 
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`


const SideBar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [sideBarData, setSideBarData] = useState([]);
    const [cuentaUsuario, setCuentaUsuario] = useState('');
    const [cargando, setCargando] = useState(true);
    useEffect(() => {

        const post_validate = axios.get(`${getBaseAdressApi()}api/userprofile/`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
            }
        })
            .then(response => {
                //console.log('respuesta del userprofile ', response);
                setCuentaUsuario(response.data["email"])
                if (sideBarData.length == 0) {
                    getMenuData().then(datos => {
                        //console.log('en promesa sidebar', datos);
                        setSideBarData(datos);
                        setCargando(false);
                    })
                }
            }).catch(err => {
                setCuentaUsuario('')
                if (sideBarData.length == 0) {
                    getMenuData().then(datos => {
                        setCuentaUsuario('')
                        //console.log('en promesa sidebar', datos);
                        setSideBarData(datos);
                        setCargando(false);
                    })
                }
            });

    }, [cuentaUsuario, sidebar, sideBarData]);
    return (
        <div style={{ background: '#15171c' }}>
            <FontAwesomeIcon title='menú principal' icon={faBars} style={{ color: 'white', float: 'left', cursor: 'pointer', padding: '0 .25em' }} onClick={(e) => { e.preventDefault(); setSidebar(!sidebar) }} />
            <SidebarNav onMouseLeave={(e) => setSidebar(false)} sidebar={sidebar} id="sidebar">
                <div className='cuenta-usuario-show'>
                    {
                        cuentaUsuario != "" && <span>Bienvenido, {cuentaUsuario}</span>
                    }
                </div>
                <div className='default-loader-center' style={cargando ? { display: 'block' } : { display: 'none' }}>
                    <img width="120" src={url_loader("Reload-white.gif", false)} />
                    <br></br>
                    <p style={{ color: 'white', fontSize: 'large', textAlign: 'center', marginLeft: '1em' }}>Cargando menú...</p>
                </div>
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
        </div>
    );
}
export default SideBar;