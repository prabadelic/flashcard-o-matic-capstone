import React from "react";

function CardForm({ cardData, handleChange, handleSubmit, deckId, nav }) {
  const isFormValid =
    cardData.front.trim() !== "" && cardData.back.trim() !== "";

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          onChange={handleChange}
          type="text"
          value={cardData.front}
          placeholder="Front side of card"
        />
      </div>
      <div className="form-group">
        <label>Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          onChange={handleChange}
          type="textarea"
          value={cardData.back}
          placeholder="Back side of card"
        />
      </div>
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => nav(`/decks/${deckId}`)}
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

export default CardForm;
