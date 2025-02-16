import React from 'react';
import ReactDOM from 'react-dom/client';
import { SidebarRender } from './components/SidebarRender';
const sidebarElement = document.getElementById('react-sidebar');
if (sidebarElement) {
  const isAdmin = sidebarElement.dataset.isAdmin === 'true';
  const root = ReactDOM.createRoot(sidebarElement);
  root.render(
    <React.StrictMode>
      <SidebarRender isAdmin={isAdmin}/>
    </React.StrictMode>
  );
}