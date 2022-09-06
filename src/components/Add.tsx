import React from "react";
import axios from "axios";

export const Add = (props) => {
    const [phone,setPhone] = React.useState()
    const [brand,setBrand] = React.useState()
    const [ram,setRam] = React.useState(0)
    const [price,setPrice] = React.useState(0)
    const [model,setModel] = React.useState()
    const [image,setImage] = React.useState()

    const brandHandler = (e) => {
        setBrand(e.target.value)
    }
    const modelHandler = (e) => {
        setModel(e.target.value)
    } 
    const priceHandler = (e) => {
        setPrice(e.target.value)
    }
    const ramHandler = (e) => {
        setRam(e.target.value)
    }
    const imageHandler = (e) => {
        setImage(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        

        const phone = {
            brand:brand,
            ram:Number(ram),
            img:image,
            model:model,
            price:Number(price)
        }

        console.log(phone)

        axios.post('http://localhost:3000/post',phone).then((result)=>{
            console.log(result)
           
        })
        .catch((err)=>{
            console.log(err)
        })
        
        window.location.href = `http://${window.location.host}`
    }

    return(
    <form onSubmit={(e)=>submitHandler(e)} method="post">
        <input type='text' onChange={(e)=>brandHandler(e)} name="brand" required placeholder="brand" />
        <input type='text' onChange={(e)=>modelHandler(e)} name="model" required placeholder="model" />
        <input type='number' onChange={(e)=>priceHandler(e)} name="price" required placeholder="price" />
        <input type='number' onChange={(e)=>ramHandler(e)} name="ram" required placeholder="ram"/>
        <input type='text' onChange={(e)=>imageHandler(e)} name="img" required placeholder="img" />
        <input value='SUBMIT' type="submit" />
    </form>
    )
}
