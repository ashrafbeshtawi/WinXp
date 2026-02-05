interface AppContentProps {
  component: string;
  windowId: string;
}

export function AppContent({ component, windowId }: AppContentProps) {
  return (
    <div className="p-4">
      <p>App: {component}</p>
      <p>Window ID: {windowId}</p>
      <p className="text-gray-500 mt-2">Content coming soon...</p>
    </div>
  );
}
