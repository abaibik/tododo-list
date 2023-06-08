import pytest
from fastapi.testclient import TestClient
from .main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_get_all_items(client):
    response = client.get("/items")

    assert response.status_code == 200
    assert response.json() == []


@pytest.fixture
def item(client):
    response = client.post("/items", json={"text": "Make an appointment"})

    assert response.status_code == 201
    return response.json()


def test_create_item(item):
    assert item["text"] == "Make an appointment"
    assert item["done"] == False
    assert item["id"] != ""


def test_mark_item_done(client, item):
    item_id = item["id"]
    response = client.patch(f"/items/{item_id}", json={"done": True})

    assert response.status_code == 200
    response_data = response.json()
    assert response_data["text"] == item["text"]
    assert response_data["done"] == True
    assert response_data["id"] == item_id


def test_update_item_text(client, item):
    item_id = item["id"]
    response = client.patch(f"/items/{item_id}", json={"text": "Water flowers"})

    assert response.status_code == 200
    response_data = response.json()
    assert response_data["text"] == "Water flowers"
    assert response_data["done"] == item["done"]
    assert response_data["id"] == item_id


def test_delete_item(client, item):
    item_id = item["id"]
    response = client.delete(f"/items/{item_id}")

    assert response.status_code == 204
    response = client.get("/items")
    assert response.status_code == 200
    item_ids = [it["id"] for it in response.json()]
    assert item_id not in item_ids

    response = client.delete(f"/items/{item_id}")
    assert response.status_code == 204
