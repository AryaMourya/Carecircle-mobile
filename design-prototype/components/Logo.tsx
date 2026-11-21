// Three people around a heart: a "circle of care".
export function Logo({ size = 32, text = true }: { size?: number; text?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" width={size} height={size} alt="" />
      {text && <span className="text-lg font-bold text-green-800">CareCircle</span>}
    </span>
  );
}
