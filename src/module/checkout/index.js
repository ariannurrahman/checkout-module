import { useState } from 'react';

import { useCheckoutStore } from 'store';
import { Delivery } from './delivery';
import { Divider } from './components/divider';
import { Finish } from './finish';
import { Payment } from './payment';
import { Section, Step } from '../../components';
import { Summary } from './components/summary';

import './style.scss';

const Checkout = () => {
  const _activeSection =
    JSON.parse(localStorage.getItem('jakmal-checkout'))?.state?.activeSection ||
    1;

  const setActiveSectionStore = useCheckoutStore(
    (state) => state.setActiveSection
  );

  // [delivery 1 | finish 2 | payment 3]
  const [activeSection, setActiveSection] = useState(_activeSection);
  const onChangeActiveSection = (section = '') => {
    setActiveSection(section);
    setActiveSectionStore(section);
  };

  return (
    <div className="checkout-wrapper">
      <Step
        activeSection={activeSection}
        onChangeActiveSection={onChangeActiveSection}
      />
      <Section>
        {activeSection === 1 && (
          <Delivery onChangeActiveSection={onChangeActiveSection} />
        )}
        {activeSection === 2 && (
          <Payment onChangeActiveSection={onChangeActiveSection} />
        )}
        {activeSection === 3 && (
          <Finish onChangeActiveSection={onChangeActiveSection} />
        )}
        <Divider />
        <Summary
          onChangeActiveSection={onChangeActiveSection}
          activeSection={activeSection}
          isDropship={false}
        />
      </Section>
    </div>
  );
};

export { Checkout };

// export { Delivery, Finish, Payment };
