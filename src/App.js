import { useEffect, useState, useRef } from 'react';

import { Maps } from './Maps/Maps';
import { Search } from './Maps/Search/Search';

import './App.css';

function App() {
  const [ sideToggle, setSideToggle ] = useState(false);

  const Test01 = () => {
    const $search = document.querySelector(".search");
    const $sideBarBtn = document.querySelector(".sideBarBtn");    

    // if(sideToggle === false) {
    //   $search.style.display = "inline";
    //   $sideBarBtn.style.marginLeft = "500px";
    //   $sideBarBtn.innerHTML = "<";
    //   setSideToggle(!sideToggle);
    // } else {
    //   $search.style.display = "none";
    //   $sideBarBtn.style.marginLeft = "0px";
    //   $sideBarBtn.innerHTML = ">";
    //   setSideToggle(!sideToggle);
    // }
   
  }

  return (
    <div className="App">
      <Maps ncpClientId="llyog7d8bs" />
      <Search/>
    </div>
  );
}
export default App;