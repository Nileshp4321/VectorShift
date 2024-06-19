import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import BaseNode from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const detectedVariables = currText.match(/{{\s*\w+\s*}}/g) || [];
    setVariables(detectedVariables.map(v => v.slice(2, -2).trim()));
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      title="Text"
      style={{ width: 200, height: 120 }}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
        ...variables.map((variable, index) => ({
          type: 'target',
          position: Position.Left,
          id: `${id}-${variable}`,
          style: { top: `${index * 20 + 40}px` }
        }))
      ]}
    >
      <div>
        <label>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange} 
          />
        </label>
      </div>
    </BaseNode>
  );
};

