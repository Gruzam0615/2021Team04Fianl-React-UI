import { useState, useReducer, useEffect } from "react";
import { SearchLocationMap } from "../Maps";
import { ResultItem } from "./ResultItem/ResultItem";

import "./Search.css";

const Search = (props) => {
    const [ searchInputValue, setSearchInputValue ] = useState("");
    
    const [ searchFetchState, setSearchFetchState ] = useState(false);
    const [ searchFetchResults, setSearchFetchResults ] = useState([]);

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
    
    const OnSearchInputChnage = (event) => {
        setSearchInputValue(event.target.value);
    }
   
    const InputEnterPress = (event) => {
        if(event.key === "Enter") {  
            SearchFetch(searchInputValue)
            .then((data) => { setSearchFetchResults(data) })
            .then(SearchLocationMap(searchFetchResults))
        }       
    }
    // const InputEnterUp = (event) => {
    //     if(event.key === "Enter") {            
    //     }
    // }
    useEffect(() => {
    },[]);

    return(
        <div className="search">
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
        </div>
    );
} 
export { Search }

/*
    Naver 웹 검색 API 활용시 https://openapi.naver.com/v1/search/webkr url에 직접 fetch() 요청을할 경우
    CORS 정책으로 인해 fetch() 요청에 mode: "no-cors"를 설정해도 아래와 같은 사유로 요청이 거절된다.
    General:
        Request URL: https://openapi.naver.com/v1/search/webkr.json?query=%EC%84%9C%EC%9A%B8%EC%97%AD
        Request Method: GET
        Status Code: 401 
        Remote Address: 110.93.147.11:443
        Referrer Policy: strict-origin-when-cross-origin
    Response Header:
        {"errorMessage":"Not Exist Client ID : Authentication failed. (인증에 실패했습니다.)","errorCode":"024"}
    이에 대한 해결책으로 package.json에서 "proxy": "https://openapi.naver.com/" 를 설정하고
    fetch()를 실행할때 요청 url을 proxy로 설정한 url을 제외한 이하의 url을 입력해 fetch()를 실행한다.
    const url = `/v1/search/webkr`
    실행결과는 다음과 같다.
    General:
        Rquest URL: http://localhost:3000/v1/search/webkr.json?query=%ED%99%94%EA%B3%A1%EC%97%AD
        Request Method: GET
        Status Code: 200 OK
        Remote Address: 127.0.0.1:3000
        Referrer Policy: strict-origin-when-cross-origin
*/