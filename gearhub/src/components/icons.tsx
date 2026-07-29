import type { SVGProps } from 'react';

/**
 * Inline icon set.
 *
 * These replace an icon-library dependency: the app needs about a dozen
 * glyphs, so shipping them as components keeps the install to react,
 * react-dom and react-router and leaves nothing to go stale.
 *
 * All icons share one 24x24 grid with a 2px round stroke, so they line up
 * and can be sized and coloured with `className` like any other element:
 *
 *   <Search className="size-4 text-slate-400" />
 */
type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------- interface ---------- */

export function Search(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Icon>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function ShoppingCart(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 3h2.2l2.6 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H5" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
    </Icon>
  );
}

export function Plus(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}

export function Minus(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
    </Icon>
  );
}

export function Trash(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </Icon>
  );
}

export function Check(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 13 4 4 10-10" />
    </Icon>
  );
}

/** Three stacked lines — the category / list control. */
export function Menu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

/** Funnel — the usual "filter" mark. */
export function Funnel(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 5h18l-7 8v6l-4 2v-8z" />
    </Icon>
  );
}

export function Sliders(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h10M18 18h2" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="16" cy="18" r="2" />
    </Icon>
  );
}

export function X(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

/* ---------- categories ---------- */

export function Headphones(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <path d="M4 15h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M20 15h-2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1z" />
    </Icon>
  );
}

export function BatteryCharging(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 7H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4" />
      <path d="M14 7h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-5" />
      <path d="M22 11v2" />
      <path d="m12 6-3 6h4l-3 6" />
    </Icon>
  );
}

export function Speaker(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <circle cx="12" cy="15" r="3.5" />
      <circle cx="12" cy="7" r="1.2" />
    </Icon>
  );
}

export function Keyboard(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
    </Icon>
  );
}

export function Mouse(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="6" y="2" width="12" height="20" rx="6" />
      <path d="M12 6v4" />
    </Icon>
  );
}

export function Microphone(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3M9 21h6" />
    </Icon>
  );
}

export function Webcam(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="10" r="7" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M12 17v3M8 20h8" />
    </Icon>
  );
}

export function Router(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="14" width="20" height="7" rx="2" />
      <path d="M6.5 17.5h.01M10 17.5h.01" />
      <path d="m7 14 1.5-4M17 14 15.5 10" />
      <path d="M9 6a4.5 4.5 0 0 1 6 0" />
    </Icon>
  );
}

export function Phone(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </Icon>
  );
}

export function Plug(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 2v6M15 2v6" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0z" />
      <path d="M12 17v5" />
    </Icon>
  );
}
