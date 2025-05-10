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
  const step1Validation = async (values) => {
    const { handleSubmit, errors, values: newValues } = useForm(
      { name: values.name || '' },
      {
        name: { required: 'Name is required' },
      },
      () => {}
    );

    await handleSubmit({ preventDefault: () => {} });
    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors, values: newValues };
  };

  const step2Validation = async (values) => {
    const { handleSubmit, errors, values: newValues } = useForm(
      { email: values.email || '' },
      {
        email: { required: 'Email is required' },
      },
      () => {}
    );

    await handleSubmit({ preventDefault: () => {} });
    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors, values: newValues };
  };

  const steps = [
    {
      title: 'Your Name',
      content: ({ values, errors }) => (
        <Form>
          <Input name="name" label="Name" value={values.name || ''} error={errors.name} />
        </Form>
      ),
      validate: step1Validation,
    },
    {
      title: 'Your Email',
      content: ({ values, errors }) => (
        <Form>
          <Input name="email" label="Email" value={values.email || ''} error={errors.email} />
        </Form>
      ),
      validate: step2Validation,
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
  const nameValidation = async (values) => {
    const { handleSubmit, errors, values: newValues } = useForm(
      { name: values.name || '' },
      {
        name: { required: 'Name is required' },
      },
      () => {}
    );
    await handleSubmit({ preventDefault: () => {} });
    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors, values: newValues };
  };

  const ageValidation = async (values) => {
    const { handleSubmit, errors, values: newValues } = useForm(
      { age: values.age || '' },
      {
        age: {
          required: 'Age is required',
          pattern: {
            value: /^\d+$/,
            message: 'Age must be a number',
          },
        },
      },
      () => {}
    );
    await handleSubmit({ preventDefault: () => {} });
    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors, values: newValues };
  };

  const steps = [
    {
      title: 'Your Name',
      content: ({ values, errors }) => (
        <Form>
          <Input name="name" label="Name" value={values.name || ''} error={errors.name} />
        </Form>
      ),
      validate: nameValidation,
    },
    {
      title: 'Your Age',
      content: ({ values, errors }) => (
        <Form>
          <Input name="age" label="Age" value={values.age || ''} error={errors.age} />
        </Form>
      ),
      validate: ageValidation,
    },
    {
      title: 'Minor Consent Form',
      content: ({ values }) => (
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
