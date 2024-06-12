import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Steps, Form as AntdForm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PassoContext } from './Passo';
import Button from './Button';

export function Form({ children, etapas, onFinalStep, stepTitles, defaultValues }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = AntdForm.useForm();

  const nextStep = useCallback(() => {
    if (currentStep < etapas - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === etapas - 1 && onFinalStep) {
      // Coleta os dados ao finalizar todos os passos
      const currentFormData = form.getFieldsValue(true);
      onFinalStep(currentFormData);
    }
  }, [currentStep, etapas, onFinalStep, form]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const stepsItems = Array.from({ length: etapas }).map((_, index) => ({
    title: stepTitles[index],
    icon: currentStep === index ? <LoadingOutlined /> : undefined,
  }));

  return (
    <PassoContext.Provider value={{ currentStep, form }}>
      <AntdForm form={form} className="form-step-container" initialValues={defaultValues}>
        <Steps current={currentStep} items={stepsItems} className="mb-8" />
        {React.Children.toArray(children)[currentStep]}
        <div className="flex my-8 gap-8">
          {currentStep > 0 && (
            <Button variant="secondary" onClick={prevStep}>
              Anterior
            </Button>
          )}
          <Button variant="primary" onClick={nextStep}>
            {currentStep < etapas - 1 ? 'Próximo' : 'Enviar'}
          </Button>
        </div>
      </AntdForm>
    </PassoContext.Provider>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  etapas: PropTypes.number.isRequired,
  onFinalStep: PropTypes.func,
  stepTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValues: PropTypes.object,
};
