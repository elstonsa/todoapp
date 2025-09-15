
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'react-relay';
import RelayEnvironment from './RelayEnvironment';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import LandingPage from './LandingPage';
import NewTaskPage from './NewTaskPage';
import TaskDetailPage from './TaskDetailPage';

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Provider theme={defaultTheme} colorScheme="light" colorVersion="6">
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={<LandingPage />} 
            />
            <Route 
              path="/new-task" 
              element={<NewTaskPage />} 
            />
            <Route 
              path="/task/:taskRef" 
              element={<TaskDetailPage />} 
            />
          </Routes>
        </Router>
      </Provider>
    </RelayEnvironmentProvider>
  );
}
export default App;