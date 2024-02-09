import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Loading } from '../components/loading/loading';

const TaskList = lazy(() => import('./task-list/task-list'));
const TaskDetails = lazy(() => import('./task-details/task-details'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
