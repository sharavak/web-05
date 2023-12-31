import Style from "./Card.module.css";

import PostArticle from "./postArticle";

const Card = ({ data }) => {
  let islogged = false;
  if ('user-info' in localStorage)
    islogged = true
  else
    islogged = false
  return (
    <>
      <h1
        style={{
          // margin: "10px 0px 0px 20px",
          // display: "flex",
          // alignitems: "center",
          // justifycontent: "center",
          // textalign: "center",
          // padding: "0",

          backgroundColor: 'rgb(211,211,211)',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans serif'
        }}
      >

      </h1>
      <div className={`page ${Style.container}`}>
        {data
          ? data.map((value, index) => (
            <div className={`cards ${Style.card}`} key={index}>
              <img src={value.urlToImage} alt="image" className={Style.img} />
              {islogged && <PostArticle checked={('checked' in value) ? true : false}
                content={value.content} author={value.author}
                url={value.url} urlToImage={value.urlToImage}
                title={value.title} description={value.description} name={value.name} />
              }
              <div className={Style.detaile}>
                <h2 className={Style.title}>{value.title}</h2>
                {'source' in value && <h5 className={Style.src}>{value.source.name}</h5>}
                <p className={Style.des}>{value.description}</p>
                <a href={value.url} target="blank" style={{
                  textDecoration: "none",
                  color: "gray"
                }}>
                  View More...
                </a>
              </div>
            </div>
          ))
          : "Please Wait....."}
      </div>
    </>
  );
};

export default Card;
