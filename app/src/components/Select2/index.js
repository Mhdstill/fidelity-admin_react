/**
 * cf: https://www.npmjs.com/package/react-multi-select-component
 */

import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const Select2 = (props) => {
    const { options, hasSelectAll = false } = props;
    const [selected, setSelected] = useState([]);
  
    return (
      <>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          hasSelectAll={hasSelectAll}
        />
      </>
    );
  };
  
  export default Select2;