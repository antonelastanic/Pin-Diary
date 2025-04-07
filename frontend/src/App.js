
import { useEffect, useState } from "react";
import axios from "axios";
import Map from 'react-map-gl';  
import 'mapbox-gl/dist/mapbox-gl.css';

import "./app.css";

import { useAuth } from "./hooks/useAuth";

import PinMarker from "./components/PinMarker";
import NewPinPopup from "./components/NewPinPopup";
import AuthButtons from "./components/AuthButtons";
import Register from "./components/Register";
import Login from "./components/Login";


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; // Set your mapbox token here

function App() {

  const myStorage = window.localStorage;
  const { username } = useAuth();
  const [currentUser, setCurrentUser] = useState(username);
  
  

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(1);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [imageFile, setImageFile] = useState(null);


  useEffect(() => {
    const getPins = async () => {
      try{
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch(err){
        console.log(err)
      }
    };
    getPins();
  },[]);


  const handleAddClick = (e) => {
    console.log(e);
    const longitude = e.lngLat.lng
    const latitude = e.lngLat.lat
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit triggered"); // ✅ Debug
  
    const token = myStorage.getItem("token");
    if (!token) {
      console.error("No token found. User must be logged in.");
      return;
    }
  
    const data = new FormData();
    data.append("title", title);
    data.append("desc", desc);
    data.append("rating", rating);
    data.append("lat", newPlace.lat);
    data.append("long", newPlace.long);
    data.append("image", imageFile);
    data.append("username", currentUser);
  
    try {
      const res = await axios.post("/pins", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.error("Error submitting pin:", err.response?.data || err);
    }
  };  

  const handleLogout =() => {
    myStorage.removeItem("token");
    setCurrentUser(null);
    
  }

  return (
    <Map
      initialViewState={{
        latitude: 	51.509865,
        longitude: -0.118092,
        zoom: 3
      }}
      style={{width: "100vw", height: "100vh",}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      onDblClick = {handleAddClick}
    >


    {pins.map((p) => (
      <PinMarker
        key={p._id}
        pin={p}
        currentUser={currentUser}
        currentPlaceId={currentPlaceId}
        setCurrentPlaceId={setCurrentPlaceId}
      />
    ))}


    {newPlace && currentUser && (
      <NewPinPopup
        newPlace={newPlace}
        setNewPlace={setNewPlace}
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        setDesc={setDesc}
        setRating={setRating}
        setImageFile={setImageFile}
      />
    )}


    <AuthButtons
      currentUser={currentUser}
      onLogout={handleLogout}
      onLoginClick={() => setShowLogin(true)}
      onRegisterClick={() => setShowRegister(true)}
    />

    {showRegister && <Register setShowRegister={setShowRegister}/>}
    {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}
        
    </Map>
  );
}



export default App;