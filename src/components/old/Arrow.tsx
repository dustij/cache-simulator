export function Arrow({
  direction,
}: {
  direction: "left" | "right" | "up" | "down";
}) {
  switch (direction) {
    case "right":
      return (
        <svg
          width="70"
          height="20"
          viewBox="0 0 70 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="10" x2="70" y2="10" stroke="black" strokeWidth="1" />
          <polygon points="63,5 70,10 63,15" fill="black" />
        </svg>
      );
    default:
      return null;
  }
}
