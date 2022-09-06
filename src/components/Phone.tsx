import React from "react";
// import bootstrap from "bootstrap";
import '../App.css';
import { Link } from "react-router-dom";


export const Phone = props => {
    const newTo = { 
        pathname: `/Update/${props.id}`,
        param1:`${props.id}`
      };
    return(
        

        <>
        <div className="phone col-lg-3">
            <div className="wrapper">
            <div className="image">
                <img src={props.img}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="unknown.png";
                  }}
                />
            </div>
            <div className="bottom">
                <h3>
                    {props.name}
                </h3>
                <h3>
                    {props.model}
                </h3>
                <p>
                    Ram : {props.ram}
                </p>
                <p>
                    Price : {props.price}$
                </p>
                <h5>
                    <Link  to={newTo}>Update</Link>
                </h5>
                <h5 >
                    <Link style={{color:"red"}} to={newTo}>Delete</Link>
                </h5>
            </div>
            </div>
        </div>

        
        </>

        

        
    )
}