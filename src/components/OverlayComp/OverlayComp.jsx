import React from 'react'
import './OverlayComp.css'
export default function OverlayComp({isOpen,onClose,children}) {
  return (
    <>
    {isOpen ? (
        <div className="overlaycomp">
            <div className="ovbackground " onClick={onClose}/>
                <div className="overContainer">
                    <div className="overControls">
                        <button className='overlayClose' type='button' onClick={onClose}/>
                    </div>
                    {children}  </div> 
               
            </div>
          
        
    ):null}
    </>
  )
}
