import { createQuery } from "@tanstack/solid-query";
import { For, Show } from "solid-js";

import CardList from "./components/CardList/CardList";
import { TCardItem } from "./types/CardItem";

function App() {
  return <CardList />;
}

export default App;
