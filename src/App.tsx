import { createSignal } from "solid-js";
import CardList from "./components/CardList/CardList";
import Pagination from "./components/ui/Pagination/Pagination";

function App() {
  return (
    <div class="container mx-auto min-h-screen flex justify-center items-center p-4">
      <div class="flex flex-col items-center">
        <CardList />
      </div>
    </div>
  );
}

export default App;
