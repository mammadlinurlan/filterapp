import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import '../App.css'
import { usePhoneContext } from "../hooks.js";
import Swal from "sweetalert2";


export const Update = (props) => {

    const [brand, setBrand] = React.useState('')
    const [ram, setRam] = React.useState(0)
    const [price, setPrice] = React.useState(0)
    const [image, setImage] = React.useState('')
    const [model, setModel] = React.useState('')

    const location = useLocation();
    const { phoneId } = useParams();
    const phones = usePhoneContext();
    console.log("phones", phones);
    useEffect(() => {
        axios.get('http://localhost:3000/all').then(({ data }) => {
            console.log(data)
            let phone = data.find((phone) => phone._id === phoneId)
            setBrand(phone.brand);
            setRam(phone.ram)
            setPrice(phone.price)
            setModel(phone.model)
            setImage(phone.img)

        })
    }, [])

    const brandChangeHandler = (e) => {
        setBrand(e.target.value)
    }

    const ramChangeHandler = (e) => {
        setRam(e.target.value)
    }
    const priceChangeHandler = (e) => {
        setPrice(e.target.value)
    }

    const modelChangeHandler = (e) => {
        setModel(e.target.value)
    }
    const imageChangeHandler = (e) => {
        setImage(e.target.value)
    }

    useEffect(() => {
        console.log(`brand : ${brand} --- ram : ${ram}  --- price : ${price} --- model : ${model} ---- image : ${image}`)
    }, [brand, ram, price, image, model])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/update/${phoneId}`,
        {
            brand:brand,
            price:Number(price),
            ram:Number(ram),
            model:model,
            img:image

        }).then(res=>{
            console.log(res)

        }).catch(error=>{
            console.log(error)
        })
        window.location.href = `http://${window.location.host}`

        


    }


    return (
        <>
            <form onSubmit={(e) => submitHandler(e)}>
                <label htmlFor="brand">Brand</label>
                <input type="text" onChange={(e) => brandChangeHandler(e)} value={brand} required id="brand" />

                <label htmlFor="model">Model</label>
                <input type="text" onChange={(e) => modelChangeHandler(e)} value={model} required id="model" />

                <label htmlFor="img">Image</label>
                <input type="text" onChange={(e) => imageChangeHandler(e)} value={image} required id="img" />

                <label htmlFor="ram">Ram</label>
                <input type="number" onChange={(e) => ramChangeHandler(e)} value={ram} required id="ram" />


                <label htmlFor="price">Price</label>
                <input type="number" onChange={(e) => priceChangeHandler(e)} value={price} required id="price" />

                <button className="btn btn-primary">Save</button>
            </form>
        </>



    )
}