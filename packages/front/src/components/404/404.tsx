import { memo } from 'react';

function PageNotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}

const MemoizedPageNotFound = memo(PageNotFound);

export { MemoizedPageNotFound as PageNotFound };
