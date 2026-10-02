"""
Evidence images — read helpers (additive).

Thin, read-only accessors over :class:`backend.models.EvidenceImage`. The write
path (an officer attaching evidence during an investigation) lives in
``case_service`` alongside the other case mutations, so the capability check, the
scope guard and the audit event all sit next to the rest of the case workflow.

Attaching evidence never rescales a risk score and completing nothing here marks
a verification step done — these functions only fetch what has been recorded.
"""

from __future__ import annotations

from typing import Any

from sqlalchemy import func
from sqlalchemy.orm import Session

from ..models import EvidenceImage


def _ordered(query):
    return query.order_by(EvidenceImage.created_at.asc(), EvidenceImage.id.asc())


def list_for_project(db: Session, project_id: str) -> list[dict[str, Any]]:
    """Every evidence image recorded against a work, oldest first."""
    rows = _ordered(
        db.query(EvidenceImage).filter(EvidenceImage.project_id == project_id)
    ).all()
    return [r.as_dict() for r in rows]


def list_for_case(db: Session, case_id: str) -> list[dict[str, Any]]:
    """Every evidence image attached to a case, oldest first."""
    rows = _ordered(
        db.query(EvidenceImage).filter(EvidenceImage.case_id == case_id)
    ).all()
    return [r.as_dict() for r in rows]


def counts_by_project(db: Session) -> dict[str, int]:
    """How many evidence images each work has — one query for the whole queue."""
    rows = (
        db.query(EvidenceImage.project_id, func.count(EvidenceImage.id))
        .group_by(EvidenceImage.project_id)
        .all()
    )
    return {project_id: count for project_id, count in rows if project_id}
