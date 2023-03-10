/**
 * cf: https://www.npmjs.com/package/react-multi-select-component
 */

import React, { useState, useEffect } from 'react';
import { MultiSelect } from "react-multi-select-component";

const Select2 = (props) => {
  const { options, hasSelectAll = true, onChange } = props;
  const [selected, setSelected] = useState([]);

  const handleChange = (selected) => {
    setSelected(selected);
    if (onChange) {
      onChange(selected); // Appeler la fonction onChange passée en tant que prop pour mettre à jour les catégories sélectionnées dans le composant parent
    }
  };

  useEffect(() => {
    var selectedOptions = [];
    Object.keys(options).forEach((key) => {
      const option = options[key];
      if('selected' in option && option["selected"]){
        selectedOptions.push(option)
      }
    });
    setSelected(selectedOptions);
  }, [options]);

  const overrideStrings = {
    selectSomeItems: 'Sélectionner des options',
    allItemsAreSelected: '',
    selectAll: 'Tout sélectionner',
    search: 'Rechercher',
  };
  
  return (
    <>
      <MultiSelect
        options={options}
        value={selected}
        onChange={handleChange}
        labelledBy="Select"
        hasSelectAll={hasSelectAll}
        overrideStrings={overrideStrings}
      />
    </>
  );
};

export default Select2;