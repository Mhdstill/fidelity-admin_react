import { useState } from 'react';

function InputURL(props) {
  const { value, setValue, domain, placeholder } = props;
  const [isUrlValid, setIsUrlValid] = useState(true);

  function handleUrlChange(event) {
    const url = event.target.value.trim();
    const regex = new RegExp(`(?:(?:http|https):\/\/)?(?:www.)?(?:${domain})\/@?(\\w+)`)
    console.log(regex);
    if (url === '' || regex.test(url)) {
      setValue(url);
      setIsUrlValid(true);
    } else {
      setIsUrlValid(false);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleUrlChange}
        placeholder={placeholder}
        className='form-control'
      />
      {!isUrlValid && <div>L'URL indiqué est invalide </div>}
    </div>
  );
}

export default InputURL;
