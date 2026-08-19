// Restrained brand line-art system — used only where a genuine Birthwave
// photograph isn't appropriate. Each mark is a deliberate, recognisable
// continuous-line figure (not abstract circles/dots) so the subject reads
// even without the heading nearby.
// Palette: #613E37 (brown) / #CA9585 (rose) as primary strokes, #5DAEDB (blue)
// and #F88379 (coral) as sparing accent — matching the locked token set.
import type { ReactElement } from "react";

export type LineArtVariant =
  | "pregnancy"
  | "birth"
  | "vbac"
  | "fertility"
  | "vaginismus"
  | "newborn"
  | "journey"
  | "support";

function PregnancyMark() {
  // Standing figure, side profile, one continuous line — belly curve reads
  // immediately as pregnancy.
  return (
    <>
      <path
        d="M92 36c-10 0-16 8-16 16 0 6 3 10 3 14-10 6-16 20-16 38 0 24 14 40 16 52 1 8-4 12-4 12"
        stroke="#613E37"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M79 66c22-4 40 10 40 32 0 18-12 30-28 32"
        stroke="#CA9585"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="128" cy="60" r="5" fill="#5DAEDB" opacity="0.8" />
    </>
  );
}

function BirthMark() {
  return (
    <>
      <path
        d="M40 150c20-60 50-95 60-95s40 35 60 95"
        stroke="#613E37"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 150c14-40 30-64 40-64s26 24 40 64"
        stroke="#CA9585"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="100" cy="70" r="5" fill="#F88379" opacity="0.85" />
    </>
  );
}

function VbacMark() {
  return (
    <>
      <path
        d="M35 100c8-10 24-10 32 0s24 10 32 0 24-10 32 0 24-10 32 0"
        stroke="#613E37"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="60" cy="100" r="4" fill="#CA9585" />
      <circle cx="100" cy="100" r="4" fill="#F88379" />
      <circle cx="140" cy="100" r="4" fill="#5DAEDB" />
    </>
  );
}

function FertilityMark() {
  // Sprouting seed — growth/preconception, not a target/crosshair.
  return (
    <>
      <path
        d="M100 150V95"
        stroke="#613E37"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M100 100c0-22 14-34 30-36-2 20-12 32-30 36Z"
        stroke="#CA9585"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M100 112c0-16-11-25-24-27 2 15 10 24 24 27Z"
        stroke="#613E37"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="100" cy="158" r="6" fill="#5DAEDB" opacity="0.8" />
    </>
  );
}

function VaginismusMark() {
  // A calm, private lotus bloom — five petals radiating from a centre, an
  // established wellness motif with no risk of an accidental facial reading.
  return (
    <>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M100 104C100 74 84 52 100 30C116 52 100 74 100 104Z"
          stroke="#613E37"
          strokeWidth="1.75"
          fill="none"
          strokeLinejoin="round"
          transform={`rotate(${angle} 100 104)`}
        />
      ))}
      <circle cx="100" cy="104" r="6" fill="#F88379" opacity="0.8" />
      <path
        d="M100 104v46"
        stroke="#CA9585"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </>
  );
}

function NewbornMark() {
  // Mother's head + cradling arm, holding baby's head — a simple, clearly
  // readable continuous-line figure built from predictable arcs.
  return (
    <>
      {/* mother's head */}
      <circle cx="78" cy="52" r="24" stroke="#613E37" strokeWidth="2" fill="none" />
      {/* shoulder / cradling arm sweeping down and under the baby */}
      <path
        d="M40 100c0-14 17-24 38-24s38 10 38 24v10c0 22-16 34-38 34-8 0-15-1-21-4"
        stroke="#613E37"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* baby's head, nested in the cradle */}
      <circle cx="122" cy="118" r="16" stroke="#CA9585" strokeWidth="2" fill="none" />
      <circle cx="122" cy="118" r="3.5" fill="#F88379" opacity="0.85" />
    </>
  );
}

function JourneyMark() {
  // One continuous line connecting fertility → pregnancy → birth → baby —
  // the "connected care journey" the Services page describes.
  return (
    <>
      <path
        d="M18 130 Q32 105 46 118 Q60 131 74 108 Q88 85 100 100 Q112 115 126 112 Q140 109 146 112 Q160 118 176 126"
        stroke="#613E37"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="118" r="5" fill="#5DAEDB" opacity="0.85" />
      <circle cx="96" cy="100" r="5" fill="#CA9585" opacity="0.9" />
      <circle cx="146" cy="112" r="5" fill="#F88379" opacity="0.85" />
      <circle cx="176" cy="126" r="4" fill="#613E37" opacity="0.6" />
    </>
  );
}

function SupportMark() {
  // A conversation bubble holding a small heartbeat line — reaching out,
  // being heard.
  return (
    <>
      <path
        d="M40 55h120c11 0 20 9 20 20v40c0 11-9 20-20 20H92l-24 22v-22H40c-11 0-20-9-20-20V75c0-11 9-20 20-20Z"
        stroke="#613E37"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M52 92h20l8-14 10 24 8-16h30"
        stroke="#F88379"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="146" cy="92" r="4" fill="#5DAEDB" opacity="0.8" />
    </>
  );
}

const MARKS: Record<LineArtVariant, () => ReactElement> = {
  pregnancy: PregnancyMark,
  birth: BirthMark,
  vbac: VbacMark,
  fertility: FertilityMark,
  vaginismus: VaginismusMark,
  newborn: NewbornMark,
  journey: JourneyMark,
  support: SupportMark,
};

export function LineArtIllustration({
  variant,
  className = "",
}: {
  variant: LineArtVariant;
  className?: string;
}) {
  const Mark = MARKS[variant];
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <Mark />
    </svg>
  );
}
