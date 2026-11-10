
import React, { useState } from "react";

const COLORS = [
  "#FF0000", "#FF5722", "#FF9800", "#FFC107",
  "#FFEB3B", "#CDDC39", "#8BC34A", "#4CAF50",
  "#009688", "#00BCD4", "#03A9F4", "#2196F3",
  "#3F51B5", "#673AB7", "#9C27B0", "#E91E63",
  "#F06292", "#795548", "#9E9E9E", "#607D8B",
  "#000000", "#FFFFFF", "#F8BBD0", "#FFCCBC",
  "#FFE0B2", "#FFF9C4", "#DCEDC8", "#B2DFDB",
  "#B3E5FC", "#BBDEFB", "#C5CAE9", "#D1C4E9",
  "#E1BEE7", "#F3E5F5", "#A1887F", "#455A64"
];

// Every shape is an independently colorable region.
const drawings = [
  {
    name: "Happy House",
    shapes: [
      ["rect", { x: 105, y: 165, width: 190, height: 150 }],
      ["polygon", { points: "80,170 200,65 320,170" }],
      ["rect", { x: 175, y: 220, width: 55, height: 95 }],
      ["rect", { x: 125, y: 195, width: 40, height: 40 }],
      ["rect", { x: 235, y: 195, width: 40, height: 40 }],
      ["rect", { x: 245, y: 85, width: 35, height: 55 }],
      ["circle", { cx: 55, cy: 70, r: 30 }],
      ["circle", { cx: 55, cy: 70, r: 18 }],
      ["rect", { x: 20, y: 320, width: 360, height: 8 }]
    ]
  },
  {
    name: "Beautiful Flower",
    shapes: [
      ["ellipse", { cx: 200, cy: 105, rx: 35, ry: 65 }],
      ["ellipse", { cx: 200, cy: 235, rx: 35, ry: 65 }],
      ["ellipse", { cx: 135, cy: 170, rx: 65, ry: 35 }],
      ["ellipse", { cx: 265, cy: 170, rx: 65, ry: 35 }],
      ["circle", { cx: 200, cy: 170, r: 35 }],
      ["path", { d: "M200 205 Q190 270 200 330" }],
      ["ellipse", { cx: 165, cy: 270, rx: 35, ry: 16, transform: "rotate(25 165 270)" }],
      ["ellipse", { cx: 235, cy: 300, rx: 35, ry: 16, transform: "rotate(-25 235 300)" }]
    ]
  },
  {
    name: "Butterfly",
    shapes: [
      ["ellipse", { cx: 130, cy: 120, rx: 65, ry: 85 }],
      ["ellipse", { cx: 270, cy: 120, rx: 65, ry: 85 }],
      ["ellipse", { cx: 130, cy: 245, rx: 55, ry: 65 }],
      ["ellipse", { cx: 270, cy: 245, rx: 55, ry: 65 }],
      ["ellipse", { cx: 200, cy: 185, rx: 18, ry: 95 }],
      ["circle", { cx: 200, cy: 75, r: 20 }],
      ["path", { d: "M190 65 Q150 10 125 35" }],
      ["path", { d: "M210 65 Q250 10 275 35" }]
    ]
  },
  {
    name: "Cute Fish",
    shapes: [
      ["ellipse", { cx: 190, cy: 180, rx: 105, ry: 65 }],
      ["polygon", { points: "285,180 365,115 365,245" }],
      ["polygon", { points: "180,115 225,55 250,125" }],
      ["polygon", { points: "180,245 225,305 250,235" }],
      ["circle", { cx: 115, cy: 160, r: 12 }],
      ["ellipse", { cx: 220, cy: 180, rx: 35, ry: 25 }]
    ]
  },
  {
    name: "Rocket Ship",
    shapes: [
      ["path", { d: "M200 35 Q285 105 260 255 L140 255 Q115 105 200 35 Z" }],
      ["circle", { cx: 200, cy: 125, r: 28 }],
      ["polygon", { points: "140,210 80,280 145,265" }],
      ["polygon", { points: "260,210 320,280 255,265" }],
      ["polygon", { points: "165,255 200,345 235,255" }],
      ["ellipse", { cx: 200, cy: 330, rx: 15, ry: 25 }]
    ]
  },
  {
    name: "Big Tree",
    shapes: [
      ["rect", { x: 170, y: 190, width: 60, height: 145 }],
      ["circle", { cx: 200, cy: 100, r: 65 }],
      ["circle", { cx: 130, cy: 160, r: 55 }],
      ["circle", { cx: 270, cy: 160, r: 55 }],
      ["circle", { cx: 155, cy: 65, r: 40 }],
      ["circle", { cx: 245, cy: 65, r: 40 }]
    ]
  },
  {
    name: "Cute Car",
    shapes: [
      ["path", { d: "M65 220 L90 150 Q100 130 125 130 L255 130 Q280 130 295 160 L330 220 L330 275 L65 275 Z" }],
      ["polygon", { points: "125,145 175,145 175,205 95,205" }],
      ["polygon", { points: "190,145 250,145 290,205 190,205" }],
      ["circle", { cx: 120, cy: 275, r: 30 }],
      ["circle", { cx: 275, cy: 275, r: 30 }],
      ["circle", { cx: 120, cy: 275, r: 12 }],
      ["circle", { cx: 275, cy: 275, r: 12 }]
    ]
  },
  {
    name: "Castle",
    shapes: [
      ["rect", { x: 100, y: 150, width: 200, height: 180 }],
      ["rect", { x: 55, y: 110, width: 65, height: 220 }],
      ["rect", { x: 280, y: 110, width: 65, height: 220 }],
      ["polygon", { points: "55,110 87,55 120,110" }],
      ["polygon", { points: "280,110 312,55 345,110" }],
      ["polygon", { points: "100,150 200,75 300,150" }],
      ["path", { d: "M175 330 L175 255 Q200 220 225 255 L225 330 Z" }],
      ["rect", { x: 135, y: 185, width: 35, height: 45 }],
      ["rect", { x: 230, y: 185, width: 35, height: 45 }]
    ]
  },
  {
    name: "Cupcake",
    shapes: [
      ["path", { d: "M105 165 Q105 95 160 115 Q200 40 240 115 Q295 95 295 165 Q295 195 260 195 L140 195 Q105 195 105 165 Z" }],
      ["path", { d: "M120 200 L280 200 L250 325 L150 325 Z" }],
      ["circle", { cx: 200, cy: 80, r: 20 }],
      ["path", { d: "M160 235 L175 300 M200 235 L200 300 M240 235 L225 300" }]
    ]
  },
  {
    name: "Sailing Boat",
    shapes: [
      ["polygon", { points: "195,65 195,230 75,230" }],
      ["polygon", { points: "210,95 210,230 320,230" }],
      ["polygon", { points: "65,250 335,250 290,320 115,320" }],
      ["path", { d: "M35 345 Q85 325 135 345 Q185 365 235 345 Q285 325 365 345" }]
    ]
  },
  {
    name: "Cute Cat",
    shapes: [
      ["circle", { cx: 200, cy: 205, r: 90 }],
      ["polygon", { points: "125,145 115,55 180,110" }],
      ["polygon", { points: "275,145 285,55 220,110" }],
      ["ellipse", { cx: 165, cy: 190, rx: 12, ry: 18 }],
      ["ellipse", { cx: 235, cy: 190, rx: 12, ry: 18 }],
      ["polygon", { points: "190,220 210,220 200,232" }],
      ["path", { d: "M200 232 Q180 260 160 240 M200 232 Q220 260 240 240" }],
      ["path", { d: "M110 225 L45 210 M110 245 L45 255 M290 225 L355 210 M290 245 L355 255" }]
    ]
  },
  {
    name: "Rainbow",
    shapes: [
      ["path", { d: "M60 280 A140 140 0 0 1 340 280 L305 280 A105 105 0 0 0 95 280 Z" }],
      ["path", { d: "M95 280 A105 105 0 0 1 305 280 L270 280 A70 70 0 0 0 130 280 Z" }],
      ["path", { d: "M130 280 A70 70 0 0 1 270 280 L235 280 A35 35 0 0 0 165 280 Z" }],
      ["path", { d: "M165 280 A35 35 0 0 1 235 280 L165 280 Z" }],
      ["circle", { cx: 65, cy: 285, r: 35 }],
      ["circle", { cx: 335, cy: 285, r: 35 }]
    ]
  }
];

