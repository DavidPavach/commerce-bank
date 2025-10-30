import { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient, MutationCache } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';

//Hooks
import { useServiceWorkerPrompt } from './Hooks/serviceWorkerUpdate';

// Components
import { toast, ToastContainer } from "react-fox-toast";
import InstallPrompt from './components/InstallationPrompt';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
    }
  },
  mutationCache: new MutationCache({
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })
})

const App = () => {

  const { showPrompt, reloadPage } = useServiceWorkerPrompt();
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    if (showPrompt && !shown) {
      setShown(true);
      toast.info(
        <div className="flex items-center gap-x-4 text-xs md:text-sm xl:text-base">
          <p>✨ New version available!</p>
          <button onClick={() => { setShown(false); reloadPage(); }}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg font-medium text-white text-xs">
            Reload
          </button>
        </div>,
        {
          duration: 10000,
          position: "top-center",
        }
      );
    }
  }, [showPrompt, reloadPage, shown]);

  return (
    <main className='text-xs md:text-sm xl:text-base'>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <InstallPrompt />
        <ToastContainer position="top-center" isPausedOnHover={true} duration={5000} />
      </QueryClientProvider>
    </main>
  );
}

export default App;