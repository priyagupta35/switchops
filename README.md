# TechPulse Triage Room

Two AI agents and a human find, reproduce and fix a real bug in a real Java project, through Switch.

**Hackathon:** WeMakeDevs × DevTools Academy × Switch, "Flip the Switch" · **Track:** Best Business Workflow (also Best Blog, Code with Wispr)
**Demo video:** <YOUTUBE LINK>
**Fix branch in TechPulse:** https://github.com/priyagupta35/techpulse/tree/fix-url-dedup

## The problem
Bug reports are vague, and someone has to read the code, guess the cause and write a reproduction before a fix can start. This room does the triage and reproduction in chat and keeps a person in charge of what changes.

## How it works
1. A person posts a bug report in `triage-room` (Mattermost, bundled with Switch).
2. `@triager` reads the real code, restates the report, classifies it and hands bugs to `@repro`.
3. `@repro` builds the smallest case, runs it against the real code and posts the exact output.
4. A person approves the fix and sets its scope.
5. The fix and tests are made on a branch, and the person reviews the diff.

## Real example (TechPulse)
- **Bug:** duplicate articles despite de-duplication by URL.
- **Finding:** the duplicate check compared the raw URL, so `…/java-21` and `…/java-21/` were both saved.
- **Reproduction:** two items, same title, URLs differing by a trailing slash → `Saved: 2, Skipped: 0`.
- **Approved fix:** normalize the URL (trailing slash, host case, #fragment, utm_* params) before the check, keep other params like `?id=5`, no database index.
- **Result:** 5 JUnit tests pass (`Tests run: 5, Failures: 0, Errors: 0`).
- Commits on branch `fix-url-dedup`: `f8d86f0` (fix), `cb1ac79` (tests).

## How Switch is used
- Switch Console with a local server in Docker on Windows
- Agents: `triager` and `repro` (instructions in `/agents`), provider OpenCode, model `opencode/deepseek-v4.1-flash-free`
- Room: `triage-room` in Mattermost, with the instructions in `room-instructions.md`
- Both agents' working directory is a local clone of TechPulse
- The agents are generic, so the same setup could be pointed at another repository

## Run it yourself
1. Install Docker Desktop, Switch Console and OpenCode.
2. Create the two agents from `/agents` with the OpenCode provider and the model above.
3. Create a Mattermost room, add both agents, and paste `room-instructions.md`.
4. Clone TechPulse and set both agents' directory to it.
5. Post a bug report and follow the thread.
6. To check the fix: `git checkout fix-url-dedup`, then `.\mvnw.cmd test`.

## Limitations and lessons
- Free models are slower and rate-limited.
- Console on Windows is early access and shows a provider warning even though OpenCode works.
- The repro agent committed and pushed to the branch on its own, so every diff must be reviewed.
- Existing duplicate rows in a database would still need a one-off cleanup.
- Git history of this repo contains an earlier, unrelated simulated prototype that is not part of this submission.

