import React, { useState, useContext } from 'react';
import Select2 from 'react-select2';

function Select2Component(props) {
  const { options } = props;
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <Select2
      data={options}
      options={{
        placeholder: 'Sélectionnez une option',
        allowClear: true
      }}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
    />
  );
}

export default Select2Component;
