import React, { useState, useEffect } from 'react';

function InputColor(props) {
  const { label, value, onChange } = props;

  const [color, setColor] = useState(value);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    onChange(newColor);
  };

  useEffect(() => {
    setColor(value);
}, [value]);

  return (
    <div>
      <input type="color" value={color} onChange={handleColorChange} />
      <span>{color}</span>
    </div>
  );
}

export default InputColor;