import { useState, useEffect, useRef, useReducer } from "react";

import { CurrentBtn } from "./CurrentBtn/CurrentBtn";

import "./Maps.css";
import blueCircle from "../imgs/blueCircle.png";

/*
페이지 새로고침을 하기 위한 함수
*/
const refreshPage = () => {
    window.location.reload(false);
}

const showAlert = (message) => {
    alert(message);
}

const getUserCoords = () => {
    return new Promise((resolve, reject) => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                success => { resolve(success); },
                failure => { resolve(failure); },
                {
                    "enableHighAccuracy": true,
                    "timeout": 5000,
                    "maximumAge": 0
                }
            );
        } else {
            resolve("Can not use Geolocation API");
        }
    });
}
/* 
window.naver.maps 객체 반환
window.naver의 로딩이 늦을때 아래의 에러 발생
Uncaught TypeError: Cannot read properties of undefined (reading 'maps')
해당 에러 예방을 위한 함수
*/  
const naverMapsObjectFunc = () => {
    let result;
    try{
        result = window.naver.maps;
        return result;
    } catch(err) {
        if(result === undefined) {
            console.log(`Fail to naverMapsObject Loading ${err}`);
            refreshPage();
        }
    }
}
let mapElement = null;

const Maps = (props) => {
    const [ searchResults, setSearchResults ] = useState(props.searchResults);
    
    const script = document.createElement("script");
    const ncpClientId = props.ncpClientId;
    script.setAttribute("src", `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}&submodules=geocoder`);
    document.body.appendChild(script);

    const mapContainer = useRef(null);

    const initMap = async() => {
        let latitude, longitude;
        const userCoords = await getUserCoords();
        const naverMapsObject = naverMapsObjectFunc();
        
        if(userCoords.coords !== undefined) {
            latitude = userCoords.coords.latitude;
            longitude = userCoords.coords.longitude;
        } else {
            latitude = 37.359704
            longitude = 127.105399
            showAlert(`위치정보 수집이 불가능합니다.\n브라우저의 설정을 확인해주세요.`)
        }        

        //Default coordinate       
        const mapOptions = {
          "center": naverMapsObject.LatLng(latitude, longitude),
          "zoom": 14
        };
        mapElement = new naverMapsObject.Map(mapContainer.current, mapOptions);
    }

    const currentLocationMap = async() => {
        let latitude, longitude = 0;
        const userCoords = await getUserCoords();
        const naverMapsObject = naverMapsObjectFunc();
    
        if(userCoords.coords !== undefined) {
            latitude = userCoords.coords.latitude;
            longitude = userCoords.coords.longitude;
        } else {
            showAlert(`위치정보 수집이 불가능합니다.\n브라우저의 설정을 확인해주세요.`)
        }
        let markerOptions = {
            position: new naverMapsObject.LatLng(latitude, longitude),
            map: mapElement
        };
    
        let marker = new naverMapsObject.Marker(markerOptions);
        // mapElement.setZoom(16, true);
        mapElement.panTo(marker.position);
    }

    useEffect(() => {
        initMap();
    })
    
    return(        
        <div>
            <div id={"map"} className="Map" ref={mapContainer}></div>
            <CurrentBtn func1={()=>{currentLocationMap()}}/>
        </div>
    );
}

const SearchLocationMap = (param1) => {
    console.log(param1);
    // naverMapsObject.TransCoord.fromTM128ToLatLng(naverMapsObject.Point(item.mapx, item.mapy))
}
export { Maps, SearchLocationMap };