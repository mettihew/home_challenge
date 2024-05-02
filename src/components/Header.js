import { useEffect, useState } from 'react'
import style from './Header.module.css'
import { useNavigate } from 'react-router'
import {FaSearch} from 'react-icons/fa'

function Header() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState()
  const [module, setModule] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    async function newsData1() {
      const GUARDIAN_API = await fetch(`https://content.guardianapis.com/search?q=${search}&api-key=ac83f541-8a6f-49b6-a8fe-7af22e4f4924`)
      const data = await GUARDIAN_API.json()
      setData(data.response.results)
    }
    newsData1()
  }, [search])
  
  const changeHandler = (ev) => {
    ev.preventDefault()
    setSearch(ev.target.value)
    setModule(true)
  }

  const submitHandler = (ev) => {
    ev.preventDefault()
    nav(`q=${search}`)
    window.location.reload()
  }

  if (!data) return

  let dataMap = data.map((ev, i) => {
      return (
        <div style={{display:'grid'}} key={i}>
        <a href={ev.webUrl} style={{padding: '10px 0'}}>{ev.webTitle}</a>
        </div>
      )
  })

  return (
    <div className={style.body}>

      <div className={style.left}>
        <a href='/'>Home</a>
        <a href='/q=sport'>Sport</a>
        <a href='/q=technology'>Technology</a>
        <a href='/q=politics'>Politics</a>
      </div>

      <form className={style.search} onSubmit={submitHandler}>
        <div style={{ display: 'grid' }}>
          <input type="text" onChange={changeHandler} onSubmit={submitHandler} />
          <div className={style.module} style={{display: (dataMap && search) ? 'block' : 'none'}}>{dataMap}</div>
        </div>
        <a href={`q=${search}`} className={style.fas}><FaSearch color='orange'/></a>
      </form>


          <div className={style.module_background} style={{display: (dataMap && search) ? 'block' : 'none'}} onClick={() => setSearch('')}></div>
    </div>
  )
}
export default Header