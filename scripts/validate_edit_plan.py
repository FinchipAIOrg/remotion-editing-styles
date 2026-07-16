#!/usr/bin/env python3
"""Validate the minimum contract of a Remotion editing plan."""

import json
import sys
from pathlib import Path


ALLOWED_PURPOSES = {"hook", "context", "proof", "turn", "cta"}
ALLOWED_MODES = {"a-roll", "b-roll", "graphic", "split"}


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def require(mapping: dict, key: str, context: str):
    if key not in mapping:
        fail(f"{context} is missing '{key}'")
    return mapping[key]


def main() -> None:
    if len(sys.argv) != 2:
        fail("usage: validate_edit_plan.py path/to/edit-plan.json")

    path = Path(sys.argv[1])
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        fail(f"file not found: {path}")
    except json.JSONDecodeError as exc:
        fail(f"invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}")

    project = require(data, "project", "root")
    creative = require(data, "creative", "root")
    source = require(data, "source", "root")
    beats = require(data, "beats", "root")
    require(data, "captions", "root")
    require(data, "audio", "root")
    require(data, "validation", "root")

    fps = require(project, "fps", "project")
    duration = require(project, "durationSeconds", "project")
    width = require(project, "width", "project")
    height = require(project, "height", "project")
    if not isinstance(fps, (int, float)) or fps <= 0:
        fail("project.fps must be positive")
    if not isinstance(duration, (int, float)) or duration <= 0:
        fail("project.durationSeconds must be positive")
    if not all(isinstance(value, int) and value > 0 for value in (width, height)):
        fail("project.width and project.height must be positive integers")

    require(creative, "dominantStyle", "creative")
    require(creative, "message", "creative")
    require(source, "transcriptStatus", "source")

    if not isinstance(beats, list) or not beats:
        fail("beats must be a non-empty array")

    previous_end = 0.0
    seen_ids = set()
    for index, beat in enumerate(beats):
        context = f"beats[{index}]"
        beat_id = require(beat, "id", context)
        start = require(beat, "startSeconds", context)
        end = require(beat, "endSeconds", context)
        purpose = require(beat, "purpose", context)
        mode = require(beat, "visualMode", context)

        if beat_id in seen_ids:
            fail(f"duplicate beat id: {beat_id}")
        seen_ids.add(beat_id)
        if purpose not in ALLOWED_PURPOSES:
            fail(f"{context}.purpose must be one of {sorted(ALLOWED_PURPOSES)}")
        if mode not in ALLOWED_MODES:
            fail(f"{context}.visualMode must be one of {sorted(ALLOWED_MODES)}")
        if not all(isinstance(value, (int, float)) for value in (start, end)):
            fail(f"{context} start/end must be numbers")
        if start < previous_end:
            fail(f"{context} overlaps the previous beat")
        if end <= start:
            fail(f"{context}.endSeconds must be greater than startSeconds")
        if end > duration:
            fail(f"{context} exceeds project.durationSeconds")
        previous_end = end

    if abs(previous_end - duration) > 1 / fps:
        fail("final beat must end at project.durationSeconds within one frame")

    print(
        "VALID: "
        f"{len(beats)} beats, {duration:g}s, {width}x{height}, {fps:g}fps, "
        f"style={creative['dominantStyle']}"
    )


if __name__ == "__main__":
    main()
