import React, { useState, useCallback } from "react";
import Chess from "chess.js";
import Header from "components/header";

import Presentation from "./presentation";
import Board from "./board";
import NewGame from "./newgame";
import Human from "./human";
import AI from "./ai";
import EndView from "./end";
import About from "./about";

import ScoreBar from "components/score";

const CHESS_CONTROLLER = new Chess();

const Game = () => {
  const [currentView, setCurrentView] = useState("presentation");
  const [oldCurrentView, setOldCurrentView] = useState("presentation");
  //
  const [humanColor, setHumanColor] = useState("white");
  const [score, setScore] = useState(0);
  const [depth, setDepth] = useState("15");
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [FEN, setFEN] = useState(CHESS_CONTROLLER.fen());
  const [endType, setEndType] = useState("draw");

  //console.log(CHESS_CONTROLLER.ascii());

  const changeCurrentView = useCallback(
    (newView) => {
      setOldCurrentView(currentView);
      setCurrentView(newView);
    },
    [currentView, setCurrentView, setOldCurrentView]
  );

  const goHumanMovement = useCallback(() => {
    setPossibleMoves(CHESS_CONTROLLER.moves());
    changeCurrentView("human");
  }, [setPossibleMoves, changeCurrentView]);

  const goAImovement = useCallback(() => {
    changeCurrentView("ai");
  }, [changeCurrentView]);

  const Move = useCallback((movement) => {
    return CHESS_CONTROLLER.move(movement);
  }, []);
  const processMovement = useCallback(
    (humanMovement) => {
      const fen = CHESS_CONTROLLER.fen();
      setFEN(fen);

      // Evaluate condition
      let end = CHESS_CONTROLLER.game_over();

      //Evaluate
      if (end) {
        if (CHESS_CONTROLLER.in_checkmate()) {
          end = "mate";
        } else {
          end = "draw";
        }
        setEndType(end);
        changeCurrentView("end");
      }

      if (!end) {
        if (humanMovement) {
          // Go AI movement
          goAImovement();
        } else {
          // Go human movement
          goHumanMovement();
        }
      }
    },
    [setFEN, setEndType, changeCurrentView, goAImovement, goHumanMovement]
  );
  const Undo = useCallback(() => {
    CHESS_CONTROLLER.undo();
    CHESS_CONTROLLER.undo();
    goHumanMovement();
  }, [goHumanMovement]);

  return (
    <div className="main">
      <Header
        visible={currentView === "human"}
        menu={[
          {
            text: "About",
            transparent: true,
            action: () => {
              changeCurrentView("about");
            },
          },
          {
            text: "New Game",
            icon: "file-o",
            action: () => {
              changeCurrentView("new_game");
            },
          },
          {
            text: "Board",
            icon: "delicious",
            action: () => {
              changeCurrentView("board");
            },
          },
        ]}
      />
      <Presentation
        visible={currentView === "presentation"}
        actionNewGame={() => {
          changeCurrentView("new_game");
        }}
      />
      <About
        visible={currentView === "about"}
        onCancel={() => {
          changeCurrentView(oldCurrentView);
        }}
      />
      <Board
        visible={currentView === "board"}
        fen={FEN}
        humanColor={humanColor}
        onCancel={() => {
          changeCurrentView(oldCurrentView);
        }}
        setBoard={(fenResult, whoMoves) => {
          CHESS_CONTROLLER.load(fenResult);
          const humanMovement = whoMoves !== humanColor;
          // console.log(humanMovement);
          processMovement(humanMovement);
        }}
      />
      <NewGame
        visible={currentView === "new_game"}
        actionStartNewGame={(cfg) => {
          // Init game
          setHumanColor(cfg.humanColor);
          setDepth(cfg.depth);
          setEndType(false);
          CHESS_CONTROLLER.reset();
          if (cfg.humanColor === "white") {
            goHumanMovement();
          } else {
            goAImovement();
          }
        }}
        onCancel={() => {
          changeCurrentView(oldCurrentView);
        }}
      />
      <Human
        visible={currentView === "human"}
        humanColor={humanColor}
        possibleMoves={possibleMoves}
        onSelectMovement={(movement) => {
          Move(movement);
          processMovement(true);
        }}
      />
      <AI
        visible={currentView === "ai"}
        depth={depth}
        fen={FEN}
        move={Move}
        processMovement={processMovement}
        aiColor={humanColor === "white" ? "black" : "white"}
        undo={Undo}
        onScore={setScore}
      />
      <EndView
        visible={currentView === "end"}
        endType={endType}
        newGame={() => {
          changeCurrentView("new_game");
        }}
      />
      {currentView === "human" || currentView === "ai" ? (
        <ScoreBar value={score} />
      ) : null}
    </div>
  );
};

export default Game;
