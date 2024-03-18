import { useState } from "react";
import { deleteProductImage, uploadProductImages } from "../../Services/product.service";
import { toast } from "react-toastify";


export default function ProductImageForm({ images, productId }) {

    const [uploadImages, setUploadImages] = useState({
        files: [],
        error: null
    });


    const addImages = (e) => {
        setUploadImages(prev => ({
            ...prev,
            files: [...e.target.files]
        }))
    }

    const handleUpload = () => {
        const formData = new FormData();
        uploadImages.files.forEach(file => formData.append('files', file));
        uploadProductImages(productId, formData)
            .then(res => {
                console.log(res);
                toast.success('Images uploaded');
            })
            .catch(err => {
                console.log(err);
                toast.error('Unable to upload images');
            });
    }

    const handleDeleteImage = (imgId) => {
        deleteProductImage(productId, imgId)
            .then(res => {
                console.log(res);
                toast.success('Image deleted');
            })
            .catch(err => {
                console.log(err);
                toast.error('Unable to delete image');
            });
    }

    return (
        <div>
            <h1>Galery</h1>
            <div className="input-group">
                <input type="file" className="form-control w-25" onChange={addImages} multiple />
                <button className="btn btn-outline-primary" onClick={handleUpload}>Upload</button>
            </div>
            <div className='my-4 row'>
                {images?.map(img => (
                    <div key={img.id} className='col-3 position-relative'>
                        <img className='img-fluid' src={img.url} alt={img.name} />
                        <button type="button" className="btn-close position-absolute top-0 end-0 rounded-circle bg-light" onClick={() => handleDeleteImage(img.id)}></button>
                    </div>
                ))}
            </div>
        </div>
    )
}
