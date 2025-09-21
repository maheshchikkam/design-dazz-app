export default function Logo({ height = 45, width = 45 }) {
  return (
    <img
      src="/favicon.svg"
      alt="Logo"
      loading="lazy"
      height={height}
      width={width}
      style={{ display: 'block' }}
    />
  );
}
