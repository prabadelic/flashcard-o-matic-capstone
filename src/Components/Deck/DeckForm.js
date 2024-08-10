import React from "react";
import { useNavigate } from "react-router-dom";

function DeckForm({ formData, handleChange, handleSubmit, deckId, nav }) {
  const isFormValid =
    formData.name.trim() !== "" && formData.description.trim() !== "";

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          id="name"
          name="name"
          className="form-control"
          onChange={handleChange}
          type="text"
          value={formData.name}
          placeholder="Deck Name"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          onChange={handleChange}
          value={formData.description}
          placeholder="Brief description of the deck"
        />
      </div>
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => nav(`/`)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default DeckForm;
