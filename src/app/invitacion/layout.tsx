import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '¡Invitación de Cumpleaños!',
  description: 'Invitación especial de cumpleaños.',
};

export const viewport: Viewport = {
  themeColor: '#c44d7b',
};

export default function InvitacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(160deg, #e8728c 0%, #c44d7b 45%, #9b6ab0 100%)',
      backgroundAttachment: 'fixed',
    }}>
      {children}
    </div>
  );
}
