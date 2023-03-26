import './Square.css';
export default function Square({ isWhite, piece = null, highlight = null, drag }) {
  const className = ["square",
                      isWhite && "whiteSquare",
                      !isWhite &&  "blackSquare",
                      !piece && highlight ? "squareHighlight" : null,
                      piece && highlight ? "squareHighlightOccupied" : null,
                      drag ? "drag" : null
                    ].filter(Boolean).join(' ');
  return (
    <div className={className}>
      {piece && <div style={{backgroundImage: `url(${piece})`}} className={`piece ${drag ? 'drag' : ''}`}></div>}
    </div>
      );
}