import { getProductReviews } from "../../Services/product.service";
import { Rating } from "react-simple-star-rating";
import { postProductReview } from "../../Services/product.service";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import CustomDateTime from "../Fragments/CustomDateTime";
import useFetch from "../../CustomHooks/useFetch";
import CustomPagination from "../Fragments/CustomPagination";
import { toast } from "react-toastify";
import usePagination from "../../CustomHooks/usePagination";
import useAuth from "../../CustomHooks/useAuth";


export default function ProductReview({ productId }) {

    const { searchParams } = usePagination();

    const { data, setData, isLoading } = useFetch(getProductReviews, { productId, searchParams });

    const { content: reviews, totalPages } = { ...data };

    const { auth } = useAuth();

    return (

        <div className="row">
            <div className="col-6">
                <h2>Customer reviews</h2>
                {isLoading ? (
                    <Spinner animation="border" />
                ) : (
                    <>
                        {reviews.map(review => (
                            <div key={review.id} className="p-3">
                                <Rating
                                    readonly={true}
                                    initialValue={review.rating}
                                    size={20}
                                />
                                <p className="text-secondary fst-italic pt-2">
                                    By <span className="fw-medium">{review.username}</span> on <CustomDateTime dateTime={review.createdAt} showDate={true} style={'fw-medium'} />
                                </p>
                                <p className="pb-3">{review.content}</p>
                                <hr />
                            </div>
                        ))}
                        <CustomPagination total={totalPages} />
                    </>
                )}
            </div>
            {auth.role && (
                <div className="col-6">
                    <h3>Write your review:</h3>
                    <ReviewForm setData={setData} productId={productId} />
                </div>
            )}

        </div>
    )
}

const ReviewForm = ({ setData, productId }) => {

    const [review, setReview] = useState({
        rating: 0,
        content: '',
        error: false
    });

    const handleRating = (value) => {
        setReview(prev => ({
            ...prev,
            rating: value
        }));
    }

    const handleContent = (e) => {
        setReview(prev => ({
            ...prev,
            content: e.target.value
        }));
    }

    const handleSubmit = () => {
        if (review.rating === 0 || review.content === '') {
            setReview(prev => ({
                ...prev,
                error: true
            }));
        } else {
            // eslint-disable-next-line no-unused-vars
            const { error, ...reviewReq } = review;
            postProductReview(productId, reviewReq)
                .then(res => {
                    console.log(res);
                    setData(prev => ({
                        ...prev,
                        content: [res.data, ...prev.content],
                        totalItems: prev.totalItems + 1
                    }));
                    setReview({
                        rating: 0,
                        content: '',
                        error: false
                    });
                    toast.success('Review posted');
                })
                .catch((e) => {
                    toast.error('Unable to post review')
                });
        }
    }

    return (
        <div>
            <div className="d-flex my-3">
                <h5 className="me-3">Your rating</h5>
                <Rating
                    onClick={handleRating}
                    size={25}
                />
            </div>
            <div className="my-3">
                <textarea
                    className="form-control"
                    name="content"
                    rows="5"
                    placeholder="Your review"
                    onChange={(e) => handleContent(e)}
                ></textarea>
                {review.error && <p className="text-danger">Please give us your rating and review</p>}
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
