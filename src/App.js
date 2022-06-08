import { useState, useEffect, useRef } from 'react';

import { Maps } from './Maps/Maps';
import { Search } from './Search/Search';

import './App.css';

function App() {
  const sideBar = useRef(null);
  const sideBtn = useRef(null);

  const [windowDeimension, detectHW] = useState({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
  })
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    })
  }
  useEffect(() => {
    window.addEventListener("resize", detectSize)

    return () => {
      window.removeEventListener("resize", detectSize)
    }
  }, [windowDeimension])


  let sideBarState = false;
  const Test01 = (event) => {
    console.log(event.target.style);
    event.target.classList.toggle("change");
    if(sideBarState === false) {
      sideBar.current.style.display = "inline-block";
      sideBarState = !sideBarState;
     
    } else {
      sideBar.current.style.display = "none";
      sideBarState = !sideBarState;
    }
  }

  return (
    <div className="App">
      { windowDeimension.winWidth < 790 ? 
      <div className="NotSupport">
        <h1>해당 해상도에서는 지원하지 않습니다.</h1>
      </div>      
      :
      <div>
        <div ref={sideBtn} onClick={Test01.bind(this)} className="sideBarToggleBtn">
          <div className="sideIcon1"></div>
          <div className="sideIcon2"></div>
        </div>
        <Search ref={sideBar}/>
        <Maps ncpClientId="llyog7d8bs" />
      </div>
    }
    </div>
  );
}
export default App;