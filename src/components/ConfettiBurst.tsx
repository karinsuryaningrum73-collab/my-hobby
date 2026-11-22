import React from 'react';

interface ConfettiBurstProps {
  active: boolean;
}

const CONFETTI_PIECES = [
  { left: '12%', color: '#F59E0B', delay: '0s', size: 10 },
  { left: '22%', color: '#0EA5E9', delay: '0.1s', size: 12 },
  { left: '34%', color: '#10B981', delay: '0.05s', size: 9 },
  { left: '46%', color: '#EC4899', delay: '0.15s', size: 11 },
  { left: '58%', color: '#F97316', delay: '0.08s', size: 10 },
  { left: '70%', color: '#3B82F6', delay: '0.12s', size: 12 },
  { left: '82%', color: '#EAB308', delay: '0.03s', size: 9 },
  { left: '90%', color: '#EF4444', delay: '0.18s', size: 11 },
];

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-48 overflow-hidden z-20"
      aria-hidden="true"
    >
      {CONFETTI_PIECES.map((piece, idx) => (
        <span
          key={idx}
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            animation: `confettiDrop 1.3s ease-out ${piece.delay} forwards`,
          }}
          className="absolute top-0 rounded-sm inline-block"
        />
      ))}
    </div>
  );
};
