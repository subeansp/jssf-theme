import jssf_theme from "./jssf_theme.jpg";

const ROWS = parseInt(import.meta.env.VITE_ROWS) || 1;
const COLS = parseInt(import.meta.env.VITE_COLS) || 1;
const MATCHED = parseInt(import.meta.env.VITE_MATCHED) || 0;
const PAIRS = ROWS * COLS;

const storedIds = localStorage.getItem("Ids");
let Ids: number[];

if (storedIds) {
  Ids = JSON.parse(storedIds);
} else {
  Ids = Array.from({ length: PAIRS }, (_, index) => index);
  for (let i = PAIRS - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [Ids[i], Ids[j]] = [Ids[j], Ids[i]];
  }
  localStorage.setItem("Ids", JSON.stringify(Ids));
}

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: `url(${jssf_theme}) no-repeat center/cover`,
        display: "grid",
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      }}
    >
      {Array.from({ length: PAIRS }, (_, index) => (
        <div
          key={index}
          style={{
            backgroundColor: Ids.slice(MATCHED).includes(index)
              ? "black"
              : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export default App;
