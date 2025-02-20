import { createQuery } from '@tanstack/solid-query';
import { For, Show } from 'solid-js';

import CardList from './components/CardList/CardList';
import { TCardItem } from './types/CardItem';

function App() {
  return (
    <div class="container mx-auto min-h-screen flex justify-center items-center">
      <div class="flex flex-col items-center">
        <CardList />
      </div>
    </div>
  );
}

export default App;
