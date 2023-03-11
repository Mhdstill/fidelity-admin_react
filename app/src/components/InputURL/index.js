import { useState } from 'react';

function InputURL(props) {
  const { domain, placeholder } = props;
  const [url, setURL] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(true);

  function handleUrlChange(event) {
    const url = event.target.value.trim();
    const regex = new RegExp(`(?:(?:http|https):\/\/)?(?:www.)?(?:${domain})\/@?(\\w+)`)
    console.log(regex);
    if (regex.test(url)) {
      setURL(url);
      setIsUrlValid(true);
    } else {
      setIsUrlValid(false);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(event) => setURL(event.target.value)}
        onBlur={handleUrlChange}
        placeholder={placeholder}
      />
      {!isUrlValid && <div>L'URL indiqué est invalide </div>}
    </div>
  );
}

export default InputURL;
