import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Components/Home";
import Deck from "../Components/Deck";
import Study from "../Components/Study";
import CreateDeck from "../Components/Deck/CreateDeck";
import EditDeck from "../Components/Deck/EditDeck";
import AddCard from "../Components/Card/AddCard";
import EditCard from "../Components/Card/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<Deck />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route
            path="/decks/:deckId/cards/:cardId/edit"
            element={<EditCard />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
