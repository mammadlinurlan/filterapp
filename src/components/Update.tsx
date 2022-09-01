import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import '../App.css'
import { usePhoneContext } from "../hooks.js";

export const Update = (props) =>{

    const [phone,setPhone] = React.useState()
    const [name,setName] = React.useState(0)
    const [ram,setRam] = React.useState(0)
    const [price,setPrice] = React.useState(0)
    const [id,setId] = React.useState()
    const location = useLocation();
    const {phoneId} = useParams();
    const phones = usePhoneContext();
    console.log("phones",phones);
     useEffect(()=>{
              axios.get('http://localhost:3000/api.json').then(({data})=>{
                    let phone = data.phones.find((phone)=> phone.id === phoneId)
                    setPhone(phone)
                    setName(phone.name);
                    setRam(phone.ram)
                    setPrice(phone.price)
                    
              })
     },[])

     const nameChangeHandler = (e) =>{
        setName(e.target.value)
     }

     const ramChangeHandler = (e) =>{
        setRam(e.target.value)
     }
     const priceChangeHandler = (e) =>{
        setPrice(e.target.value)
     }

     useEffect(()=>{
        console.log(`name : ${name} --- ram : ${ram}  --- price : ${price}`)
     },[name,ram,price])

     const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api.json/${phoneId}`,
        {
            name:name,
            price:price,
            ram:ram

        }).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
     }
        

    return(
        <>
        <form onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input onChange={(e)=>nameChangeHandler(e)} value={name}  id="name" />
           
            <label htmlFor="ram">Ram</label>
            <input onChange={(e)=>ramChangeHandler(e)} value={ram} id="ram"/>
           
            
            <label htmlFor="price">Price</label>
            <input onChange={(e)=>priceChangeHandler(e)} value={price} id="price"/>

            <button className="btn btn-primary">Save</button>
        </form>
        </>

      

    )
}