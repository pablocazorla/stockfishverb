import React, { useState, useEffect, useCallback } from "react";
import Square from "./square";
import Icon from "components/icon";
//const FenEjemplo = "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R";

const fenToGrid = (fenOrig) => {
  const list = [];
  const fenArray = (() => {
    const index = fenOrig.indexOf(" ");
    const part1 = fenOrig.substr(0, index);
    const part2 = fenOrig.substr(index + 1);
    return [part1, part2];
  })();
  const fen = fenArray[0];
  let index = 0;
  //

  for (let i = 0; i < fen.length; i++) {
    const letter = fen.substr(i, 1);

    if (letter !== "/") {
      const num = parseInt(letter, 10);
      if (isNaN(num)) {
        list.push({
          piece: letter,
          index: index++,
        });
      } else {
        for (let j = 0; j < num; j++) {
          list.push({
            piece: null,
            index: index++,
          });
        }
      }
    }
  }
  //
  const restFen = fenArray[1];
  let fen_move = "white";
  let fen_castling_white = true;
  let fen_castling_black = true;
  //
  if (restFen.indexOf("b") === 0) {
    fen_move = "black";
  }
  if (restFen.indexOf("KQ") < 0) {
    fen_castling_white = false;
  }
  if (restFen.indexOf("kq") < 0) {
    fen_castling_black = false;
  }

  return {
    list,
    fen_move,
    fen_castling_white,
    fen_castling_black,
  };
};

const Board = ({
  humanColor = "white",
  fen = "8/8/8/8/8/8/8/8 w KQkq - 0 1",
  onCancel,
  setBoard,
  visible,
}) => {
  const [grid, setGrid] = useState([]);
  const [showButtons, setShowButtons] = useState(false);

  const [fen_move, set_fen_move] = useState("white");
  const [fen_castling_white, set_fen_castling_white] = useState(true);
  const [fen_castling_black, set_fen_castling_black] = useState(true);

  const createGridFromFEN = useCallback(
    (fenPosition) => {
      const fenConverted = fenToGrid(fenPosition);
      const gr = fenConverted.list;

      set_fen_move(fenConverted.fen_move);
      set_fen_castling_white(fenConverted.fen_castling_white);
      set_fen_castling_black(fenConverted.fen_castling_black);

      if (humanColor === "black") {
        setGrid(gr.reverse());
      } else {
        setGrid(gr);
      }
    },
    [
      setGrid,
      humanColor,
      set_fen_move,
      set_fen_castling_white,
      set_fen_castling_black,
    ]
  );
  const updateGrid = useCallback(
    (piece, index) => {
      const gridCopy = grid.filter(() => true);
      gridCopy.forEach((s) => {
        if (s.index === index) {
          s.piece = piece;
        }
      });
      setShowButtons(true);
      setGrid(gridCopy);
    },
    [setGrid, grid, setShowButtons]
  );

  const getFenFromGrid = useCallback(() => {
    const gridCopy =
      humanColor === "black"
        ? grid.filter(() => true).reverse()
        : grid.filter(() => true);

    let txt = "";
    let emptySquares = 0;

    gridCopy.forEach((sq, i) => {
      if (i !== 0 && i % 8 === 0) {
        if (emptySquares > 0) {
          txt += emptySquares;
          emptySquares = 0;
        }
        txt += "/";
      }
      if (sq.piece) {
        if (emptySquares > 0) {
          txt += emptySquares;
          emptySquares = 0;
        }
        txt += sq.piece;
      } else {
        emptySquares++;
      }
    });
    if (emptySquares > 0) {
      txt += emptySquares;
    }

    txt += fen_move === "white" ? " w " : " b ";

    txt += fen_castling_white ? "KQ" : "";
    txt += fen_castling_black ? "kq" : "";

    txt += !fen_castling_white && !fen_castling_black ? "-" : "";

    txt += " - 0 1";

    return txt;
  }, [grid, humanColor, fen_move, fen_castling_white, fen_castling_black]);

  useEffect(() => {
    if (visible && fen) {
      createGridFromFEN(fen);
      setShowButtons(false);
    }
  }, [fen, createGridFromFEN, visible]);

  return (
    <div className="board-container">
      <div className="board-top-options">
        <div
          className="board-top-option"
          onClick={() => {
            setShowButtons(true);
            set_fen_move(fen_move === "white" ? "black" : "white");
          }}
        >{`Move ${fen_move}`}</div>
        <div
          className="board-top-option"
          onClick={() => {
            setShowButtons(true);
            set_fen_castling_white(!fen_castling_white);
          }}
        >
          <Icon id={fen_castling_white ? "check-square-o" : "square-o"} />{" "}
          Castling white
        </div>
        <div
          className="board-top-option"
          onClick={() => {
            setShowButtons(true);
            set_fen_castling_black(!fen_castling_black);
          }}
        >
          <Icon id={fen_castling_black ? "check-square-o" : "square-o"} />{" "}
          Castling black
        </div>
      </div>
      <div className="board-grid">
        {grid.map((q, k) => {
          const { piece, index } = q;
          const squareColor = (k % 16 > 7 ? 1 : -1) * (k % 2 ? 1 : -1);
          const toRight = k % 8 > 3 ? true : false;
          return (
            <Square
              key={k}
              white={squareColor > 0}
              piece={piece}
              toRight={toRight}
              index={index}
              setSquare={updateGrid}
            />
          );
        })}
      </div>
      <div className="board-buttons">
        <div
          className="board-button"
          onClick={() => {
            setShowButtons(true);
            createGridFromFEN(
              "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            );
          }}
        >
          Start Position
        </div>
        <div
          className="board-button"
          onClick={() => {
            setShowButtons(true);
            createGridFromFEN("8/8/8/8/8/8/8/8 w - - 0 1");
          }}
        >
          Clear all
        </div>
      </div>
      <div className="board-footer">
        {showButtons ? (
          <div className="board-footer-row">
            <div
              className="btn cancel rounded"
              onClick={() => {
                if (onCancel) onCancel();
              }}
            >
              Cancel
            </div>
            <div
              className="btn primary rounded"
              onClick={() => {
                if (setBoard) {
                  const fenResult = getFenFromGrid();
                  setBoard(fenResult, fen_move);
                }
              }}
            >
              Set board
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Board;
