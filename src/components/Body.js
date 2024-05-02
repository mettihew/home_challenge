
import style from './Body.module.css'
import { useEffect, useState } from 'react'

function Body() {
  const [guardian, setGuardian] = useState()
  const [ny, setNy] = useState()
  const [newsApi, setNewsApi] = useState()

  // FETCHING THE NEWS
  useEffect(() => {

    //GUARDIAN
    async function newsData1() {
      const GUARDIAN_API = await fetch(`https://content.guardianapis.com/search?api-key=ac83f541-8a6f-49b6-a8fe-7af22e4f4924&`)
      const g = await GUARDIAN_API.json()
      const guardianMap = g.response.results.map(ev => (
        <div key={ev.id} className={style.title}>
          <a href={ev.webUrl}>{ev.webTitle}</a>
        </div>
      ))
      setGuardian(guardianMap)
    }
    newsData1()

    //NEW YORK TIMES
    async function newsData2() {
      const NY_API = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=pFRWaAYSzJcy93VdWbwBz8squ4LkfIeq`)
      const n = await NY_API.json()
      const nyMap = n.response.docs.map(ev => (
        <div key={ev._id} className={style.title}>
          <a href={ev.web_url}>{ev.abstract}</a>
        </div>
      ))
      setNy(nyMap)
    }
    newsData2()

    // NEWS_API
    async function newsData3() {
      const NEWSAPI_API = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=d7116b1cbcfd4fdd9e28ca60ba30ec7c')
      const na = await NEWSAPI_API.json()
      const newsApiMap = na.articles.map(ev => (
        <div key={Math.random()} className={style.title}>
          <a href={ev.url}>{ev.title}</a>
        </div>
      ))
      setNewsApi(newsApiMap)
    }
    newsData3()

  }, [])


  return (
    <div className={style.body}>

      <div>
        {guardian && <h1>The Guardian</h1> }
        {guardian}
      </div>

      <div>
        {newsApi &&  <h1>News</h1> }
        {newsApi}
      </div> 

      <div>
        {ny && <h1>New York Times</h1> }
        {ny}
      </div>

     
    </div>
  )
}
export default Body