// /src/components/ui/FormStepper.stories.jsx

import React from 'react';
// Removed useForm and Form imports as they are not directly used by FormStepper stories here.
// Input is used within the step content.
import { Input } from './Input';
import { FormStepper } from './FormStepper';

export default {
  title: 'UI/FormStepper',
  component: FormStepper,
  argTypes: {
    initialStep: {
      control: { type: 'number', min: 0 },
      description: 'The initial step index to start the stepper from.',
    },
    className: { control: 'text', description: 'Custom CSS classes for the stepper container.' },
    // `steps` and `onComplete` are complex and better demonstrated through specific story args.
  },
};

export const MultiStepForm = () => {
  const steps = [
    {
      title: 'Your Name',
      content: ({ values, errors, onChange }) => (
        <div>
          <Input
            name="name"
            label="Name"
            value={values.name || ''}
            error={errors?.name} // Ensure errors object exists
            onChange={onChange}
          />
        </div>
      ),
      validate: async (values) => {
        const errors = {};
        if (!values.name) errors.name = 'Name is required';
        return { isValid: Object.keys(errors).length === 0, errors, values };
      },
    },
    {
      title: 'Your Email',
      content: ({ values, errors, onChange }) => (
        <div>
          <Input
            name="email"
            label="Email"
            value={values.email || ''}
            error={errors?.email} // Ensure errors object exists
            onChange={onChange}
          />
        </div>
      ),
      validate: async (values) => {
        const errors = {};
        if (!values.email) errors.email = 'Email is required';
        return { isValid: Object.keys(errors).length === 0, errors, values };
      },
    },
    {
      title: 'Review',
      content: ({ values }) => (
        <div className="text-sm space-y-space-sm">
          <p><strong>Name:</strong> {values.name}</p>
          <p><strong>Email:</strong> {values.email}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-lg mx-auto">
      <FormStepper
        steps={steps}
        onComplete={(values) => alert(`Form submitted: ${JSON.stringify(values, null, 2)}`)}
      />
    </div>
  );
};

export const ConditionalSteps = () => {
  const steps = [
    {
      title: 'Your Name',
      content: ({ values, errors, onChange }) => (
        // The FormStepper itself handles form state per step, no need for an outer Form here
        <Input name="name" label="Name" value={values.name || ''} error={errors?.name} onChange={onChange} />
      ),
      validate: async (values) => {
        const errors = {};
        if (!values.name) errors.name = 'Name is required';
        return { isValid: Object.keys(errors).length === 0, errors, values };
      },
    },
    {
      title: 'Your Age',
      content: ({ values, errors, onChange }) => (
        <Input name="age" label="Age" type="number" value={values.age || ''} error={errors?.age} onChange={onChange} />
      ),
      validate: async (values) => {
        const errors = {};
        if (!values.age) errors.age = 'Age is required';
        return { isValid: Object.keys(errors).length === 0, errors, values };
      },
    },
    {
      title: 'Minor Consent Form',
      content: () => (
        <div className="text-sm">
          <p>Please confirm that you have parental consent to continue.</p>
        </div>
      ),
      shouldShow: (values) => { // Corrected prop name from shouldInclude to shouldShow
        const age = parseInt(values.age, 10);
        return !isNaN(age) && age < 18;
      },
    },
    {
      title: 'Review',
      content: ({ values }) => (
        <div className="text-sm space-y-space-sm">
          <p><strong>Name:</strong> {values.name}</p>
          <p><strong>Age:</strong> {values.age}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-lg mx-auto">
      <FormStepper
        steps={steps}
        onComplete={(values) => alert(`Submitted: ${JSON.stringify(values, null, 2)}`)}
      />
    </div>
  );
};

export const CustomStyles = () => {
  const steps = [
    {
      title: 'Your Name',
      content: ({ values, errors, onChange }) => (
        <div>
          <Input
            name="name"
            label="Name"
            value={values.name || ''}
            error={errors?.name}
            onChange={onChange}
          />
        </div>
      ),
      validate: async (values) => {
        const errors = {};
        if (!values.name) errors.name = 'Name is required';
        return { isValid: Object.keys(errors).length === 0, errors, values };
      },
    },
    {
      title: 'Your Email',
      content: ({ values, errors, onChange }) => (
        <div>
          <Input
            name="email"
            label="Email"
            value={values.email || ''}
            error={errors?.email}
            onChange={onChange}
          />
        </div>
      ),
      validate: async (values) => {
        const errors = {};
        if (!values.email) errors.email = 'Email is required';
        return { isValid: Object.keys(errors).length === 0, errors, values };
      },
    },
    {
      title: 'Review',
      content: ({ values }) => (
        <div className="text-sm space-y-space-sm">
          <p><strong>Name:</strong> {values.name}</p>
          <p><strong>Email:</strong> {values.email}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-lg mx-auto">
      <FormStepper
        steps={steps}
        onComplete={(values) => alert(`Form submitted: ${JSON.stringify(values, null, 2)}`)}
        className="p-4 bg-gray-100 rounded-md" // Changed customStyles to className
      />
    </div>
  );
};
// Renamed for clarity
export const CustomStyledStepper = () => {
  const steps = [
    {
      title: 'Step 1',
      content: ({ values, onChange }) => <Input name="step1" placeholder="Step 1 input" value={values.step1 || ''} onChange={onChange} />,
    },
    {
      title: 'Step 2',
      content: ({ values, onChange }) => <Input name="step2" placeholder="Step 2 input" value={values.step2 || ''} onChange={onChange} />,
    },
  ];

  return (
    <FormStepper
      steps={steps}
      onComplete={(values) => alert(`Completed: ${JSON.stringify(values)}`)}
      className="p-4 rounded-lg bg-gray-50" // Changed customStyles to className
    />
  );
};
