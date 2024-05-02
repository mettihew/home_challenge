
import style from './Search.module.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [guardian, setGuardian] = useState()
  const [ny, setNy] = useState()
  const [newsApi, setNewsApi] = useState()
  const [sort, setSort] = useState('relevance')
  const location = useLocation()
  const nav = useNavigate()
  const [totalPages, setTotalPages] = useState()
  const [sourceG, setGSource] = useState('guardian')
  const [sourceN, setNSource] = useState('ny')
  // const [category, setCategory] = useState()
  let [currentPage, setCurrentPage] = useState(1)

  const path = location.pathname.split('&')

  const k = location.pathname.split('&')[0]
  const keyword = k.split('=')[1]

  let GUARDIAN_API;
  let NY_API;
  let NEWSAPI_API;
  let category;

  if (path.length === 2) {
    console.log('touch');
    const c = location.pathname.split('&')[1]
    category = c.split('=')[1]
    GUARDIAN_API = `https://content.guardianapis.com/search?q=${keyword}&tag=${category}/${category}&order-by=${sort}&page=${currentPage}&api-key=ac83f541-8a6f-49b6-a8fe-7af22e4f4924`
    NY_API = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&fq=${category}&page=${currentPage}&sort=${sort}&api-key=pFRWaAYSzJcy93VdWbwBz8squ4LkfIeq`
    NEWSAPI_API = `https://newsapi.org/v2/everything?q=${keyword}&q=${category}&page=${currentPage}&sortBy=${sort}&apiKey=d7116b1cbcfd4fdd9e28ca60ba30ec7c`
  } else {
    GUARDIAN_API = `https://content.guardianapis.com/search?q=${keyword}&order-by=${sort}&page=${currentPage}&api-key=ac83f541-8a6f-49b6-a8fe-7af22e4f4924`
    NY_API = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&page=${currentPage}&sort=${sort}&api-key=pFRWaAYSzJcy93VdWbwBz8squ4LkfIeq`
    NEWSAPI_API = `https://newsapi.org/v2/everything?q=${keyword}&page=${currentPage}&sortBy=${sort}&apiKey=d7116b1cbcfd4fdd9e28ca60ba30ec7c`
  }

  console.log(category, keyword, path);



  // FETCHING THE NEWS
  useEffect(() => {

    //GUARDIAN
    async function newsData1() {
      // const GUARDIAN_API = await fetch(`https://content.guardianapis.com/search?${keyword}&tag=${category}/${category}&from-date=2014-01-01&api-key=ac83f541-8a6f-49b6-a8fe-7af22e4f4924`)
      const gggg = await fetch(GUARDIAN_API)
      const g = await gggg.json()
console.log(gggg, g);

      // MAP - (SHOWING THE RESULT)
      const guardianMap = g.response.results.map(ev => (
        <div key={ev.id} className={style.title}>
          <a href={ev.webUrl}>{ev.webTitle}</a>
          <p>{ev.webUrl.split('/')[2]}</p>
        </div>
      ))
      setGuardian(guardianMap)

      //PAGINATION
      setTotalPages(g.response.pages)
    }
    newsData1()



    //NEW YORK TIMES
    async function newsData2() {
      const nnnn = await fetch(NY_API)
      const n = await nnnn.json()
      console.log(nnnn, n);
      const nyMap = n.response.docs.map(ev => (
        <div key={ev._id} className={style.title}>
          <a href={ev.web_url}>{ev.abstract}</a>
          <p>{ev.web_url.split('/')[2]}</p>
        </div>
      ))
      setNy(nyMap)
    }
    newsData2()

    // NEWS_API
    async function newsData3() {
      const nnnn = await fetch(NEWSAPI_API)
      const na = await nnnn.json()
      const newsApiMap = na.articles.map((ev, i) => (
        <div key={i} className={style.title}>
          <a href={ev.url}>{ev.title}</a>
          <p>{ev.url.split('/')[2]}</p>
        </div>
      ))
      setNewsApi(newsApiMap)

    }
    newsData3()

  }, [sort, currentPage])

  const sourceGHandler = (ev) => {
    if (sourceG === 'guardian'){
      setGSource('')
    }else{
      setGSource(ev.target.value)
    }}

    const sourceNHandler = (ev) => {
      if (sourceN === 'ny'){
        setNSource('')
      }else{
        setNSource(ev.target.value)
      }}

  const categoryHandler = (ev) => {
    nav(`/q=${keyword}&cat=${ev.target.value}`)
    window.location.reload()
  }

  const sortHandler = (ev) => {
    setCurrentPage(1)
    setSort(ev.target.value)
    // window.location.reload()
  }

  return (
    <div className={style.body}>


      {/*  FILTER  (sorby)*/}
      <div className={style.filter}>

        <div>
          <h2>Sort by</h2>
          <select onChange={sortHandler}>
            <option value={'relevance'}>relevance (default)</option>
            <option value={'newest'}>newest</option>
            <option value={'oldest'}>oldest</option>
          </select>
        </div>

        {/*  FILTER  (category)*/}
        <div>
          <h2>Category, Tag</h2>
          <select defaultValue={category} onChange={categoryHandler}>
            {/* <option value={category} disabled>{category === '&' ? 'category' : category.split('=')[1].split('/')[1]}</option> */}
            <option value={category} disabled selected >{category ? category : 'Category'}</option>
            <option value={'sport'}>Sport</option>
            <option value={'technology'}>Technology</option>
            <option value={'politics'}>Politics</option>
          </select>
        </div>

      </div>


      {/*  FILTER  (sourse)*/}
      <div className={style.checkboxBody}>

        <div>
          <div className={style.checkbox}>
            <input type='checkbox' checked={sourceG ? true : false} onChange={sourceGHandler} value={'guardian'} />
            <label>Guardian</label>
          </div>

          <div className={style.checkbox} >
            <input type='checkbox' checked={sourceN ? true : false} onChange={sourceNHandler} value={'ny'}/>
            <label>New York Times</label>
          </div>

        </div>

      </div>


      <div>{sourceG && guardian}</div>
      <div>{sourceN && ny}</div>
      <div>{newsApi}</div>


      {/* PAGINATION */}
      {totalPages &&
        <div className={style.pages}>
          <p onClick={() => (currentPage > 1 && setCurrentPage(currentPage - 1))}>prevous</p>
          <div className={style.middlePages}>
            <h3 onClick={() => (setCurrentPage(1))} style={{ color: currentPage === 1 && 'blue', fontSize: currentPage === 1 && '23px' }}>1</h3>
            <h3></h3>
            <h3 onClick={() => (setCurrentPage(currentPage + 3))} style={{ display: currentPage < 3 && 'none' }}>{(currentPage - 1) < totalPages && currentPage - 1}</h3>
            <h2 className={style.currentPage} style={{ display: currentPage < 2 && 'none' }}>{currentPage}</h2>
            <h3 onClick={() => (setCurrentPage(currentPage + 1))}>{currentPage < totalPages && currentPage + 1}</h3>
            <h3 onClick={() => (setCurrentPage(currentPage + 2))} style={{display: currentPage + 2 === totalPages ? 'none' : 'block'}}>{(currentPage + 1) < totalPages && currentPage + 2}</h3>
            <h3></h3>
            <h3 onClick={() => (setCurrentPage(totalPages))} style={{display: (currentPage === totalPages || currentPage + 1 === totalPages) ? 'none' : 'block'}}>{totalPages}</h3>
          </div>
          <p onClick={() => (currentPage < totalPages && setCurrentPage(currentPage + 1))}>Next</p>
        </div>
      }

    </div>
  )
}
export default Search