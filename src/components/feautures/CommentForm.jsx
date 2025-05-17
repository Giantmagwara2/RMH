// src/components/features/CommentForm.jsx
import React, { useState, useOptimistic, useRef } from 'react';

// Mock function to simulate submitting a comment to a server
async function submitComment(formData) {
  const commentText = formData.get('comment');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a random failure
  if (Math.random() < 0.3) { // 30% chance of failure
    throw new Error("Failed to submit comment. Please try again.");
  }

  // Simulate a successful submission
  // In a real app, this would come from the server response
  return {
    id: crypto.randomUUID(), // Generate a unique ID
    text: commentText,
    author: "User", // Example: could be dynamic
    timestamp: new Date().toISOString(),
    pending: false, // No longer pending
  };
}

function CommentForm() {
  // State for the actual list of comments (source of truth)
  const [comments, setComments] = useState([
    { id: 'initial-1', text: 'Hello World!', pending: false },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null); // Ref for the form element

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
    if (!commentText.trim()) return; // Prevent submitting empty comments

    setIsSubmitting(true);
    setError(null);
    addOptimisticComment(commentText); // Add optimistic update immediately

    try {
      // Then perform the actual update
      const newComment = await submitComment(formData);
      setComments(prevComments => {
        // Replace the optimistic comment with the real one or add if not found (though it should be)
        // This example simply adds the new server-confirmed comment.
        // A more robust solution might involve matching by a temporary ID if needed.
        return [...prevComments.filter(c => c.text !== commentText || !c.pending), newComment];
      });
      formRef.current?.reset(); // Reset the form fields
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      // Revert optimistic update by resetting comments to the last known good state
      // This simple revert might not be ideal if multiple optimistic updates can happen.
      // For more complex scenarios, you might need to filter out the specific failed optimistic comment.
      setComments(prevComments => prevComments.filter(c => c.text !== commentText || !c.pending));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-md p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-neutral-textPrimary dark:text-neutral-textPrimary-dark">Comments</h2>
      <form action={handleSubmit} ref={formRef} className="mb-6" aria-busy={isSubmitting}>
    <label htmlFor="comment-input" className="sr-only">Write a comment</label>
    <input
      id="comment-input"
      type="text" name="comment"
      placeholder="Write a comment..."
      className="w-full p-2 mb-2 border rounded-md border-neutral-300 dark:border-neutral-600 bg-neutral-background dark:bg-neutral-background-dark text-neutral-textPrimary dark:text-neutral-textPrimary-dark focus:ring-brand-primary focus:border-brand-primary disabled:opacity-50"
      required
      disabled={isSubmitting} />
    <button type="submit" className="px-4 py-2 text-white transition-colors rounded-md bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Add Comment'}
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
      {error && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
          Error: {error}
        </p>
      )}
    </div>
  );
}

export default CommentForm;