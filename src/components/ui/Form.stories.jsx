import React from 'react';
import { Form } from './Form';
import { Input } from './Input';
import { Button } from './Button';
import { useForm } from '@/lib/hooks/useForm';
import { z } from 'zod';

const meta = {
  title: 'UI/Form',
  component: Form,
  tags: ['autodocs'],
}; // Removed 'satisfies' keyword for compatibility

export default meta;

// ✅ Validation schema using Zod
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const ValidationForm = {
  name: 'Validation Form (with useForm + zod)',
  render: ValidationFormComponent,
};

function ValidationFormComponent() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const result = schema.safeParse(values);
      if (!result.success) {
        return result.error.flatten().fieldErrors;
      }
      return {};
    },
    onSubmit: (formValues) => {
      alert(`Form submitted with: ${JSON.stringify(formValues, null, 2)}`);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-6 space-y-6">
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            placeholder="you@example.com"
          />
          {touched.email && errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            placeholder="••••••••"
          />
          {touched.password && errors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Form>

      <div className="p-4 font-mono text-sm bg-gray-100 rounded">
        <h4 className="mb-2 font-bold">Form Values:</h4>
        <pre className="break-words whitespace-pre-wrap">
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export const ValidationFormDark = {
  name: 'Validation Form (Dark Mode)',
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
  render: ValidationFormDarkComponent,
};

function ValidationFormDarkComponent() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const result = schema.safeParse(values);
      if (!result.success) {
        return result.error.flatten().fieldErrors;
      }
      return {};
    },
    onSubmit: (formValues) => {
      alert(`Form submitted with: ${JSON.stringify(formValues, null, 2)}`);
    },
  });

  return (
    <div className="max-w-md p-6 mx-auto mt-6 space-y-6 text-white rounded-md shadow-md bg-zinc-900">
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            placeholder="you@example.com"
            className="text-white bg-zinc-800 border-zinc-700"
          />
          {touched.email && errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            placeholder="••••••••"
            className="text-white bg-zinc-800 border-zinc-700"
          />
          {touched.password && errors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Form>

      <div className="p-4 font-mono text-sm rounded bg-zinc-800 text-zinc-300">
        <h4 className="mb-2 font-bold text-white">Form Values:</h4>
        <pre className="break-words whitespace-pre-wrap">
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export const Default = {
  name: 'Default Form (Auto-wired Inputs)',
  render: () => (
    <Form onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
      <Input name="email" label="Email" placeholder="Enter your email" />
      <Input name="password" label="Password" type="password" placeholder="Enter your password" />
      <Button type="submit" className="mt-4">Submit</Button>
    </Form>
  ),
};

export const CustomStyles = {
  name: 'Form with Custom Styles',
  render: () => (
    <Form
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      customStyles="bg-gray-100 p-4 rounded-md"
    >
      <Input name="email" label="Email" placeholder="Enter your email" />
      <Input name="password" label="Password" type="password" placeholder="Enter your password" />
      <Button type="submit" className="mt-4">Submit</Button>
    </Form>
  ),
};

// Added a story to demonstrate custom styles and aria-live updates
export const CustomStyledForm = {
  name: 'Custom Styled Form',
  render: () => (
    <Form
      onSubmit={(values) => alert(`Submitted: ${JSON.stringify(values)}`)}
      customStyles="bg-gray-100 p-4 rounded-lg"
      aria-label="Custom Styled Form"
    >
      <Input name="username" placeholder="Enter your username" />
      <Input name="password" type="password" placeholder="Enter your password" />
      <Button type="submit">Submit</Button>
    </Form>
  ),
};
