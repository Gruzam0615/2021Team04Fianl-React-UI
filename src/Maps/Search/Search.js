import { useState, useReducer, useEffect, forwardRef, useRef } from "react";
import { ResultSpecific, SearchLocationMap } from "../Maps";
import { ResultItem } from "./ResultItem/ResultItem";
import ResultItemSpec from "./ResultItemSpec/ResultItemSpec";

import "./Search.css";

const Search = forwardRef((props, ref) => {
    const [ searchInputValue, setSearchInputValue ] = useState("");
    
    const [ searchFetchState, setSearchFetchState ] = useState(false);
    const [ searchFetchResults, setSearchFetchResults ] = useState([]);

    let searchFetchResults02 = [];

    const resultSpecificRef = useRef(null);
    const SpecCloseButtonRef = useRef(null);
    const clearBtnRef = useRef(null);

    const SearchFetch = (param) => {
        console.log(`${param} 에 대해 검색시작`);
        const url = `/v1/search/local.json?query=${param}&display=5&start=1`;
        
        const CLIENT_ID = "kpYMnsoGe10W_S5naKs0";
        const CLIENT_SECRET = "YnxERGnITT";

        const fetchOptions = {
            method: "GET",
            headers: {
                "accept": "application/json",
                "X-Naver-Client-Id": CLIENT_ID,
                "X-Naver-Client-Secret": CLIENT_SECRET,
            },
            redirect: "follow"
        }
        return fetch(url, fetchOptions)
            .then(response => response.json())
            .then(
                (data) => {
                    setSearchFetchState(true);
                    return data.items;
                },
                (error) => {
                    setSearchFetchState(true);
                    return error;
                }
            )
    }
    const SearchImageFetch = (param) => {
        const url = `/v1/search/image?query=${param}&sort=sim`;
        const CLIENT_ID = "kpYMnsoGe10W_S5naKs0";
        const CLIENT_SECRET = "YnxERGnITT";

        const options = {
            method: "GET",
            headers: {
                "accept": "application/json",
                "X-Naver-Client-Id": CLIENT_ID,
                "X-Naver-Client-Secret": CLIENT_SECRET,
            }
        }
        return fetch(url, options)
            .then(response => response.json())
            .then(
                (data) => {
                    return data.items;
                },
                (error) => {
                    return error;
                }
            )            
    }
    
    const OnSearchInputChnage = (event) => {
        const $searchInput = document.querySelector("#InputBar");
        const $clearBtn = document.querySelectorAll(".clearBtn")[0];
        setSearchInputValue(event.target.value);
        if($searchInput.value === "") {
            $clearBtn.style.visibility = "hidden";
        }else {
            $clearBtn.style.visibility = "visible";
        }
    }
   
    const InputEnterPress = (event) => {
        if(event.key === "Enter") {  
            SearchFetch(searchInputValue)
            .then((data) => { 
                setSearchFetchResults(data);
                SearchLocationMap(data);
                searchFetchResults02 = data;
            });
            // SearchImageFetch(searchInputValue)
            // .then((data) => {
            //     setSearchImageFetchResults(data)
            //     SearchLocationMap(searchFetchResults, searchImageFetchResults);
            // })
        }       
    }
    const clickSearchBtn = () => {
        SearchFetch(searchInputValue)
            .then((data) => { 
                setSearchFetchResults(data);
                SearchLocationMap(data);
            });
    }
    const clearBtnClick = () => {
        setSearchInputValue("");
        clearBtnRef.current.style.visibility = "hidden";
    }
    useEffect(() => {
    },[]);

    const CloseSpecificBtn = () => {
        resultSpecificRef.current.style.display = "none";
        SpecCloseButtonRef.current.style.visibility = "hidden";
    }

    const ResultSpecific = (Object1) => {
        /**
         * Object1 - API 호출로 출력되는 지역정보 
         */
        const $resultSpecificCloseBtn = document.querySelectorAll(".SpecCloseButtonDiv")[0]
        const $resultSpecific = document.querySelectorAll(".resultSpecific")[0];
        const $specTitle = document.querySelectorAll(".SpecTitle")[0];
        const $specDescription = document.querySelectorAll(".SpecDescription")[0];
        const $specTelephone = document.querySelectorAll(".SpecTelephone")[0];
        const $specAddress = document.querySelectorAll(".SpecAddress")[0];
           
        $resultSpecificCloseBtn.style.visibility = "visible";
        $resultSpecific.style.display = "inline-block";
        $specTitle.innerHTML = Object1.title;
        $specDescription.innerHTML = Object1.description;
        $specTelephone.innerHTML = Object1.telephone;
        $specAddress.innerHTML = Object1.address;        
    }
    
    return(
        <div ref={ref} className="search">
            <div className="searchInput">
                <button onClick={clickSearchBtn} className="searchBtn"></button>
                <input id="InputBar" className="InputBar"
                    type="text"
                    value={searchInputValue}
                    onChange={OnSearchInputChnage}
                    onKeyPress={InputEnterPress}
                    // onKeyUp={InputEnterUp}
                    autoComplete="off"
                />
                <button ref={clearBtnRef} className="clearBtn" onClick={clearBtnClick}>X</button>
            </div>
            <div className="searchResultsDiv">
                <ul className="searchResults">
                {searchFetchResults ? 
                    searchFetchResults.map((value, index) => <ResultItem index={index} title={value.title} func1={() => ResultSpecific(value)}/>)
                    : null
                }
                </ul>
            </div>
            <div ref={SpecCloseButtonRef} className="SpecCloseButtonDiv">
                <button onClick={CloseSpecificBtn}>X</button>
            </div>
            <div ref={resultSpecificRef} className="resultSpecific">                
                <figure>
                    <div className="SpecThumbnail">PHOTO</div>
                </figure>
                <header className="SpecTitleHeader">
                    <h3 className="SpecTitle"></h3>
                </header>
                <summary>
                    <p className="SpecDescription"></p>
                </summary>
                <summary>
                    <p className="SpecTelephone"></p>
                </summary>
                <summary >
                    <p className="SpecAddress"></p>
                </summary>
            </div>
        </div>
    );
}) 
export { Search }