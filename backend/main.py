from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

class Node(BaseModel):
    id: str
    type: str
    data: dict

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

app = FastAPI()

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: Pipeline):
    try:
        # Log the received pipeline data
        print('Received pipeline:', pipeline.dict())  # Convert to dict for logging
        # Your processing logic here
        return {'status': 'parsed', 'num_nodes': len(pipeline.nodes), 'num_edges': len(pipeline.edges), 'is_dag': True}
    except Exception as e:
        print('Error processing pipeline:', e)  # Log any errors that occur during processing
        raise HTTPException(status_code=500, detail='Internal Server Error')
