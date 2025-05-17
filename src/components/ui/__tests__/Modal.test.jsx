import React from 'react'; 
import { render, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    const { getByRole } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    expect(getByRole('dialog')).toBeInTheDocument(); 
  });

  it('does not render when isOpen is false', () => {
    const { queryByRole } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    expect(queryByRole('dialog')).not.toBeInTheDocument(); 
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    const { getByLabelText } = render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    fireEvent.click(getByLabelText('Close modal')); 
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' }); 
    expect(handleClose).toHaveBeenCalled(); 
  });
});