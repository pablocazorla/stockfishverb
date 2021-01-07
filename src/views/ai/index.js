import React, { useState, useEffect } from "react";
import View from "components/view";
import Icon from "components/icon";
import Piece from "components/piece";
import classnames from "classnames";

const stockfish = new Worker("/js/stockfish6.js");

const AI = ({
  visible,
  depth,
  fen,
  move,
  processMovement,
  aiColor,
  undo,
  onScore,
}) => {
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [viewForce, setViewForce] = useState(true);

  useEffect(() => {
    setSelectedMovement(null);
    if (visible) {
      if (fen) {
        stockfish.postMessage(`position fen ${fen}`);
      } else {
        stockfish.postMessage("position startpos");
      }
      stockfish.postMessage(`go depth ${depth}`);
    }
  }, [visible, depth, fen]);

  useEffect(() => {
    stockfish.onmessage = function (event) {
      //NOTE: Web Workers wrap the response in an object.
      // if (event.data) console.log(event.data);
      if (event.data && event.data.indexOf("bestmove") >= 0) {
        const arr = event.data.split(" ");
        if (arr[1].indexOf("none") < 0) {
          const from = arr[1].substring(0, 2);
          const to = arr[1].substring(2, 4);

          const movement = move({ from, to });
          if (movement && movement.san) {
            setSelectedMovement(movement);
          }
        } else {
          //no movement
        }
      }
      if (event.data && event.data.indexOf("score cp ") >= 0) {
        const arrScore = event.data.split("score cp ")[1];
        const score = arrScore.split(" ")[0];
        const scoreNum = parseInt(score, 10) * (aiColor === "white" ? 1 : -1);
        onScore(scoreNum);
      }
    };
  }, [move, setSelectedMovement, aiColor, onScore]);

  useEffect(() => {
    if (!selectedMovement) {
      setViewForce(true);
    }
  }, [selectedMovement, setViewForce]);

  return (
    <View
      visible={visible}
      footer={
        selectedMovement
          ? [
              {
                text: <Icon id="undo" />,
                color: "orange",
                size: "sm",
                title: "Undo",
                action: () => {
                  undo();
                },
              },
              {
                text: "Ok",
                action: () => {
                  processMovement(false);
                },
              },
            ]
          : null
      }
    >
      {!selectedMovement ? (
        <div className="view__ai">
          <div className="view-title orange">Thinking...</div>
          <div className="icon__ai">
            <Icon id="cog" className="fa-spin icon__ai-1" />
            <Icon id="cog" className="fa-spin icon__ai-2" />
          </div>
          <div
            className={classnames("btn-force-move", { disabled: !viewForce })}
            onClick={() => {
              if (viewForce) {
                setViewForce(false);
                stockfish.postMessage("stop");
              }
            }}
          >
            Force move
          </div>
        </div>
      ) : (
        <div className="view__ai">
          <div className="view-title">Move</div>
          <div className="ai-selectedMovement">
            <Piece
              color={aiColor}
              piece={selectedMovement.piece.toUpperCase()}
            />
            <div className="ai-selectedMovement_move">
              {selectedMovement.san}
            </div>
          </div>
        </div>
      )}
    </View>
  );
};

export default AI;
