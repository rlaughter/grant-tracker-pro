
import React from 'react';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { Card } from 'primevue/card';

export const TestPrimeVue = () => {
  return (
    <div className="p-4">
      <Card title="PrimeVue Test Component">
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText id="username" />
            <label htmlFor="username">Username</label>
          </span>
          <Button label="PrimeVue Button" icon="pi pi-check" />
        </div>
      </Card>
    </div>
  );
};
