// src/components/features/CommentForm.jsx
import React, { useState, useOptimistic } from 'react';

// Mock function to simulate submitting a comment to a server
async function submitComment(formData) {
  const commentText = formData.get('comment');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a successful submission
  // In a real app, this would come from the server response
  return {
    id: crypto.randomUUID(), // Generate a unique ID
    text: commentText,
    pending: false, // No longer pending
  };
}

function CommentForm() {
  // State for the actual list of comments (source of truth)
  const [comments, setComments] = useState([
    { id: 'initial-1', text: 'Hello World!', pending: false },
  ]);

  // Optimistic state for comments
  // It takes the current state (comments) and an update function
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentState, newCommentText) => [
      ...currentState,
      {
        id: crypto.randomUUID(), // Temporary optimistic ID
        text: newCommentText,
        pending: true, // Mark as pending
      },
    ]
  );

  async function handleSubmit(formData) {
    const commentText = formData.get('comment');
    addOptimisticComment(commentText); // Add optimistic update immediately

    // Then perform the actual update
    const newComment = await submitComment(formData);
    setComments(prevComments => [...prevComments, newComment]); // Update the actual state
  }

  return (
    <div className="max-w-md p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-neutral-textPrimary dark:text-neutral-textPrimary-dark">Comments</h2>
      <form action={handleSubmit} className="mb-6">
    <label htmlFor="comment-input" className="sr-only">Write a comment</label>
    <input
      id="comment-input"
      type="text" name="comment"
      placeholder="Write a comment..."
      className="w-full p-2 mb-2 border rounded-md border-neutral-300 dark:border-neutral-600 bg-neutral-background dark:bg-neutral-background-dark text-neutral-textPrimary dark:text-neutral-textPrimary-dark focus:ring-brand-primary focus:border-brand-primary" required />
    <button type="submit" className="px-4 py-2 text-white transition-colors rounded-md bg-brand-primary hover:bg-brand-primary-dark"> {/* Consider adding disabled state and loading text */}
          Add Comment
        </button>
      </form>
      <ul className="space-y-2">
        {optimisticComments.map(comment => (
          <li key={comment.id} className={`p-2 border rounded-md ${comment.pending ? 'opacity-60 bg-neutral-100 dark:bg-neutral-700' : 'bg-neutral-surface dark:bg-neutral-surface-dark'} text-neutral-textSecondary dark:text-neutral-textSecondary-dark`}>
            {comment.text}
            {comment.pending && <span className="ml-2 text-xs">(Sending...)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentForm;