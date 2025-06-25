import { LandingPage } from '@/components/landing-page';
import TradeAnalyzer from '@/components/TradeAnalyzer';

export default function HomePage() {
  return (
    <main className="p-6">
      <LandingPage />
      
      {/* Optional: Add some spacing and the analyzer below */}
      <div className="mt-10">
        <TradeAnalyzer />
      </div>
    </main>
  );
}
