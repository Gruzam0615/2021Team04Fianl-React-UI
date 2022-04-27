import { useState, useReducer, useEffect, forwardRef, useRef } from "react";
import { ResultSpecific, SearchLocationMap } from "../Maps";
import { ResultItem } from "./ResultItem/ResultItem";
import ResultItemSpec from "./ResultItemSpec/ResultItemSpec";

import "./Search.css";

const Search = forwardRef((props, ref) => {
    const [ searchInputValue, setSearchInputValue ] = useState("");
    
    const [ searchFetchState, setSearchFetchState ] = useState(false);
    const [ searchFetchResults, setSearchFetchResults ] = useState([]);

    const [ searchImageFetchResults, setSearchImageFetchResults ] = useState([]);

    const resultSpecificRef = useRef(null);


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
        setSearchInputValue(event.target.value);
    }
   
    const InputEnterPress = (event) => {
        if(event.key === "Enter") {  
            SearchFetch(searchInputValue)
            .then((data) => { 
                setSearchFetchResults(data);
                SearchLocationMap(data);
            });
            // SearchImageFetch(searchInputValue)
            // .then((data) => {
            //     setSearchImageFetchResults(data)
            //     SearchLocationMap(searchFetchResults, searchImageFetchResults);
            // })
        }       
    }
    // const InputEnterUp = (event) => {
    //     if(event.key === "Enter") {            
    //     }
    // }
    useEffect(() => {
    },[]);

    const CloseSpecificBtn = () => {
        resultSpecificRef.current.style.display = "none";
    }
    const Test01 = () => { alert("!!!"); }

    return(
        <div ref={ref} className="search">
            <div className="searchInput">
                <input id="InputBar" className="InputBar"
                    type="text"
                    value={searchInputValue}
                    onChange={OnSearchInputChnage}
                    onKeyPress={InputEnterPress}
                    // onKeyUp={InputEnterUp}
                />
            </div>
            <ul className="searchResults">
            {searchFetchResults ? 
                searchFetchResults.map((value, index) => <ResultItem index={index} title={value.title} />)
                : null
            }
            </ul>
            <div ref={resultSpecificRef} className="resultSpecific">
                <div className="SpecButtonDiv">
                    <button onClick={CloseSpecificBtn}>X</button>
                </div>                
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