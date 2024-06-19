// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
      submitPipeline: async () => {
        const pipeline = {
            nodes: get().nodes,
            edges: get().edges.map(edge => ({ source: edge.source, target: edge.target }))
        };
    
        try {
            // Construct query parameters based on pipeline data
            const nodesQueryParam = encodeURIComponent(JSON.stringify(pipeline.nodes));
            const edgesQueryParam = encodeURIComponent(JSON.stringify(pipeline.edges));
    
            const response = await fetch(`/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pipeline)
            });
    
            // Inspect the response before parsing
            const responseText = await response.text();
            console.log(responseText);
            try {
                const result = JSON.parse(responseText);
                alert(`Number of Nodes: ${result.num_nodes}\nNumber of Edges: ${result.num_edges}\nIs DAG: ${result.is_dag}`);
            } catch (jsonError) {
                console.error('Failed to parse JSON:', responseText);
                alert('Failed to parse pipeline. The server response was not valid JSON.');
            }
        } catch (error) {
            console.error('Network or server error:', error);
            alert('Failed to parse pipeline. Please check the network or server.');
        }
    },

    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));
