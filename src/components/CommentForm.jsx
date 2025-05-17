import React, { useState } from 'react';
import { useOptimistic } from 'react';
import PropTypes from 'prop-types';

export function CommentForm() { // Changed to named export
  const [input, setInput] = useState(''); // State for input value
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments, // Pass the current comments state
    (state, newComment) => [...state, newComment]
  );
  const [error, setError] = useState(null); // State for error handling

  // Added state for loading/submitting status
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    // Directly use the controlled input's state
    const commentText = input;

    // Basic validation
    if (!commentText || !commentText.trim()) {
      setError('Comment cannot be empty. Please enter your comment.');
      return;
    }

    // Use a unique temporary ID for the optimistic comment
    const optimisticId = `optimistic-${Date.now()}`;

    // Optimistic update immediately
    addOptimisticComment({
      id: optimisticId, // Use the unique temporary ID
      text: commentText,
      pending: true, // Mark as pending
    });

    setInput(''); // Clear input field immediately
    setIsSubmitting(true); // Set loading state
    setError(null); // Clear previous errors

    try {
      // Perform the actual update
      const newComment = await submitComment(commentText);

      // Replace optimistic comment with actual comment when resolved
      setComments(prevComments =>
        prevComments.map(comment => comment.id === optimisticId ? newComment : comment)
      );
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Failed to submit comment. Please try again.');
      // Optionally, you could set the `pending` status to `false` and add an `error` property to the comment instead of removing it

      // Update the base state: Remove the optimistic comment on failure
      setComments((prevComments) =>
        prevComments.filter(comment => comment.id !== optimisticId)
      );

    } finally {
      setIsSubmitting(false); // Clear loading state
    }
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="mb-4 text-lg font-bold">Leave a Comment</h2>
      <form onSubmit={handleSubmit} aria-describedby="error-message" className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          name="comment"
          placeholder="Write a comment..."
          required
          aria-label="Comment input"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state
          disabled={isSubmitting} // Disable when submitting
          className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200" // Added styling
        />
        <button
          type="submit"
          disabled={isSubmitting} // Disable when submitting
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed" // Added styling & disabled state
        >
          {isSubmitting ? 'Submitting...' : 'Add Comment'}
        </button>
      </form>
      {error && (
        <p id="error-message" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
      <ul className="space-y-2"> {/* Added list styling */}
        {optimisticComments.map((comment) => (
          <li
            key={comment.id}
            className={`p-3 bg-white border border-gray-200 rounded-md shadow-sm ${comment.pending ? 'opacity-50 italic' : ''}`}
            aria-busy={comment.pending}
          >
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

async function submitComment(commentText) {
  // Simulate an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random failure for testing rollback
      // if (Math.random() > 0.7) {
      //   return reject(new Error('Simulated network error'));
      // }
      resolve({
        id: `comment-${Date.now().toString()}`, // More specific ID
        text: commentText,
        pending: false,
      });
    }, 1000);
  });
}

CommentForm.propTypes = {
};