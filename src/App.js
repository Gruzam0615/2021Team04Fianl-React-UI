import { useRef } from 'react';

import { Maps } from './Maps/Maps';
import { Search } from './Search/Search';

import './App.css';

function App() {
  const sideBar = useRef(null);
  const sideBtn = useRef(null);

  let sideBarState = false;
  const Test01 = () => {
    if(sideBarState === false) {
      sideBar.current.style.display = "inline-block";
      sideBtn.current.innerHTML = "&#60";
      sideBarState = !sideBarState;
    } else {
      sideBar.current.style.display = "none";
      sideBtn.current.innerHTML = "&#62"
      sideBarState = !sideBarState;
    }
  }

  return (
    <div className="App">
      <div ref={sideBtn} onClick={Test01} className="sideBarToggleBtn">
      <span> &#62; </span>
      </div>
      <Search ref={sideBar}/>
      <Maps ncpClientId="llyog7d8bs" />
    </div>
  );
}
export default App;