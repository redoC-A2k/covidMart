import React, { useState, useEffect } from 'react';
// import "../App.css"


function AdminPage() {
    
    let descriptionComponent = (<input style={{ margin: '0px 16px', width: '98%', marginBottom: '5px' }} onChange={(e) => { setDescriptionval([...descriptionval, e.target.value]) }} type="text" placeholder="Enter description Points"  />)
    const [description, setDescription] = useState([descriptionComponent])
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [urls, setUrls] = useState([]);
    const [features, setFeatures] = useState([]);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [descriptionval, setDescriptionval] = useState([])
    function addProduct() {
        for (let i = 0; i < images.length; i++) {
            let data = new FormData();
            data.append("file", images[i])
            data.append("upload_preset", "covid19_webapp")
            data.append("cloud_name", "a2k")
            fetch("https://api.cloudinary.com/v1_1/a2k/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    setUrls(urls => [...urls, data.url])
                }).catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if (urls !== [] && urls.length === images.length) {
            console.log(urls)
            setTimeout(() => {
                fetch("/addproductindb", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        urls: urls,
                        features: features,
                        price: price,
                        quantity: quantity,
                        description: descriptionval
                    })
                })
                    .then((res) => res.json())
                    .then((data) => console.log(data.message))
                    .catch(err => console.log(err))
            }, 500)
        }
    }, [urls])

    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <div>
            <h1 className="item">Add product in website</h1>
            </div>
            <div>
            <form>
                <input
                    className="item"
                    style={{ width: '50%' }}
                    type="text"
                    placeholder="Enter title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br /><br />
                <input
                    type="text"
                    placeholder="Enter features"
                    className="item"
                    style={{width:"70%"}}
                    onChange={(e) => setFeatures((e.target.value).split(','))}
                />
                <div><span className="helper-text" style={{ marginLeft: "16px" }}>Enter features in comma saperated form</span></div>
                <br /><br /><br />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <input
                        className="item"
                        style={{ width: "20%" }}
                        type="number"
                        placeholder="Enter Price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        className="item"
                        type="number"
                        style={{ width: "20%" }}
                        placeholder="Enter Quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <br /><br />
                <div>
                    <span className="item">
                        Select images
                    </span>
                    <input
                        className="item"
                        type="file"
                        placeholder="Select image"
                        onChange={(e) => {
                            setImages(e.target.files)
                        }}
                        multiple
                    />
                </div>
                <br /><br />
                <p>Add description below</p>
                <ol>
                    {description.map((desc, ind) => {
                        return (<li key={ind}>{desc}</li>)
                    })}
                </ol>
                <a className="btn waves-effect" style={{ color:"#3f51b5" ,backgroundColor:"white" ,marginLeft: '16px', width: '15%' }} onClick={() => setDescription([...description, descriptionComponent])}>Add more description field</a>
            </form>
            <a className="btn waves-effect" style={{ backgroundColor:"#3f51b5" ,marginLeft: 'auto',marginRight:'auto'}} onClick={() => addProduct()}>Add product</a>
            </div>
        </div>
    )
}
export default AdminPage