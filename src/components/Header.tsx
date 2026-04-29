import React from 'react';

const Header: React.FC = () => (
  <header className="header">
    <div className="header-logo">
      <span>PERMODA</span>
    </div>
    <div className="header-actions">
      <span className="header-action-text">Validar código</span>
      <button className="header-help" title="Ayuda">?</button>
    </div>
  </header>
);

export default Header;
