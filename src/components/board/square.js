import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Piece from "components/piece";
import Icon from "components/icon";

const toolList = ["P", "N", "B", "R", "Q", "K", "p", "n", "b", "r", "q", "k"];

const Square = ({ id = "times", white, piece, index, toRight, setSquare }) => {
  const [pie, setPie] = useState(null);
  const [color, setColor] = useState("white");

  const [visibleTool, setVisibleTool] = useState(false);

  useEffect(() => {
    if (piece) {
      const p = piece.toUpperCase();
      const col = p === piece ? "white" : "black";
      setPie(p);
      setColor(col);
    } else {
      setPie(null);
    }
  }, [piece, setPie, setColor]);

  return (
    <div
      className={classnames("board-square", {
        white: white,
        "to-right": toRight,
      })}
    >
      <div
        className="board-square-rect"
        onClick={() => {
          setVisibleTool(!visibleTool);
        }}
      >
        <div className="board-square-img">
          {pie ? <Piece piece={pie} color={color} /> : null}
        </div>
      </div>
      {visibleTool ? (
        <>
          <div className="board-square-tool">
            <div className="board-square-row">
              {toolList.map((p, k) => {
                const pt = p.toUpperCase();
                const colPt = pt === p ? "white" : "black";

                return (
                  <div
                    className="board-square-row-btn"
                    key={k}
                    onClick={() => {
                      setVisibleTool(false);
                      if (setSquare) setSquare(p, index);
                    }}
                  >
                    <div className="board-square-row-btn-content">
                      <Piece piece={pt} color={colPt} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="board-square-clear"
              onClick={() => {
                setVisibleTool(false);
                if (setSquare) setSquare(null, index);
              }}
            >
              <Icon />
              Clear
            </div>
          </div>
          <div className="board-square-tool-arrow" />
        </>
      ) : null}
    </div>
  );
};

export default Square;
