import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addCommentService } from "../../../services/ApiServices";
import { toast } from "react-toastify";
import {
  Comment,
  CommentStrProps,
  decodedUser,
  GameData,
  Product,
} from "../../../types";
import BtnTow from "../BtnTow";
import { jwtDecode } from "jwt-decode";

interface CommentsTabProps {
  Product: Product | GameData;
}
const CommentsTab: React.FC<CommentsTabProps> = ({ Product }) => {
  const { gameId, productId } = useParams(); // Correctly calling useParams as a function
  const location = useLocation();

  const [commentBody, setCommentBody] = useState(""); // Only storing the comment text
  const [rating, setRating] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setCommentBody(value); // Update the comment body directly
  };
  let decodedToken: decodedUser | null = null;

  // Get the decoded user token if available
  const user = localStorage.getItem("User") || "";
  if (user) {
    decodedToken = jwtDecode<decodedUser>(user);
  }
  const handleAddComment = async () => {
    if (!decodedToken) {
      toast.error("برای ثبت نظر اول وارد شوید"); // Validation
      return;
    }
    if (!commentBody) {
      toast.error("متن نظر نمیتواند خالی باشد."); // Validation
      return;
    }
    if (rating === 0) {
      toast.error("امتیاز محصول نمیتواند خالی باشد."); // Validation
      return;
    }
    const relatedModel = location.pathname.includes("/product/")
      ? "Product"
      : "accountgame";
    const relatedId = productId || gameId;
    const commentData: CommentStrProps = {
      body: commentBody,
      user: decodedToken.userId, // Ensure user ID is retrieved correctly
      relatedId: relatedId,
      relatedModel: relatedModel,
      rating,
    };
    try {
      const { data } = await addCommentService(commentData);
      toast.success(data.message); // Corrected the spelling of 'message'
      setCommentBody("");
      setRating(0);
    } catch (err) {
      console.log(err);
      toast.error("Error adding comment."); // Optional error notification
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };
  console.log(Product);
  return (
    <div className="relative ">
      <h5>نظرات کاربران</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <div className="">
          {Product?.comments &&
            Product.comments.map((comment: Comment) => {
              // Find the rating for this specific user
              const userRating = Product?.rating?.individualRatings?.find(
                (star) => star.commentId === comment._id
              );
              return (
                <div
                  key={comment._id}
                  className="border-2 border-secondery p-2 rounded-lg mb-5 w-full"
                >
                  <div className="flex items-center my-5">
                    <img
                      className="w-10 h-10 rounded-full ml-5"
                      src={comment?.user?.profile}
                      alt="User Profile"
                    />
                    <p>{comment?.user?.email}</p>
                  </div>
                  <p>{comment?.body}</p>
                  <div className="flex items-center justify-between">
                    {userRating && (
                      <div className="flex items-center space-x-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={` text-2xl ${
                              star <= userRating.rating
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                    <p>{comment?.createdAt}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex flex-col sticky top-20 self-start shadowhand p-5 rounded-xl">
          {" "}
          {Product?.rating?.totalRatings} نظر
          {Product?.rating?.averageRating} میانگین
          <textarea
            name="comment" // Use a consistent name
            value={commentBody} // Bind to commentBody state
            onChange={handleChange}
            className="px-5 py-1 rounded-lg border-primary border-2 my-5 "
            title="Comment"
            placeholder="نظر خود را در باره این محصول بنویسید..." // Optional placeholder for user guidance
          />
          <div className="">
            <label>امتیاز</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          {/* <button onClick={handleAddComment}>Add Comment</button> */}
          <BtnTow
            ButtonColor="bg-green-500 hover:from-green-500 hover:to-green-400 hover:ring-green-400"
            ButtonText={"ثبت نظر"}
            onClick={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentsTab;
