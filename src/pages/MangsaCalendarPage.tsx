import { MangsaCalendarDashboard } from '../components/dashboard/MangsaCalendarDashboard';
import { Location } from '../types';

interface MangsaCalendarPageProps {
  location: Location;
}

function MangsaCalendarPage({ location }: MangsaCalendarPageProps) {
  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
      <MangsaCalendarDashboard location={location} />
    </div>
  );
}

export default MangsaCalendarPage;