import React, { useState } from 'react';
import { useOptimistic } from 'react';

function CommentForm() {
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  const [error, setError] = useState(null); // State for error handling

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Optimistic update immediately
    addOptimisticComment({
      id: 'optimistic',
      text: formData.get('comment'),
      pending: true,
    });

    try {
      // Perform the actual update
      const newComment = await submitComment(formData);
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (err) {
      setError('Failed to submit comment. Please try again.');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} aria-describedby="error-message">
        <input
          name="comment"
          placeholder="Write a comment..."
          required
          aria-label="Comment input"
        />
        <button type="submit">Add Comment</button>
      </form>
      {error && (
        <p id="error-message" className="text-red-500">
          {error}
        </p>
      )}
      <ul>
        {optimisticComments.map((comment) => (
          <li
            key={comment.id}
            className={comment.pending ? 'opacity-70' : ''}
            aria-busy={comment.pending}
          >
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