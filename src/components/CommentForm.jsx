import React, { useState } from 'react';
import { useOptimistic } from 'react';

function CommentForm() {
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Optimistic update immediately
    addOptimisticComment({
      id: 'optimistic',
      text: formData.get('comment'),
      pending: true,
    });

    // Perform the actual update
    const newComment = await submitComment(formData);
    setComments((prevComments) => [...prevComments, newComment]);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="comment" placeholder="Write a comment..." required />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {optimisticComments.map((comment) => (
          <li key={comment.id} className={comment.pending ? 'opacity-70' : ''}>
            {comment.text}
          </li>
        ))}
      </ul>
    </>
  );
}

async function submitComment(formData) {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        text: formData.get('comment'),
        pending: false,
      });
    }, 1000);
  });
}

export default CommentForm;