import React, { useState, useEffect } from 'react';

function InputColor(props) {
  const { value, setValue, divClass = '' } = props;

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setValue(newColor);
  };

  return (
    <div className={divClass}>
      <input type="color" value={value} onChange={handleColorChange} />
      <span>{value}</span>
    </div>
  );
}

export default InputColor;