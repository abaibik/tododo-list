from typing import Union
import uuid

from fastapi import FastAPI
from pydantic import BaseModel


class CreateItemRequest(BaseModel):
    text: str


class UpdateItemRequest(CreateItemRequest):
    done: bool


class Item(BaseModel):
    text: str
    done: bool
    id: str


app = FastAPI()

item_store: dict[str, Item] = dict()


@app.post("/items")
def create_item(new_item: CreateItemRequest) -> Item:
    id = str(uuid.uuid4())
    item = Item(id=id, text=new_item.text, done=False)
    item_store[id] = item
    return item


@app.get("/items")
def get_all() -> list[Item]:
    return item_store.values()


@app.patch("/items/{item_id}")
def update_item(item_id: str, new_item: UpdateItemRequest) -> Item:
    item = item_store[item_id]
    item.text = new_item.text
    item.done = new_item.done
    return item


@app.delete("/items/{item_id}")
def delete_item(item_id: str):
    del item_store[item_id]
