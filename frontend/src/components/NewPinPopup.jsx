import { Popup } from "react-map-gl";

export default function NewPinPopup({
  newPlace,
  setNewPlace,
  handleSubmit,
  setTitle,
  setDesc,
  setRating,
  setImageFile
}) {
  return (
    <Popup
      latitude={newPlace.lat}
      longitude={newPlace.long}
      closeButton={true}
      closeOnClick={false}
      anchor="left"
      onClose={() => setNewPlace(null)}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            placeholder="Enter a title.."
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Review</label>
          <textarea
            placeholder="Write something about this place.."
            onChange={(e) => setDesc(e.target.value)}
          />

          <label>Rating</label>
          <select onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <button className="submitButton" type="submit">Add Pin</button>
        </form>
      </div>
    </Popup>
  );
}
