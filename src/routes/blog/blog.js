import { ServerURl } from "$lib/backendUrl";
import axios from "axios"


async function blogList() {
  try {
    const { allBlogPosts: blogs, blogCarousel: { blogPost: pinned } } = (await axios.get(`${ServerURl()}/api/blog/list?limit=100`)).data
    return {blogs, pinned}
  } catch (error) {
    console.log(error)
    return [];
  }
}
async function searchBlog(query) {
  try {
    const { blogPosts: blogs } = (await axios.get(`${ServerURl()}/api/blog/search/${query}`)).data
    return { blogs }
  } catch (error) {
    console.log(error)
    return [];
  }
}
async function blogDetail(id) {
  try {
    const article = (await axios.get(`${ServerURl()}/api/blog/detail/${id}`)).data
    return article
  } catch (error) {
    console.log(error)
    return null;
  }
}
export {
  blogList,
  blogDetail,
  searchBlog
}