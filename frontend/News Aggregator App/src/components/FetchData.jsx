import { useState, useEffect } from 'react'
import Card from './Card'

const FetchData = ({ cat, page }) => {
  let category = cat;
  if ('user-info' in localStorage)
    category = JSON.parse(localStorage.getItem('user-info')).CategoryPreference[0];
  const [data, setData] = useState([]);
  async function callApi() {
    let res = await fetch(
      cat ? `https://customnewsapi.vercel.app/${category}/${page}` : `https://customnewsapi.vercel.app/${page}`, {
      headers: {
        "authorization": 'be4e88d35dc045f6bce46fbb07c93cc3'
      }
    });
    let result = await res.json();
    setData(result.articles);
    console.log(result)
  }

  useEffect(() => {
    setData([]);
    callApi();
  }, [cat, page]);

  return (
    <div>
      {data && data.length > 0 ? (
        <Card data={data} />
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );


}

export default FetchData
