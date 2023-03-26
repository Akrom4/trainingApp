notes

import './Square.css';

export default function Square({ isWhite, piece = null, highlight = null }) {
  const className = ["square",
                      isWhite && "whiteSquare",
                      !isWhite &&  "blackSquare",
                      highlight && "squareHighlight"
                    ].filter(Boolean).join(' ');
                    console.log(className);
  return (
    <div className={className}>
      {piece && <div style={{backgroundImage: `url(${piece})`}} className="piece" alt=""></div>}
    </div>
      );
}