import {
  createBrowserRouter,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom';

import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { Dashboard } from '@/components/Dashboard';
import { LessonView } from '@/components/LessonView';
import { TagPlayground } from '@/components/TagPlayground';
import { TagExplanation } from '@/components/TagExplanation';
import { QuizPage } from '@/pages/QuizPage';
import { QuizCategory } from '@/components/QuizCategory';
import { ErrorPage } from '@/pages/ErrorPage';
import { RootLayout } from '@/layouts/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'explore',
        element: <ExplorePage />,
      },
      {
        path: 'dashboard',
        element: <DashboardWrapper />,
      },
      {
        path: 'lesson/:lessonId',
        element: <LessonWrapper />,
      },
      {
        path: 'learn/:tagName',
        element: <ExplanationWrapper />,
      },
      {
        path: 'playground/:tagName',
        element: <PlaygroundWrapper />,
      },
      {
        path: 'quiz',
        element: <QuizPage />,
      },
      {
        path: 'quiz/:category',
        element: <QuizCategoryWrapper />,
      },
      {
        path: '*',
        element: <Navigate to='/' replace />,
      },
    ],
  },
]);

function DashboardWrapper() {
  const navigate = useNavigate();
  const handleStartLesson = (lessonId: string) => {
    void navigate(`/lesson/${lessonId}`);
  };

  return <Dashboard onStartLesson={handleStartLesson} />;
}

function LessonWrapper() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  return (
    <LessonView
      lessonId={lessonId || ''}
      onBack={() => navigate('/dashboard')}
    />
  );
}

function ExplanationWrapper() {
  const { tagName } = useParams<{ tagName: string }>();
  const navigate = useNavigate();

  return (
    <TagExplanation
      tagName={tagName || ''}
      onBack={() => navigate('/explore')}
    />
  );
}

function PlaygroundWrapper() {
  const { tagName } = useParams<{ tagName: string }>();
  const navigate = useNavigate();

  return (
    <TagPlayground
      tagName={tagName || ''}
      onBack={() => navigate(`/learn/${tagName}`)}
    />
  );
}

function QuizCategoryWrapper() {
  const { category } = useParams<{ category: string }>();

  return <QuizCategory category={category || 'all'} />;
}
