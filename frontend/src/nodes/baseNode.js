import React from 'react';
import { Handle } from 'reactflow';

const BaseNode = ({ title, handles, children, style }) => (
  <div style={{ border: '1px solid black', padding: '10px', ...style }}>
    <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>{title}</div>
    <div>{children}</div>
    {handles.map((handle, index) => (
      <Handle key={index} {...handle} />
    ))}
  </div>
);

export default BaseNode;
