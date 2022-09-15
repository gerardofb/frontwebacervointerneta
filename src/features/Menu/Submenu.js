import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled.button`
  color: #e1e9fc;
  justify-content: left;
  align-items: left;
  background:#15171c;
  width:100%;
  min-width:300px;
  list-style: none;
  text-decoration: none;
  font-size: 12px;
  height:${({ subnav }) => (subnav ? "30px" : "auto")};
  
  &:hover {
    background: #15171c;
    border-left: 4px solid green;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 5px;
`;

const DropdownLink = styled(Link)`
  background: #15171c;
  height: 45px;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 12px;
  &:hover {
    background: green;
    cursor: pointer;
  }
`;

const DropdownSpan = styled.span`
  padding-left: 1rem;
  display: flex;
  align-items: left;
  text-decoration: none;
  font-size:12px;
`;




const SubMenu = ({ item }, { key }) => {
    function randomBetween10_19(){
        let aleatorio = Math.floor(Math.random()*19);
        if(aleatorio >= 11 && aleatorio < 20){
        return ""+aleatorio;
        }
        else return '11';
      }
    const [subnav, setSubnav] = useState(true);
    const showSubnav = () => setSubnav(!subnav);
    const [innerSubnav,setInnerSubnav] = useState('');
    return (
        <ul key={key}>
            <li>
                <SidebarLink className="block" to={item.path}
                    onClick={(e)=>{if(item.path === "#")e.preventDefault()}}>
                    <DropdownSpan>
                        <span style={{ paggingRight: "10px" }}><FontAwesomeIcon icon={item.icon} /></span>

                        <SidebarLabel>{item.title}</SidebarLabel>
                        <div style={{ paddingLeft: "10px" }}>
                            <FontAwesomeIcon icon={!item.subNav && subnav
                                ? item.iconOpened
                                : item.subNav
                                    ? item.iconClosed
                                    : null} />
                        </div>
                    </DropdownSpan>


                    {subnav && item.subNav.map((elem, index) => {
                        console.log('elementos internos de menu ', elem.subNav)
                        return (
                            <ul key={index}>
                                <li className="relative block flex-row items-center h-11 focus:outline-none border-l-4 border-transparent">
                                    <DropdownLink to={elem.path} onClick={(e)=>{setInnerSubnav(elem.title)}}>
                                        <span style={{ paggingRight: "10px" }}><FontAwesomeIcon icon={elem.icon} /></span>
                                        <SidebarLabel>{elem.title}</SidebarLabel>
                                    </DropdownLink>
                                    {
                                        subnav && elem.subNav ?
                                            elem.subNav.map((el, indice) => {
                                                let claseinner = innerSubnav == elem.title?"inner-menu-list":"inner-menu-list-hidden";
                                                return <ul key={indice} className={claseinner}><li>
                                                <DropdownLink to={el.title !== "Reproducción aleatoria" ? el.path : el.path+randomBetween10_19()}>
                                                    <span style={{ paggingRight: "10px" }}><FontAwesomeIcon icon={el.icon} /></span>
                                                    <SidebarLabel>{el.title}</SidebarLabel>
                                                </DropdownLink></li></ul>
                                            }) : null
                                    }
                                    
                                </li>
                            </ul>
                        )
                    })}
                    
                </SidebarLink>
            </li>
        </ul>
    );
};
export default SubMenu;