import './style.scss';

const Step = ({
  //  onChangeActiveSection,
  activeSection,
}) => {
  const SECTION_LIST = [
    {
      number: 1,
      label: 'Delivery',
    },
    {
      number: 2,
      label: 'Payment',
    },
    {
      number: 3,
      label: 'Finish',
    },
  ];

  return (
    <div className="stepper">
      <div className="stepper-wrapper">
        {SECTION_LIST.map(({ number, label }) => {
          return (
            <button
              key={number}
              className="stepper-item"
              // onClick={() => onChangeActiveSection(number)}
            >
              <div
                className={`${
                  activeSection >= number
                    ? 'stepper-item-count-complete'
                    : 'stepper-item-count'
                }`}>
                {number}
              </div>
              <div className="stepper-item-name">{label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { Step };
