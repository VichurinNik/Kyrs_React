import React from 'react';
import type  { StandardButtonProps } from '../types';

const StandardButton: React.FC<StandardButtonProps> = ({
  BGcolor,
  icon,
  title,
  btnType,
  onClick,
  className = ''
}) => {
  const baseClasses = `btn btn-${BGcolor}`;
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <button
      type="button"
      className={combinedClasses}
      onClick={onClick}
      title={title}
    >
      {btnType === 'iconButton' && icon ? (
        <i className={`bi bi-${icon}`}></i>
      ) : (
        title
      )}
    </button>
  );
};

export default StandardButton;