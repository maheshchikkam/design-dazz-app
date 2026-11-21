export default function Logo({ height = 45, width = 45 }) {
  return (
    <img
      src="/favicon_white.png"
      alt="Logo"
      loading="lazy"
      height={height}
      width={width}
      style={{ display: 'block' }}
    />
  );
}