const PaintApp = () => {
  const [drawingIndex, setDrawingIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [painted, setPainted] = useState({});

  const currentDrawing = drawings[drawingIndex];
  const drawingKey = `drawing-${drawingIndex}`;

  const paintRegion = (shapeIndex) => {
    setPainted((previous) => ({
      ...previous,
      [`${drawingKey}-${shapeIndex}`]: selectedColor
    }));
  };

  const nextDrawing = () => {
    setDrawingIndex((previous) => (previous + 1) % drawings.length);
  };

  const previousDrawing = () => {
    setDrawingIndex((previous) =>
      (previous - 1 + drawings.length) % drawings.length
    );
  };

  const randomDrawing = () => {
    if (drawings.length < 2) return;

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * drawings.length);
    } while (randomIndex === drawingIndex);

    setDrawingIndex(randomIndex);
  };

  const resetDrawing = () => {
    setPainted((previous) => {
      const updated = { ...previous };

      currentDrawing.shapes.forEach((_, index) => {
        delete updated[`${drawingKey}-${index}`];
      });

      return updated;
    });
  };

  const renderShape = ([type, attributes], index) => {
    const fillColor =
      painted[`${drawingKey}-${index}`] || "#FFFFFF";

    const commonProps = {
      ...attributes,
      key: index,
      fill: type === "path" && !attributes.d ? "#FFFFFF" : fillColor,
      stroke: "#222222",
      strokeWidth: 3,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { cursor: "pointer", transition: "fill 0.15s" },
      onClick: () => paintRegion(index)
    };

    // Lines remain outlines and are not treated as coloring regions.
    if (type === "path" && !attributes.d?.includes("Z")) {
      return (
        <path
          key={index}
          {...attributes}
          fill="none"
          stroke="#222222"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    }

    switch (type) {
      case "rect":
        return <rect {...commonProps} />;
      case "circle":
        return <circle {...commonProps} />;
      case "ellipse":
        return <ellipse {...commonProps} />;
      case "polygon":
        return <polygon {...commonProps} />;
      case "path":
        return <path {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="paint-app">
      <style>{`
        .paint-app {
          max-width: 1100px;
          margin: 35px auto;
          padding: 24px;
          font-family: Arial, sans-serif;
          background: #f4f6f9;
          border-radius: 18px;
          color: #222;
        }

        .paint-header {
          text-align: center;
          margin-bottom: 22px;
        }

        .paint-header h2 {
          margin: 0 0 8px;
          font-size: 28px;
        }

        .paint-header p {
          color: #666;
          margin: 0;
        }

        .paint-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 260px;
          gap: 22px;
          align-items: start;
        }

        .drawing-card, .palette-card {
          background: #fff;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 3px 14px rgba(0,0,0,.07);
        }

        .drawing-title {
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .drawing-canvas {
          width: 100%;
          max-width: 550px;
          display: block;
          margin: auto;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          touch-action: manipulation;
        }

        .paint-controls {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .paint-controls button {
          padding: 10px 16px;
          border: 0;
          border-radius: 8px;
          background: #2563eb;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .paint-controls button:hover {
          background: #174bb8;
        }

        .paint-controls .reset-btn {
          background: #dc3545;
        }

        .palette-title {
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .color-palette {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 9px;
        }

        .color-button {
          width: 31px;
          height: 31px;
          border-radius: 50%;
          border: 2px solid #ddd;
          cursor: pointer;
          padding: 0;
        }

        .color-button.selected {
          outline: 3px solid #2563eb;
          outline-offset: 2px;
        }

        .selected-color {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          font-size: 14px;
        }

        .selected-color span {
          width: 27px;
          height: 27px;
          border-radius: 50%;
          border: 1px solid #ccc;
        }

        .drawing-counter {
          text-align: center;
          color: #777;
          margin-top: 14px;
          font-size: 14px;
        }

        @media (max-width: 750px) {
          .paint-layout {
            grid-template-columns: 1fr;
          }

          .palette-card {
            order: 2;
          }

          .paint-app {
            padding: 12px;
          }

          .drawing-card, .palette-card {
            padding: 14px;
          }
        }
      `}</style>

      <div className="paint-header">
        <h2>🎨 My Coloring Studio</h2>
        <p>Choose a drawing, select a color and start painting!</p>
      </div>

      <div className="paint-layout">
        <div className="drawing-card">
          <div className="drawing-title">
            {currentDrawing.name}
          </div>

          <svg
            className="drawing-canvas"
            viewBox="0 0 400 380"
            xmlns="http://www.w3.org/2000/svg"
          >
            {currentDrawing.shapes.map(renderShape)}
          </svg>

          <div className="drawing-counter">
            Drawing {drawingIndex + 1} of {drawings.length}
          </div>

          <div className="paint-controls">
            <button onClick={previousDrawing}>
              ← Previous
            </button>

            <button onClick={nextDrawing}>
              Next Drawing →
            </button>

            <button onClick={randomDrawing}>
              🎲 Random Drawing
            </button>

            <button className="reset-btn" onClick={resetDrawing}>
              ↻ Reset Drawing
            </button>
          </div>
        </div>

        <div className="palette-card">
          <div className="palette-title">
            Color Palette
          </div>

          <div className="color-palette">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                aria-label={`Select ${color}`}
                className={`color-button ${
                  selectedColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <div className="selected-color">
            <span style={{ backgroundColor: selectedColor }} />
            <div>
              <strong>Selected Color</strong>
              <div>{selectedColor}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintApp;
