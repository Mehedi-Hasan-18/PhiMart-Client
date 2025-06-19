import StarComponent from "./StarComponent";


const EditReviewForm = ({
  editReview,
  setEditReview,
  onCancelEdit,
  onSave,
}) => {
  console.log(editReview);
  return (
    <div className="mt-4 space-y-4 bg-base-200 p-4 rounded-lg">
      <div>
        <label className="label-text font-medium mb-1 block">Rating</label>
        <StarComponent
          rating={editReview.ratings}
          onChange={(value) => setEditReview({ ...editReview, ratings: value })}
        />
      </div>
      <div>
        <label className="label-text font-medium mb-1 block">Comment</label>
        <textarea
          value={editReview.description}
          onChange={(e) =>
            setEditReview({ ...editReview, description: e.target.value })
          }
          className="textarea textarea-bordered w-full min-h-[100px]"
        />
      </div>
      <div className="flex gap-2">
        <button onClick={onSave} className="btn btn-sm btn-success">
          Save Changes
        </button>
        <button onClick={onCancelEdit} className="btn btn-sm btn-ghost">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditReviewForm;