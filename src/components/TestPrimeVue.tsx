
import React from 'react';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

export const TestPrimeVue: React.FC = () => {
  return (
    <div className="p-4">
      <div className="card">
        <h3>PrimeVue Test Component</h3>
        <div className="flex flex-col gap-4">
          <div className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">Username</label>
          </div>
          <Button label="PrimeVue Button" icon="pi pi-check" />
        </div>
      </div>
    </div>
  );
};
