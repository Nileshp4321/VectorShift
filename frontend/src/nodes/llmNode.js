import { Position } from 'reactflow';
import BaseNode from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      style={{ width: 200, height: 80 }}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
        { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
        { type: 'source', position: Position.Right, id: `${id}-response` }
      ]}
    >
      <div>
        <span>This is an LLM.</span>
      </div>
    </BaseNode>
  );
};

