// /src/components/ui/FormStepper.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button'; // Corrected to default import
export const FormStepper = ({ steps, onComplete, initialStep = 0, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // Compute filtered steps based on shouldShow logic
  const filteredSteps = steps.filter(
    (step) => typeof step.shouldShow === 'function' ? step.shouldShow(formValues) : true
  );

  const current = steps[currentStep];
  const currentFilteredIndex = filteredSteps.findIndex((s) => s === current);
  const isFirstFilteredStep = currentFilteredIndex === 0;
  const isLastFilteredStep = currentFilteredIndex === filteredSteps.length - 1;

  const handleNext = async () => {
    if (current.validate) {
      const { isValid, values, errors } = await current.validate(formValues);
      if (!isValid) {
        setFormErrors(errors);
        return;
      }
      setFormValues(values);
      setFormErrors({});
    }

    // Move to next visible step
    const nextStep = steps.findIndex((step, index) =>
      index > currentStep &&
      (typeof step.shouldShow !== 'function' || step.shouldShow(formValues))
    );

    if (nextStep !== -1) {
      setCurrentStep(nextStep);
    } else {
      onComplete?.(formValues);
    }
  };

  const handlePrevious = () => {
    let prevVisibleStepIndex = -1;
    for (let i = currentStep - 1; i >= 0; i--) {
      const step = steps[i];
      if (typeof step.shouldShow !== 'function' || step.shouldShow(formValues)) {
        prevVisibleStepIndex = i;
        break;
      }
    }
    if (prevVisibleStepIndex !== -1) {
      setCurrentStep(prevVisibleStepIndex);
    }
  };

  return (
    <div className={`space-y-space-lg ${className}`} aria-live="polite">
      {/* Step Progress Indicator */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-space-md">
        {filteredSteps.map((step, idx) => (
          <div
            key={idx}
            className={`flex-1 text-center px-1 ${
              step === current ? 'font-semibold text-primary' : ''
            }`}
            aria-current={step === current ? 'step' : undefined}
          >
            Step {idx + 1}: {step.title}
          </div>
        ))}
      </div>

      {/* Render Step Content */}
      <div>
        {typeof current.content === 'function'
          ? current.content({ values: formValues, errors: formErrors, onChange: (e) =>
              setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            })
          : current.content}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between border-t border-gray-200 gap-space-md pt-space-md dark:border-gray-700">
        <Button onClick={handlePrevious} disabled={isFirstFilteredStep} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext}>
          {isLastFilteredStep ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

FormStepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
      validate: PropTypes.func,
      shouldShow: PropTypes.func, // optional conditional rendering logic
    })
  ).isRequired,
  onComplete: PropTypes.func.isRequired,
  initialStep: PropTypes.number,
  className: PropTypes.string, // Renamed from customStyles
};
