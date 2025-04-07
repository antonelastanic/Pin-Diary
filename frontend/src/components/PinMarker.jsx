import { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@mui/icons-material';
import { format } from 'timeago.js';

export default function PinMarker({
  pin,
  currentUser,
  currentPlaceId,
  setCurrentPlaceId
}) {
  return (
    <>
      <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom">
        <Room
          style={{
            color: pin.username === currentUser ? "slateblue" : "tomato",
            cursor: "pointer"
          }}
          onClick={() => setCurrentPlaceId(pin._id)}
        />
      </Marker>

      {pin._id === currentPlaceId && (
        <Popup
          longitude={pin.long}
          latitude={pin.lat}
          anchor="left"
          onClose={() => setCurrentPlaceId(null)}
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{pin.title}</h4>
            <label>Review</label>
            <p className="desc">{pin.desc}</p>
            <label>Rating</label>
            <div className="stars">
              {Array(pin.rating).fill(<Star className="star" />)}
            </div>
            <label>Image</label>
            <img
              className="image"
              src={`http://localhost:4000/uploads/${pin.imgURL}`}
              alt="place"
            />
            <label>Information</label>
            <span className="username">
              Created by <b>{pin.username}</b>
            </span>
            <span className="date">{format(pin.createdAt)}</span>
          </div>
        </Popup>
      )}
    </>
  );
}
