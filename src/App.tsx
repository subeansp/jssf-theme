import jssf_theme from "./jssf_theme.jpg";

const ROWS = import.meta.env.VITE_ROWS || 1;
const COLS = import.meta.env.VITE_COLS || 1;
const MATCHED = import.meta.env.VITE_MATCHED || 0;
const PAIRS = ROWS * COLS;

const storedIDS = localStorage.getItem("IDS");
let IDS: number[];

if (storedIDS) {
  IDS = JSON.parse(storedIDS);
} else {
  IDS = Array.from({ length: PAIRS }, (_, index) => index);
  for (let i = PAIRS - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [IDS[i], IDS[j]] = [IDS[j], IDS[i]];
  }
  localStorage.setItem("IDS", JSON.stringify(IDS));
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
            backgroundColor: IDS.slice(MATCHED).includes(index)
              ? "black"
              : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export default App;
