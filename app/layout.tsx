import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Insta Manager Bot',
  description: 'Plan, generate, and organize Instagram content',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <h1>Insta Manager Bot</h1>
            <p className="tag">Plan content, generate captions, and schedule smarter.</p>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">Built for planning. Not affiliated with Instagram.</footer>
        </div>
      </body>
    </html>
  );
}
