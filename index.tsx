/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOMMain from 'react-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Robustly resolve createRoot:
// 1. Check ReactDOMClient (named export)
// 2. Check ReactDOMClient.default (CommonJS interop)
// 3. Check ReactDOMMain (fallback if bundled together)
// 4. Check ReactDOMMain.default
const createRoot = 
  (ReactDOMClient as any).createRoot || 
  (ReactDOMClient as any).default?.createRoot ||
  (ReactDOMMain as any).createRoot ||
  (ReactDOMMain as any).default?.createRoot;

if (!createRoot) {
  console.error("Failed to resolve createRoot. Checked react-dom/client and react-dom.");
  throw new Error("React 18+ createRoot not found");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);