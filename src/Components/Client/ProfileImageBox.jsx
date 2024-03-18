import { useState } from "react";
import { uploadAvatar } from "../../Services/user.service";
import { toast } from "react-toastify";


export default function ProfileImageBox({ img }) {
    const [image, setImage] = useState({
        preview: img,
        file: null,
        error: null
    });

    const previewImage = (e) => {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
            error: null
        });
    }

    const uploadImg = () => {
        if (image.file) {
            uploadAvatar(image.file)
                .then(res => {
                    console.log(res);
                    toast.success('Avatar uploaded');
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Unable to upload avatar');
                });
        } else {
            setImage(prev => ({
                ...prev,
                error: 'Please upload your avatar first'
            }))
        }
    }

    return (
        <div className="text-center">
            <div className="d-flex flex-column align-items-center">
                <img className="rounded-circle shadow-sm my-3 w-50" src={image.preview || '/user-placeholder.png'} alt="" />
                <div className="input-group">
                    <input type="file" className="form-control" onChange={previewImage} />
                    <button className="btn btn-outline-primary" onClick={uploadImg}>Upload</button>
                </div>
                <p className="text-danger">{image.error}</p>
            </div>
        </div>
    )
}
