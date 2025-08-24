import { QueryClientProvider, QueryClient, MutationCache } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';

//Toast
import { ToastContainer } from "react-fox-toast";


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
  return ( 
    <main className='text-xs md:text-sm xl:text-base'>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ToastContainer position="top-center" isPausedOnHover={true} duration={5000} /> 
      </QueryClientProvider>
    </main>
   );
}
 
export default App;