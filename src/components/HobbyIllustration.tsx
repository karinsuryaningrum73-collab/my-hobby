import React from 'react';
import { HobbyId } from '../data/hobbies';

interface HobbyIllustrationProps {
  hobbyId: HobbyId;
  className?: string;
}

const KELOMPOK_LETTERS = [
  { char: 'K', color: '#0284C7', rotate: '-4deg', translate: '0px' },
  { char: 'e', color: '#EC4899', rotate: '3deg', translate: '-2px' },
  { char: 'l', color: '#F59E0B', rotate: '-2deg', translate: '1px' },
  { char: 'o', color: '#10B981', rotate: '4deg', translate: '-1px' },
  { char: 'm', color: '#F97316', rotate: '-3deg', translate: '1px' },
  { char: 'p', color: '#0EA5E9', rotate: '3deg', translate: '-2px' },
  { char: 'o', color: '#E11D48', rotate: '-2deg', translate: '0px' },
  { char: 'k', color: '#059669', rotate: '4deg', translate: '-1px' },
];

export const Kelompok3Banner: React.FC = () => {
  return (
    <div
      className="relative flex flex-col items-center select-none mb-2"
      aria-label="Oleh Kelompok 3"
    >
      {/* Floating decorative stars & dots */}
      <svg
        viewBox="0 0 220 26"
        className="w-48 h-6 -mb-1 pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M28 12 L30 16 L34 17 L31 20 L32 24 L28 22 L24 24 L25 20 L22 17 L26 16 Z"
          fill="#F59E0B"
          className="anim-float"
        />
        <circle cx="62" cy="14" r="3" fill="#EC4899" />
        <text
          x="110"
          y="17"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          letterSpacing="2"
          fill="#0369A1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          OLEH
        </text>
        <circle cx="158" cy="14" r="3" fill="#10B981" />
        <path
          d="M192 8 L194 13 L199 14 L195 17 L196 22 L192 19 L188 22 L189 17 L185 14 L190 13 Z"
          fill="#0EA5E9"
          className="anim-float"
        />
      </svg>

      {/* Playful multi-color display lettering */}
      <div
        className="font-display flex items-baseline justify-center gap-0.5 text-3xl sm:text-4xl font-extrabold tracking-tight leading-none"
        style={{
          filter: 'drop-shadow(0 3px 0 rgba(15, 23, 42, 0.12))',
        }}
      >
        {KELOMPOK_LETTERS.map((item, idx) => (
          <span
            key={idx}
            style={{
              color: item.color,
              transform: `rotate(${item.rotate}) translateY(${item.translate})`,
              WebkitTextStroke: '3px #FFFFFF',
              paintOrder: 'stroke fill',
            }}
            className="inline-block"
          >
            {item.char}
          </span>
        ))}
        <span className="w-2" aria-hidden="true" />
        <span
          style={{
            color: '#F59E0B',
            transform: 'rotate(6deg) translateY(-2px)',
            WebkitTextStroke: '3.5px #FFFFFF',
            paintOrder: 'stroke fill',
          }}
          className="inline-block text-4xl sm:text-[2.6rem] font-extrabold"
        >
          3
        </span>
      </div>

      {/* Smooth aesthetic rainbow wave underline */}
      <svg
        viewBox="0 0 180 14"
        className="w-40 h-3.5 mt-1 pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="kelompok3Arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="35%" stopColor="#EC4899" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <path
          d="M10 9 Q90 1 170 9"
          fill="none"
          stroke="url(#kelompok3Arc)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const MascotHero: React.FC<{ className?: string }> = ({ className = 'w-44 h-44' }) => {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-label="Friendly learning mascot waving">
      {/* Soft sunny backdrop halo */}
      <circle cx="100" cy="95" r="72" fill="#FEF3C7" />
      <circle cx="100" cy="95" r="56" fill="#FDE68A" opacity="0.6" />

      {/* Floating decorative stars & music note */}
      <g className="anim-float">
        <path
          d="M36 46 L39 53 L46 54 L41 59 L42 66 L36 62 L30 66 L31 59 L26 54 L33 53 Z"
          fill="#F59E0B"
        />
        <path
          d="M162 38 L164 43 L170 44 L166 48 L167 54 L162 51 L157 54 L158 48 L154 44 L160 43 Z"
          fill="#0EA5E9"
        />
        <text x="152" y="132" fontSize="22" fontWeight="bold" fill="#EC4899">
          ♫
        </text>
      </g>

      {/* Character body */}
      <g className="anim-book-bob">
        {/* Waving Right Arm */}
        <g className="anim-mascot-wave">
          <path
            d="M132 112 Q156 90 162 66"
            stroke="#FDBA74"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="163" cy="64" r="9" fill="#FDBA74" />
        </g>

        {/* Left Arm holding English Book */}
        <path
          d="M68 114 Q46 118 46 132"
          stroke="#FDBA74"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="30" y="122" width="32" height="24" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        <text x="36" y="138" fontSize="11" fontWeight="800" fill="#FFFFFF">
          ABC
        </text>

        {/* Torso / Shirt */}
        <path d="M68 106 Q100 98 132 106 L138 156 Q100 164 62 156 Z" fill="#0EA5E9" />
        <path d="M84 104 Q100 116 116 104" fill="#FFFFFF" />
        {/* Star emblem on shirt */}
        <path
          d="M100 120 L103 127 L111 128 L105 133 L107 140 L100 136 L93 140 L95 133 L89 128 L97 127 Z"
          fill="#FACC15"
        />

        {/* Neck */}
        <rect x="92" y="92" width="16" height="14" rx="6" fill="#FDBA74" />

        {/* Head */}
        <circle cx="100" cy="68" r="32" fill="#FED7AA" />
        {/* Hair */}
        <path
          d="M68 66 Q68 32 102 32 Q134 32 132 66 Q124 48 104 49 Q84 48 68 66 Z"
          fill="#451A03"
        />
        <circle cx="106" cy="34" r="9" fill="#451A03" />

        {/* Ears */}
        <circle cx="67" cy="70" r="6" fill="#FDBA74" />
        <circle cx="133" cy="70" r="6" fill="#FDBA74" />

        {/* Expressive Eyes & Cheeks */}
        <circle cx="88" cy="68" r="4.5" fill="#1E293B" />
        <circle cx="89.5" cy="66.5" r="1.5" fill="#FFFFFF" />
        <circle cx="112" cy="68" r="4.5" fill="#1E293B" />
        <circle cx="113.5" cy="66.5" r="1.5" fill="#FFFFFF" />
        <ellipse cx="79" cy="76" rx="5" ry="3" fill="#FB7185" opacity="0.55" />
        <ellipse cx="121" cy="76" rx="5" ry="3" fill="#FB7185" opacity="0.55" />

        {/* Big happy smile */}
        <path d="M89 80 Q100 92 111 80 Z" fill="#E11D48" />
        <path d="M92 80 Q100 84 108 80 Z" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

export const HobbyIllustration: React.FC<HobbyIllustrationProps> = ({
  hobbyId,
  className = 'w-full h-36',
}) => {
  switch (hobbyId) {
    case 'swimming':
      return (
        <svg viewBox="0 0 180 150" className={className} aria-label="Swimming illustration">
          {/* Pool backdrop */}
          <rect x="10" y="10" width="160" height="130" rx="22" fill="#E0F2FE" />
          {/* Water base */}
          <path d="M10 88 Q50 78 90 88 T170 88 L170 118 Q170 140 148 140 L32 140 Q10 140 10 118 Z" fill="#38BDF8" />

          {/* Bubbles */}
          <circle cx="42" cy="72" r="4" fill="#FFFFFF" className="anim-bubble-1" />
          <circle cx="138" cy="68" r="5" fill="#FFFFFF" className="anim-bubble-2" />
          <circle cx="148" cy="80" r="3" fill="#BAE6FD" className="anim-bubble-1" />

          {/* Swimmer */}
          <g className="anim-swim-body">
            {/* Back splashing feet */}
            <path d="M38 92 L22 82" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" />
            <path d="M40 97 L24 98" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" />
            {/* Torso in swimsuit */}
            <ellipse cx="74" cy="92" rx="26" ry="13" fill="#F97316" />
            {/* Head */}
            <circle cx="110" cy="74" r="19" fill="#FED7AA" />
            {/* Swim Cap */}
            <path d="M91 72 Q92 52 111 53 Q129 53 128 72 Z" fill="#EF4444" />
            {/* Swim Goggles */}
            <rect x="104" y="67" width="11" height="8" rx="3" fill="#0284C7" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="117" y="67" width="11" height="8" rx="3" fill="#0284C7" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="115" y1="71" x2="117" y2="71" stroke="#0F172A" strokeWidth="2" />
            {/* Happy Smile */}
            <path d="M108 82 Q115 88 122 82" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Animated Freestyle Arm */}
            <g className="anim-swim-arm">
              <path d="M84 86 Q102 48 128 58" stroke="#FDBA74" strokeWidth="11" strokeLinecap="round" fill="none" />
              <circle cx="130" cy="59" r="6" fill="#FDBA74" />
            </g>
          </g>

          {/* Foreground animated wave */}
          <g className="anim-wave">
            <path
              d="M12 102 Q36 92 60 102 T108 102 T156 102 T174 102 L174 122 Q174 140 148 140 L32 140 Q12 140 12 122 Z"
              fill="#0EA5E9"
              opacity="0.88"
            />
            <path
              d="M20 112 Q40 106 60 112 T100 112 T140 112"
              stroke="#E0F2FE"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>
      );

    case 'reading':
      return (
        <svg viewBox="0 0 180 150" className={className} aria-label="Reading a book illustration">
          <rect x="10" y="10" width="160" height="130" rx="22" fill="#FEF3C7" />
          {/* Cozy Floor Cushion */}
          <ellipse cx="90" cy="126" rx="54" ry="11" fill="#F59E0B" />

          {/* Floating little stars */}
          <g className="anim-float">
            <path d="M36 42 L38 47 L43 48 L39 51 L40 56 L36 53 L32 56 L33 51 L29 48 L34 47 Z" fill="#F59E0B" />
            <path d="M144 38 L146 42 L150 43 L147 46 L148 50 L144 48 L140 50 L141 46 L138 43 L142 42 Z" fill="#EC4899" />
          </g>

          <g className="anim-book-bob">
            {/* Shirt / Body */}
            <path d="M62 84 Q90 76 118 84 L124 122 Q90 128 56 122 Z" fill="#10B981" />

            {/* Head */}
            <circle cx="90" cy="58" r="24" fill="#FED7AA" />
            {/* Hair */}
            <path d="M66 56 Q68 28 92 28 Q116 28 114 56 Q104 42 90 43 Q76 42 66 56 Z" fill="#78350F" />
            {/* Round Glasses */}
            <circle cx="81" cy="59" r="7" fill="#FFFFFF" fillOpacity="0.4" stroke="#334155" strokeWidth="2.2" />
            <circle cx="99" cy="59" r="7" fill="#FFFFFF" fillOpacity="0.4" stroke="#334155" strokeWidth="2.2" />
            <line x1="88" y1="59" x2="92" y2="59" stroke="#334155" strokeWidth="2.2" />
            {/* Eyes */}
            <circle cx="81" cy="60" r="2.6" fill="#0F172A" />
            <circle cx="99" cy="60" r="2.6" fill="#0F172A" />
            {/* Smile */}
            <path d="M84 71 Q90 76 96 71" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Open Book */}
            <path d="M46 92 L90 98 L90 124 L44 118 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
            <path d="M134 92 L90 98 L90 124 L136 118 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
            {/* White Pages */}
            <path d="M50 88 L89 95 L89 119 L48 113 Z" fill="#FFFFFF" />
            <path d="M130 88 L91 95 L91 119 L132 113 Z" fill="#FFFFFF" />
            {/* Text lines */}
            <line x1="56" y1="96" x2="82" y2="100" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="103" x2="80" y2="107" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="98" y1="100" x2="124" y2="96" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="98" y1="107" x2="122" y2="103" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />

            {/* Animated Turning Page */}
            <path d="M90 95 L122 84 L120 110 L90 119 Z" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" className="anim-page-flip" />

            {/* Hands holding book */}
            <circle cx="50" cy="108" r="6" fill="#FDBA74" />
            <circle cx="130" cy="108" r="6" fill="#FDBA74" />
          </g>
        </svg>
      );

    case 'football':
      return (
        <svg viewBox="0 0 180 150" className={className} aria-label="Playing football illustration">
          <rect x="10" y="10" width="160" height="130" rx="22" fill="#ECFDF5" />
          {/* Grass field */}
          <path d="M10 112 Q90 104 170 112 L170 118 Q170 140 148 140 L32 140 Q10 140 10 118 Z" fill="#22C55E" />

          {/* Kid Player */}
          <g>
            {/* Standing Left Leg */}
            <path d="M62 94 L58 118" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" />
            <ellipse cx="61" cy="120" rx="8" ry="4.5" fill="#EF4444" />

            {/* Animated Kicking Right Leg */}
            <g className="anim-kick-leg">
              <path d="M76 94 L98 110" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" />
              <ellipse cx="101" cy="112" rx="8" ry="4.5" fill="#EF4444" />
            </g>

            {/* Jersey & Shorts */}
            <path d="M54 84 L84 84 L86 98 L52 98 Z" fill="#1E40AF" />
            <path d="M52 58 Q69 52 86 58 L84 86 L54 86 Z" fill="#F59E0B" />
            <rect x="65" y="57" width="8" height="28" fill="#FFFFFF" opacity="0.7" />

            {/* Arms */}
            <path d="M54 62 L38 74" stroke="#FDBA74" strokeWidth="9" strokeLinecap="round" />
            <path d="M84 62 L100 54" stroke="#FDBA74" strokeWidth="9" strokeLinecap="round" />

            {/* Head */}
            <circle cx="69" cy="40" r="18" fill="#FED7AA" />
            <path d="M51 38 Q52 18 71 19 Q88 19 86 38 Q78 27 68 28 Q58 27 51 38 Z" fill="#1E293B" />
            <circle cx="63" cy="40" r="2.6" fill="#0F172A" />
            <circle cx="76" cy="40" r="2.6" fill="#0F172A" />
            <path d="M64 47 Q70 53 76 47" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </g>

          {/* Animated Bouncing Soccer Ball */}
          <g className="anim-ball-bounce">
            <circle cx="122" cy="104" r="16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
            <polygon points="122,95 128,100 126,107 118,107 116,100" fill="#1E293B" />
            <line x1="122" y1="95" x2="122" y2="88" stroke="#1E293B" strokeWidth="2" />
            <line x1="128" y1="100" x2="136" y2="97" stroke="#1E293B" strokeWidth="2" />
            <line x1="116" y1="100" x2="108" y2="97" stroke="#1E293B" strokeWidth="2" />
            <line x1="126" y1="107" x2="131" y2="115" stroke="#1E293B" strokeWidth="2" />
            <line x1="118" y1="107" x2="113" y2="115" stroke="#1E293B" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'singing':
      return (
        <svg viewBox="0 0 180 150" className={className} aria-label="Singing illustration">
          <rect x="10" y="10" width="160" height="130" rx="22" fill="#FFE4E6" />
          {/* Stage spotlight glow */}
          <ellipse cx="90" cy="126" rx="54" ry="10" fill="#FDA4AF" opacity="0.6" />

          {/* Floating Music Notes */}
          <text x="128" y="54" fontSize="22" fontWeight="bold" fill="#E11D48" className="anim-note-1">
            ♪
          </text>
          <text x="36" y="60" fontSize="22" fontWeight="bold" fill="#8B5CF6" className="anim-note-2">
            ♫
          </text>

          {/* Singer Character */}
          <g>
            {/* Body */}
            <path d="M64 88 Q90 80 116 88 L122 126 L58 126 Z" fill="#EC4899" />
            <path d="M80 86 L90 100 L100 86" fill="#FFFFFF" />

            {/* Left Arm raised */}
            <path d="M66 92 Q46 82 44 68" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" fill="none" />
            <circle cx="43" cy="66" r="6" fill="#FDBA74" />

            {/* Head bobbing */}
            <g className="anim-sing-head">
              <circle cx="90" cy="58" r="23" fill="#FED7AA" />
              {/* Hair with cute bow/headband */}
              <path d="M66 56 Q68 28 90 28 Q114 28 114 56 Q104 42 90 42 Q76 42 66 56 Z" fill="#312E81" />
              <path d="M68 46 Q90 32 112 46" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" fill="none" />

              {/* Happy Singing Eyes & Open Mouth */}
              <path d="M76 56 Q81 51 86 56" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M94 56 Q99 51 104 56" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <ellipse cx="90" cy="69" rx="6" ry="7" fill="#BE123C" />
              <ellipse cx="90" cy="72" rx="4" ry="2.5" fill="#FB7185" />
            </g>

            {/* Right Arm holding Microphone */}
            <path d="M112 94 Q124 88 120 74" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" fill="none" />
            <rect x="111" y="64" width="7" height="20" rx="3" transform="rotate(-22 111 64)" fill="#334155" />
            <circle cx="111" cy="60" r="8" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
            <line x1="105" y1="60" x2="117" y2="60" stroke="#475569" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 'dancing':
      return (
        <svg viewBox="0 0 180 150" className={className} aria-label="Dancing illustration">
          <rect x="10" y="10" width="160" height="130" rx="22" fill="#FFEDD5" />
          {/* Dance floor */}
          <ellipse cx="90" cy="126" rx="52" ry="9" fill="#FDBA74" />

          {/* Music notes */}
          <text x="28" y="48" fontSize="20" fontWeight="bold" fill="#EA580C" className="anim-note-1">
            ♫
          </text>
          <text x="138" y="54" fontSize="20" fontWeight="bold" fill="#0EA5E9" className="anim-note-2">
            ♪
          </text>

          <g className="anim-dance-groove">
            {/* Legs in dancing pose */}
            <path d="M80 96 L64 120" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" />
            <path d="M100 96 L116 116" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" />
            <ellipse cx="62" cy="122" rx="8" ry="4.5" fill="#F97316" />
            <ellipse cx="118" cy="118" rx="8" ry="4.5" fill="#F97316" />

            {/* Left & Right animated dancing arms */}
            <g className="anim-dance-arm-l">
              <path d="M72 72 Q46 58 40 42" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="39" cy="40" r="5.5" fill="#FDBA74" />
            </g>
            <g className="anim-dance-arm-r">
              <path d="M108 72 Q134 80 140 62" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="141" cy="60" r="5.5" fill="#FDBA74" />
            </g>

            {/* Outfit */}
            <path d="M72 68 L108 68 L116 98 L64 98 Z" fill="#F97316" />
            <path d="M74 68 Q90 78 106 68" fill="#FDE047" />

            {/* Head */}
            <circle cx="90" cy="46" r="20" fill="#FED7AA" />
            <path d="M70 44 Q72 20 92 20 Q110 20 110 44 Q100 32 90 33 Q78 32 70 44 Z" fill="#451A03" />
            <circle cx="83" cy="45" r="2.7" fill="#0F172A" />
            <circle cx="97" cy="45" r="2.7" fill="#0F172A" />
            <path d="M83 54 Q90 61 97 54" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      );

    case 'drawing':
      return (
        <svg viewBox="0 0 180 150" className={className} aria-label="Drawing illustration">
          <rect x="10" y="10" width="160" height="130" rx="22" fill="#CCFBF1" />

          {/* Wooden Easel */}
          <line x1="126" y1="30" x2="108" y2="130" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
          <line x1="126" y1="30" x2="146" y2="130" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
          <rect x="98" y="34" width="56" height="62" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="4" />

          {/* Artwork on Canvas: Sun & Rainbow */}
          <circle cx="114" cy="52" r="8" fill="#FACC15" />
          <path d="M108 82 Q126 60 144 82" stroke="#F43F5E" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M112 84 Q126 68 140 84" stroke="#38BDF8" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Kid Artist */}
          <g>
            {/* Body with paint apron */}
            <path d="M40 84 Q62 76 84 84 L88 128 L36 128 Z" fill="#0D9488" />
            <path d="M48 86 L76 86 L79 124 L45 124 Z" fill="#FEF9C3" />
            {/* Paint splatters on apron */}
            <circle cx="56" cy="102" r="3" fill="#EF4444" />
            <circle cx="68" cy="112" r="3.5" fill="#3B82F6" />

            {/* Head */}
            <circle cx="62" cy="58" r="20" fill="#FED7AA" />
            <path d="M42 56 Q44 34 62 34 Q82 34 82 56 Q72 44 62 45 Q52 44 42 56 Z" fill="#451A03" />
            {/* Artist Beret */}
            <ellipse cx="60" cy="36" rx="18" ry="8" transform="rotate(-12 60 36)" fill="#E11D48" />
            <line x1="58" y1="26" x2="60" y2="30" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />

            <circle cx="57" cy="58" r="2.5" fill="#0F172A" />
            <circle cx="70" cy="58" r="2.5" fill="#0F172A" />
            <path d="M58 66 Q64 71 70 66" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Animated Painting Arm & Brush */}
            <g className="anim-brush-paint">
              <path d="M76 92 Q92 84 102 72" stroke="#FDBA74" strokeWidth="9" strokeLinecap="round" fill="none" />
              <line x1="100" y1="74" x2="116" y2="62" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
              <circle cx="117" cy="61" r="3.5" fill="#EF4444" />
            </g>
          </g>
        </svg>
      );

    case 'cycling':
      return (
        <svg viewBox="0 0 180 150" className={className} aria-label="Cycling illustration">
          <rect x="10" y="10" width="160" height="130" rx="22" fill="#ECFEFF" />
          {/* Road */}
          <rect x="10" y="116" width="160" height="24" rx="10" fill="#94A3B8" />
          <line x1="24" y1="128" x2="54" y2="128" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 10" />
          <line x1="76" y1="128" x2="156" y2="128" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 10" />

          {/* Wind speed streaks */}
          <g className="anim-wind">
            <line x1="22" y1="42" x2="46" y2="42" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
            <line x1="16" y1="54" x2="38" y2="54" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" />
          </g>

          <g className="anim-bike-ride">
            {/* Back Wheel */}
            <g className="anim-wheel-spin">
              <circle cx="56" cy="102" r="20" fill="none" stroke="#1E293B" strokeWidth="5" />
              <circle cx="56" cy="102" r="4" fill="#06B6D4" />
              <line x1="56" y1="84" x2="56" y2="120" stroke="#94A3B8" strokeWidth="2" />
              <line x1="38" y1="102" x2="74" y2="102" stroke="#94A3B8" strokeWidth="2" />
            </g>

            {/* Front Wheel */}
            <g className="anim-wheel-spin">
              <circle cx="126" cy="102" r="20" fill="none" stroke="#1E293B" strokeWidth="5" />
              <circle cx="126" cy="102" r="4" fill="#06B6D4" />
              <line x1="126" y1="84" x2="126" y2="120" stroke="#94A3B8" strokeWidth="2" />
              <line x1="108" y1="102" x2="144" y2="102" stroke="#94A3B8" strokeWidth="2" />
            </g>

            {/* Bike Frame */}
            <path
              d="M56 102 L86 102 L112 76 L76 76 Z"
              fill="none"
              stroke="#EF4444"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <line x1="126" y1="102" x2="108" y2="68" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            {/* Handlebar & Seat */}
            <line x1="102" y1="68" x2="114" y2="66" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            <line x1="70" y1="74" x2="82" y2="74" stroke="#334155" strokeWidth="5" strokeLinecap="round" />

            {/* Rider */}
            {/* Leg on pedal */}
            <path d="M78 74 L92 92 L86 102" stroke="#1E40AF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Torso */}
            <path d="M70 52 L92 58 L84 78 L66 74 Z" fill="#0EA5E9" />
            {/* Arm to handlebar */}
            <path d="M84 56 L108 66" stroke="#FDBA74" strokeWidth="8" strokeLinecap="round" />
            {/* Head + Helmet */}
            <circle cx="88" cy="40" r="15" fill="#FED7AA" />
            <path d="M72 38 Q74 20 92 22 Q106 24 104 38 Z" fill="#0284C7" />
            <circle cx="94" cy="40" r="2.2" fill="#0F172A" />
            <path d="M88 46 Q94 50 98 46" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      );

    case 'cooking':
      return (
        <svg viewBox="0 0 180 150" className={className} aria-label="Cooking illustration">
          <rect x="10" y="10" width="160" height="130" rx="22" fill="#FEF9C3" />

          {/* Kitchen Counter & Stove */}
          <rect x="20" y="106" width="140" height="34" rx="10" fill="#FDE047" />
          <rect x="98" y="102" width="44" height="6" rx="2" fill="#475569" />

          {/* Rising Steam */}
          <path d="M112 76 Q106 68 112 60" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" fill="none" className="anim-steam-1" />
          <path d="M126 74 Q132 66 126 58" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" fill="none" className="anim-steam-2" />

          {/* Little Chef */}
          <g>
            {/* Body & Apron */}
            <path d="M40 78 Q62 72 84 78 L86 106 L38 106 Z" fill="#EF4444" />
            <path d="M48 80 L76 80 L78 106 L46 106 Z" fill="#FFFFFF" />

            {/* Head */}
            <circle cx="62" cy="58" r="19" fill="#FED7AA" />
            <circle cx="56" cy="58" r="2.5" fill="#0F172A" />
            <circle cx="69" cy="58" r="2.5" fill="#0F172A" />
            <path d="M56 65 Q62 71 68 65" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Chef Hat */}
            <rect x="46" y="34" width="32" height="11" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="52" cy="28" r="9" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="62" cy="24" r="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="72" cy="28" r="9" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Arm holding Frying Pan */}
            <g className="anim-pan-toss">
              <path d="M76 84 L96 90" stroke="#FDBA74" strokeWidth="9" strokeLinecap="round" />
              <line x1="92" y1="90" x2="106" y2="92" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
              <path d="M104 88 L142 88 L136 98 L110 98 Z" fill="#334155" />
            </g>

            {/* Jumping Veggies in Pan */}
            <g className="anim-veggie-jump">
              <circle cx="116" cy="82" r="4.5" fill="#F97316" />
              <circle cx="126" cy="79" r="4" fill="#22C55E" />
              <circle cx="133" cy="83" r="4" fill="#EF4444" />
            </g>
          </g>
        </svg>
      );
  }
};
