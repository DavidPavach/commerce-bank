import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(reg => console.log('✅ Service worker registered:', reg))
      .catch(err => console.error('❌ Service worker registration failed:', err));
  });
}


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });

  navigator.serviceWorker.register("/service-worker.js").then(reg => {
    if (reg.waiting) {
      if (confirm("A new version is available. Reload now?")) {
        reg.waiting.postMessage({ type: "SKIP_WAITING" });
      }
    }

    reg.addEventListener("updatefound", () => {
      const newWorker = reg.installing;
      if (newWorker) {
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            if (confirm("A new version is available. Reload now?")) {
              newWorker.postMessage({ type: "SKIP_WAITING" });
            }
          }
        });
      }
    });
  });
}
