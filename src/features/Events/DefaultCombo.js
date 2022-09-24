import React, { useState, useEffect, useRef, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DefaultCombo= ({on, onChange,  listado})=>{
    let claseCss = "";
    return <div className="default-combo">
        {
            listado.map((el, index)=>{
                claseCss = el.indice !== on.orden ? "item-default-combo" : "item-default-combo-visible"
                return <div className={claseCss}  onClick={(e)=>onChange(el)} key={index}>{el.icono ? <span><FontAwesomeIcon icon={el.icono} /></span> :""}{el.title}</div>
            })
        }
    </div>
}
export default DefaultCombo;