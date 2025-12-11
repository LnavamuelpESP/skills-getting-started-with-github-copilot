import pytest
from fastapi.testclient import TestClient
from urllib.parse import quote

from src import app as app_module


@pytest.fixture
def client():
    return TestClient(app_module.app)


def test_get_activities(client):
    resp = client.get("/activities")
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, dict)
    # Expect some known activity from the seed data
    assert "Chess Club" in data


def test_signup_and_duplicate_and_refresh(client):
    activity = "Basketball Team"
    email = "tester@example.com"

    # Ensure email is not already present (if previous runs left state, try to remove first)
    client.delete(f"/activities/{activity}/unregister", params={"email": email})

    # Sign up
    resp = client.post(f"/activities/{activity}/signup", params={"email": email})
    assert resp.status_code == 200
    assert "Signed up" in resp.json().get("message", "")

    # GET activities and verify participant present
    resp = client.get("/activities")
    participants = resp.json()[activity]["participants"]
    assert email in participants

    # Duplicate signup should fail with 400
    resp = client.post(f"/activities/{activity}/signup", params={"email": email})
    assert resp.status_code == 400


def test_unregister_and_errors(client):
    activity = "Basketball Team"
    email = "tester-unregister@example.com"

    # Ensure email exists then remove it
    client.post(f"/activities/{quote(activity)}/signup", params={"email": email})
    resp = client.delete(f"/activities/{quote(activity)}/unregister", params={"email": email})
    assert resp.status_code == 200
    assert "Removed" in resp.json().get("message", "")

    # Unregister a non-existent participant => 404
    resp = client.delete(f"/activities/{quote(activity)}/unregister", params={"email": "noone@invalid.test"})
    assert resp.status_code == 404

    # Signup to a nonexistent activity => 404
    resp = client.post(f"/activities/{quote('NoSuchActivity')}/signup", params={"email": "a@b.com"})
    assert resp.status_code == 404
