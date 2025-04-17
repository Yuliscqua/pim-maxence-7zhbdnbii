import React from 'react';
import { createRoot } from 'react-dom/client';

import HomePage from './HomePage';

const root = createRoot(document.getElementById('app'));

root.render(
  <div id="content">
    <HomePage />
  </div>
);
