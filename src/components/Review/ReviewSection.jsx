import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import useAuthContext from "../../hooks/useAuthContext";
import apiClint from "../../services/api-clint";
import authApiClint from "../../services/authapiClient";

const ReviewSection = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [userCanReview, setUserCanReview] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [editReview, setEditReview] = useState({ ratings: 0, description: "" });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuthContext();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await apiClint.get(`/products/${id}/review/`);
      console.log(res.data);
      setReviews(res.data);
    } catch (error) {
      console.log("Error fetching reviews", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await authApiClint.post(`/products/${id}/review/`, data);
      fetchReviews();
    } catch (error) {
      console.log("Error submitting review", error);
    }
  };

  const checkUserPermission = async () => {
    try {
      const res = await authApiClint.get(`/order/has-created/${id}/`);
      setUserCanReview(res.data.has_order);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      await authApiClint.put(
        `/products/${id}/review/${reviewId}/`,
        editReview
      );
      setEditingId(null);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await authApiClint.delete(`/products/${id}/review/${reviewId}/`);
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserPermission();
    fetchReviews();
  }, []);
  return (
    <div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="badge badge-lg">
          {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </div>
      </div>

      {userCanReview && (
        <div className="card bg-base-100 shadow-lg border border-base-200 rounded-xl overflow-hidden">
          <div className="card-body">
            <h3 className="card-title text-lg">Write a Review</h3>
            <ReviewForm onSubmit={onSubmit} />
          </div>
        </div>
      )}

      <div className="divider"></div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
          <p className="text-base-content/70">
            Be the first to review this product!
          </p>
        </div>
      ) : (
        <ReviewList
          reviews={reviews}
          user={user}
          editReview={editReview}
          setEditReview={setEditReview}
          editingId={editingId}
          setEditingId={setEditingId}
          handleUpdateReview={handleUpdateReview}
          handleDeleteReview={handleDeleteReview}
        />
      )}
    </div>
  );
};

export default ReviewSection;