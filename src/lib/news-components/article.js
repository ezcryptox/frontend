import { ServerURl } from "$lib/backendUrl";
import axios from "axios"
function formatArticles(articles) {
  function formatDate(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${dayOfWeek} ${month}-${day}`;
  }

  // Group articles by date
  const groupedArticles = articles.reduce((acc, article) => {
    const dateKey = formatDate(new Date(article.createdAt));
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push({ ...article, date: new Date(article.createdAt) });
    return acc;
  }, {});

  // Convert the grouped articles object to an array of objects for easier processing
  return Object.keys(groupedArticles).map(date => {
    return {
      date,
      articles: groupedArticles[date]
    };
  });
}


async function articleList(category, type = "news") {
  try {
    const { articles } = (await axios.get(`${ServerURl()}/api/article/list?${category ? `category=${category}&` : ''}type=${type}&limit=100`)).data
    return formatArticles(articles)
  } catch (error) {
    console.log(error)
    return [];
  }
}
async function articleDetail(id) {
  try {
    const article = (await axios.get(`${ServerURl()}/api/article/detail/${id}`)).data
    return article
  } catch (error) {
    console.log(error)
    return null;
  }
}
async function likeArticle(id, token) {
  try {
    const article = (await axios.post(`${ServerURl()}/api/article/praise/${id}`), {}, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).data
    return article
  } catch (error) {
    console.log(error)
    return null;
  }
}
export {
  formatArticles,
  articleList,
  articleDetail,
  likeArticle
}