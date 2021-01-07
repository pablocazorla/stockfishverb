import React from "react";
import classnames from "classnames";
import Icon from "components/icon";

const View = ({ children, footer, visible, base, onClose }) => {
  return (
    <div className={classnames("view", { visible, base })}>
      {onClose ? (
        <div className="view-close-btn" title="Close" onClick={onClose}>
          <Icon />
        </div>
      ) : null}
      <div className="view-content">{children}</div>
      {footer ? (
        <div className="view-footer">
          {footer.map((button, k) => {
            const { text, action, color, size, title } = button;
            return (
              <div
                className={classnames("view-footer_col", size || "")}
                key={k}
                title={title}
              >
                <div
                  className={classnames("btn", color || "primary")}
                  onClick={() => {
                    if (action) action();
                  }}
                >
                  {text}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default View;
