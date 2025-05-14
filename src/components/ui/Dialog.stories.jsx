import React, { useState } from 'react';
import Dialog from './Dialog';
import Button from './Button';

export default {
  title: 'UI/Dialog',
  component: Dialog,
};

export const Default = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-space-md">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        actions={[
          <Button key="cancel" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="confirm" onClick={() => alert('Confirmed!')}>
            Confirm
          </Button>,
        ]}
      >
        Are you sure you want to proceed with this action? This cannot be undone.
      </Dialog>
    </div>
  );
};

// Added a story to demonstrate accessibility with aria-labelledby and aria-describedby
export const AccessibleDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-space-md">
      <Button onClick={() => setOpen(true)}>Open Accessible Dialog</Button>
      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Accessible Dialog"
        actions={[
          <Button key="cancel" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="confirm" onClick={() => alert('Confirmed!')}>
            Confirm
          </Button>,
        ]}
      >
        This dialog demonstrates accessibility with aria-labelledby and aria-describedby.
      </Dialog>
    </div>
  );
};
