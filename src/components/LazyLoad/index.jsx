import React, { Suspense } from 'react';
import { Spin } from 'antd';

const LazyLoad = ({ children }) => {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <Spin size="large" />
      </div>
    }>
      {children}
    </Suspense>
  );
};

export default LazyLoad;