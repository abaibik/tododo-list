from typing import Union
import uuid

from fastapi import FastAPI, APIRouter
from pydantic import BaseModel

from fastapi.staticfiles import StaticFiles

from pathlib import Path

import uvicorn


class CreateItemRequest(BaseModel):
    text: str


class UpdateItemRequest(BaseModel):
    text: str | None
    done: bool | None


class Item(BaseModel):
    text: str
    done: bool
    id: str


app = FastAPI()

frontend_files = Path(__file__).parent.parent / "build"


item_store: dict[str, Item] = {
    "1": Item(text="Buy some food", done=False, id="1"),
    "2": Item(text="Feed cats", done=False, id="2"),
}

router = APIRouter()


@router.post("/items", status_code=201)
def create_item(new_item: CreateItemRequest) -> Item:
    id = str(uuid.uuid4())
    item = Item(id=id, text=new_item.text, done=False)
    item_store[id] = item
    return item


@router.get("/items")
def get_all() -> list[Item]:
    return list(item_store.values())


@router.patch("/items/{item_id}")
def update_item(item_id: str, new_item: UpdateItemRequest) -> Item:
    item = item_store[item_id]
    if new_item.text:
        item.text = new_item.text
    if new_item.done is not None:
        item.done = new_item.done
    return item


@router.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: str):
    if item_id in item_store:
        del item_store[item_id]


api_app = FastAPI(title="API")
api_app.include_router(router)
app.mount("/api", api_app)
app.mount("/", StaticFiles(directory=frontend_files, html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
