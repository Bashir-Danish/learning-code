import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardPage from './pages/DashboardPage';
import LessonPage from './pages/LessonPage';
import VisualizerPage from './pages/VisualizerPage';
import ExercisePage from './pages/ExercisePage';
import DebuggerPage from './pages/DebuggerPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/visualizer/:algorithmId" element={<VisualizerPage />} />
        <Route path="/exercise/:exerciseId" element={<ExercisePage />} />
        <Route path="/debugger" element={<DebuggerPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
