import { memo } from 'react';

function Header() {
  return (
    <header className="header">
      <span>logo</span>
    </header>
  );
}

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
