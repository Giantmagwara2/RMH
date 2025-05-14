// /src/components/ui/FormStepper.stories.jsx

import React from 'react';
import { useForm } from '../../hooks/useForm';
import { Form } from './Form';
import { Input } from './Input';
import { FormStepper } from './FormStepper';

export default {
  title: 'UI/FormStepper',
  component: FormStepper,
};

export const MultiStepForm = () => {
  const steps = [
    {
      title: 'Your Name',
      content: ({ values, errors, onChange }) => (
        <div>
          <Input name="name" label="Name" value={values.name || ''} error={errors.name} onChange={onChange} />
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
          <Input name="email" label="Email" value={values.email || ''} error={errors.email} onChange={onChange} />
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

export const NameValidation = () => {
  const { values, errors, handleChange } = useForm({
    initialValues: { name: '' },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = 'Name is required';
      return errors;
    },
  });

  return (
    <Form>
      <Input
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter your name"
      />
    </Form>
  );
};

export const AgeValidation = () => {
  const { values, errors, handleChange } = useForm({
    initialValues: { age: '' },
    validate: (values) => {
      const errors = {};
      if (!values.age) errors.age = 'Age is required';
      return errors;
    },
  });

  return (
    <Form>
      <Input
        name="age"
        value={values.age}
        onChange={handleChange}
        error={errors.age}
        placeholder="Enter your age"
      />
    </Form>
  );
};

export const ConditionalSteps = () => {
  const steps = [
    {
      title: 'Your Name',
      content: ({ values, errors, onChange }) => (
        <Form>
          <Input name="name" label="Name" value={values.name || ''} error={errors.name} onChange={onChange} />
        </Form>
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
        <Form>
          <Input name="age" label="Age" value={values.age || ''} error={errors.age} onChange={onChange} />
        </Form>
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
      shouldInclude: (values) => {
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
          <Input name="name" label="Name" value={values.name || ''} error={errors.name} onChange={onChange} />
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
          <Input name="email" label="Email" value={values.email || ''} error={errors.email} onChange={onChange} />
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
        customStyles="bg-gray-100 p-4 rounded-md"
      />
    </div>
  );
};

// Added a story to demonstrate custom styles and aria-live updates
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
      customStyles="p-4 bg-gray-50 rounded-lg"
    />
  );
};
