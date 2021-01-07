import React, { useState, useEffect } from "react";
import View from "components/view";
import Icon from "components/icon";
import Piece from "components/piece";

const pieceList = ["P", "N", "B", "R", "Q", "K"];

const Human = ({ visible, possibleMoves, humanColor, onSelectMovement }) => {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [movements, setMovements] = useState({
    P: [],
    N: [],
    B: [],
    R: [],
    Q: [],
    K: [],
  });

  useEffect(() => {
    setSelectedPiece(null);
  }, [visible]);

  useEffect(() => {
    const movs = {};
    movs.P = possibleMoves.filter((m) => {
      const firstLetter = m.substring(0, 1);
      return firstLetter === firstLetter.toLowerCase();
    });
    ["N", "B", "R", "Q", "K"].forEach((p) => {
      movs[p] = possibleMoves.filter((m) => {
        return m.indexOf(p) === 0;
      });
    });
    if (possibleMoves.indexOf("O-O") >= 0) {
      movs.K.push("O-O");
    }
    if (possibleMoves.indexOf("O-O-O") >= 0) {
      movs.K.push("O-O-O");
    }
    setMovements(movs);
  }, [possibleMoves]);

  return (
    <View
      visible={visible}
      // footer={[
      //   {
      //     text: "Start Game",
      //     action: () => {
      //       if (actionStartNewGame) actionStartNewGame({ humanColor, depth });
      //     },
      //   },
      // ]}
    >
      {!selectedPiece ? (
        <div className="view__human">
          <div className="view-title">Select Piece</div>
          <div className="human-piece-selector">
            {pieceList.map((p) => {
              if (movements[p].length === 0) {
                return null;
              }

              return (
                <div
                  className="human-piece-item"
                  onClick={() => {
                    setSelectedPiece(p);
                  }}
                  key={p}
                >
                  <Piece piece={p} color={humanColor} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="view__human">
          <div className="movement-piece">
            <Piece piece={selectedPiece} color={humanColor} />
            <div
              className="movement-piece-another"
              onClick={() => {
                setSelectedPiece(null);
              }}
            >
              <Icon id="chevron-left" /> Select another piece
            </div>
          </div>

          <div className="view-title">Select Movement</div>
          <div className="movement-selector">
            {movements[selectedPiece].map((mov) => {
              return (
                <div
                  className="movement-selector-item"
                  key={mov}
                  onClick={() => {
                    if (onSelectMovement) onSelectMovement(mov);
                  }}
                >
                  {mov}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </View>
  );
};

export default Human;
