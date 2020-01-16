import {useState, useEffect} from 'react';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    const response = await fetch(apiUrl + 'media/all');
    const json = await response.json();

    const result = await Promise.all(json.files.map(async (item) => {
      const response = await fetch(apiUrl + 'media/' + item.file_id);
      return await response.json();
    }));
    console.log(result);

    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
};

export {getAllMedia};
