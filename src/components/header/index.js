import React from "react";
import classnames from "classnames";
import Icon from "components/icon";

const Header = ({ visible, menu = [] }) => {
  return (
    <div className={classnames("header", { visible })}>
      <div className="header-row">
        <div className="title">Stockfish Verbose</div>
        <div className="menu">
          {menu.map((m, k) => {
            const { text, icon, action, transparent } = m;
            return (
              <div
                className={classnames("menu-btn", { transparent })}
                key={k}
                onClick={action}
              >
                {icon ? <Icon id={icon} /> : null}
                {text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
