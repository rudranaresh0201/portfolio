import { motion } from 'framer-motion';
import BlogLayout from '../components/blog/BlogLayout';
import SequenceDiagram from '../components/blog/SequenceDiagram';
import CodeBlock from '../components/blog/CodeBlock';
import ComparisonTable from '../components/blog/ComparisonTable';

const BASE = import.meta.env.BASE_URL;

function Shot({ src, alt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="my-4 rounded-xl overflow-hidden"
      style={{ border: '1px solid rgba(24,20,15,0.1)', boxShadow: '0 12px 30px rgba(24,20,15,0.1)' }}
    >
      <img src={src} alt={alt} className="w-full block" />
      <p className="px-3 py-2 text-[11px] text-ink-500 font-mono" style={{ background: 'rgba(24,20,15,0.03)' }}>{alt}</p>
    </motion.div>
  );
}

export default function BlogVerimcp() {
  return (
    <BlogLayout
      title={<>Don't Trust the Tool Call: Building a <span className="gradient-text">Verifier for MCP</span></>}
      date="2026-08-15"
      tags={['mcp', 'agentic-ai', 'verification', 'python']}
    >
      <h2>How I found MCP</h2>
      <p>
        I was building agentic systems with LangGraph — wiring up graphs of LLM calls, tools, and state, the usual
        agent-framework plumbing. Somewhere in that work I ran into MCP: a standard way for something like Claude, or a
        CLI, to actually go and do stuff in another application, instead of just talking about doing it. The framing that
        stuck with me was "a smart API" — not quite right, but close enough to make me stop and actually read the spec
        instead of skimming past another acronym.
      </p>

      <h2>What MCP actually is</h2>
      <p>
        The first time I looked at MCP, the pitch sounded simple: it's a protocol that lets an AI application call
        tools. Simple, until you actually trace a request through it, and there are more moving parts than "AI calls
        tool."
      </p>
      <p>
        There are three roles, not two. The <strong>Host</strong> is the actual application — Claude Code, an IDE,
        whatever app the user is sitting in front of. The Host owns the LLM. Inside the Host lives a{' '}
        <strong>Client</strong>, and the Client's whole job is managing one connection to one <strong>Server</strong> —
        in my case, a small server I built called devmcp.
      </p>
      <p>
        The conversation looks like this: the user asks the Host something. The Host's LLM decides it needs a tool, so
        the Client sends a <code>tools/call</code> request to the Server, written in a message format called JSON-RPC —
        think of it as a plain, structured way of saying "call this function, here are the arguments, and here's an ID
        so you know which reply belongs to which request." The Server does the work and sends back a response tagged
        with that same ID.
      </p>
      <p>
        That ID-matching detail sounds like plumbing, not something worth mentioning — until it's the exact thing that
        breaks. It happened to me. MCP Inspector, the official test client, sent verimcp a <code>resources/list</code>{' '}
        request with id <code>1</code>. Completely unrelated to that, devmcp — running behind verimcp — had{' '}
        <em>also</em> just used id <code>1</code>, for its own request back to the Host (asking which folder it's
        allowed to touch). Two separate counters, on two separate sides of the connection, both innocently starting
        from 1, colliding by pure coincidence. verimcp was matching replies to requests by id alone, so for one message
        it mistook devmcp's own outgoing request for the reply Inspector was actually waiting for, and handed back a
        synthesized, mostly-empty answer instead of the real one.
      </p>
      <p>
        My own test suite, 100+ tests at that point, never once caught this — because every test I'd written happened
        to answer things in an order that closed the exact timing window where the collision could occur. I wasn't
        being sloppy; I just couldn't see the gap from inside my own assumptions. Inspector, a real client written by
        people who'd never seen my code, did something perfectly ordinary and walked straight into it. That's the whole
        reason "tested against real, independent clients" ended up mattering more to this project than any number of
        tests I wrote myself.
      </p>
      <p>
        The direction isn't always Host-to-Server, either. A Server can turn around and call the Host back — two
        specific cases: <strong>sampling</strong>, where the Server asks the Host's own LLM to generate something on
        its behalf, and <strong>elicitation</strong>, where the Server asks the Host to go get a real human's
        confirmation before doing something. Both are just more JSON-RPC messages, flowing the opposite direction over
        the same connection.
      </p>
      <p>
        All of that is real, working, standardized. What isn't standardized — what nothing in the protocol guarantees —
        is the one thing that actually matters: when a tool call comes back saying <code>isError: false</code>, that
        only means the Server didn't crash. It says nothing about whether the thing it claims to have done actually
        happened.
      </p>

      <h2>The gap nobody was checking</h2>
      <p>
        Sit with that for a second, because it's easy to skim past. An agent asks a Server to commit some code. The
        Server replies <code>isError: false</code>, "committed abc123: fix the bug." The agent believes it. It moves
        on, maybe tells the user the fix is in, maybe kicks off a deploy.
      </p>
      <p>
        Nothing in that exchange proves a commit with hash <code>abc123</code> exists anywhere. The Server could be
        buggy. It could be lying — deliberately, or because it fabricated a plausible-looking hash after a silent
        failure. The agent has no way to tell the difference between "this genuinely happened" and "this is a
        well-formatted sentence claiming it happened." And once the agent believes it, that belief propagates — into
        the next decision, the next tool call, the thing it tells the user.
      </p>
      <p>
        That's the actual gap. Not "MCP is insecure" — MCP is doing exactly what it's designed to do. It's that{' '}
        <em>nothing in the loop independently checks a claim against reality</em>. So I built something that does.
      </p>

      <h2>What I built: devmcp and verimcp</h2>
      <p>Two pieces, two jobs.</p>
      <p>
        <strong>devmcp</strong> is a real MCP Server — the thing that actually does work. Write a file, make a git
        commit, create a branch, run a CI pipeline, build a Docker image, insert a row into SQLite. Nine tools now,
        each one a real, unmocked side effect: it really writes the file, really shells out to git, really talks to a
        real database file.
      </p>
      <p>
        <strong>verimcp</strong> is the part that doesn't trust devmcp's word for it. It's a proxy — it sits on the
        wire between the Client and devmcp, invisible to both sides. Every <code>tools/call</code> response that passes
        through it gets checked, if there's a verifier for that tool: verimcp independently goes and looks. Did the
        file on disk actually get that content? Does <code>git cat-file</code> actually confirm that commit hash
        exists? Does <code>docker inspect</code> actually show that container with that exit code? Only if the
        independent check agrees with the claim does the response go through unchanged. If it doesn't agree, verimcp
        rewrites the response into a real, visible failure — the Client never sees the unverified claim as if it were
        true.
      </p>

      <SequenceDiagram />

      <p>
        Neither side knows verimcp is there. The Host thinks it's talking straight to devmcp. devmcp thinks it's
        talking straight to the Host. That's deliberate — it's what makes this work as a drop-in layer in front of{' '}
        <em>any</em> MCP server, not just the one I wrote.
      </p>

      <h2>How verification actually works, concretely</h2>
      <p>
        Talk about "verification" too long in the abstract and it starts to sound like hand-waving. So here's the
        first, simplest verifier, in full — <code>FilesystemVerifier</code>, roughly 30 lines, checking{' '}
        <code>write_file</code>:
      </p>

      <CodeBlock label="verifiers/filesystem.py">{`class FilesystemVerifier(Verifier):
    def applies_to(self, tool_name: str) -> bool:
        return tool_name in {"write_file"}

    def verify(self, request, response, root=None):
        result = response.get("result", {})
        if result.get("isError"):
            return response  # already a reported failure, nothing to add

        args = request.get("params", {}).get("arguments", {})
        path, expected_content = args.get("path"), args.get("content")
        actual_path = Path(root) / path

        if not actual_path.exists():
            return self._override(response, f"claimed write to {path!r} succeeded, but the file does not exist")

        actual_content = actual_path.read_text()
        if _sha256(actual_content) != _sha256(expected_content):
            return self._override(response, f"claimed write to {path!r} succeeded, but on-disk content does not match")

        return response  # verified: the claim matches reality`}</CodeBlock>

      <p>
        No LLM call. No heuristics. It re-opens the file, hashes what's actually there, compares it against what was
        claimed, and only lets the response through if reality agrees. Every other verifier follows the same shape
        against a different ground truth: <code>GitCommitVerifier</code> runs <code>git cat-file -e &lt;hash&gt;</code>{' '}
        — git's own "does this object exist" check. <code>DockerVerifier</code> runs <code>docker inspect</code> and
        compares the real exit code against the claimed one. <code>SQLiteVerifier</code> reconnects to the database
        file fresh and re-queries for the exact row. Nine tools now, across five domains — filesystem, git, CI, SQLite,
        Docker — each with its own independently-derived ground truth.
      </p>

      <h2>Proof, not claims</h2>
      <p>
        Every claim above is backed by something that runs, not something I'm asserting. Three separate,
        independently-built AI clients — ones I didn't write — were pointed at this proxy, and each one caught a real
        bug in it before I trusted the "it works" story:
      </p>
      <ul>
        <li>
          <strong>MCP Inspector</strong> (the official testing client) caught a JSON-RPC id-collision bug — the proxy
          briefly confused a backend's own self-originated request with a reply meant for the Host, because two
          completely independent id counters happened to collide.
        </li>
        <li>
          <strong>VS Code's native MCP support</strong> caught a path-traversal bug: an absolute Windows path silently
          got its drive letter stripped and nested under the wrong directory instead of being rejected.
        </li>
        <li>
          Manually testing through Inspector myself (screenshots below, unedited) caught a third one, live: passing a
          Windows path with backslashes into Inspector's argument box silently ate the backslashes, and devmcp wrote
          into a mangled folder path <em>inside the real project repo</em> instead of the isolated test directory I
          intended. I only caught it because I checked real <code>git status</code> myself instead of trusting the
          tool's own success message — which is, appropriately, the entire thesis of this project happening to me
          while building it.
        </li>
      </ul>

      <Shot src={`${BASE}blog/verimcp/inspector-tools-list.png`} alt="MCP Inspector connected, listing devmcp's real tools" />
      <Shot src={`${BASE}blog/verimcp/inspector-tool-result.png`} alt="A real tool call result coming back through verimcp" />
      <Shot src={`${BASE}blog/verimcp/inspector-audit-resources.png`} alt="verimcp's audit trail, exposed as a real MCP resource, read live" />

      <p>
        And beyond "does it catch bugs," there's a real, quantified answer to "how well does it catch bugs," adapted
        from a real paper (
        <a href="https://arxiv.org/abs/2608.02645" target="_blank" rel="noopener noreferrer">arXiv 2608.02645</a>
        ) about agents duplicating actions on retry:
      </p>

      <ComparisonTable />

      <p>
        The 75%, not 100%, is on purpose and stated plainly in the benchmark script's own output: 3 of the 12
        fabrication cases exploit a real, principled limit (a hash-exists check can't prove <em>this specific call</em>{' '}
        created the hash versus it already existing). A tool that claims a perfect score on its own benchmark is the
        thing to be suspicious of — so this one doesn't.
      </p>

      <h2>What's actually shipped</h2>
      <p>
        Both packages are published and installable — <code>pip install verimcp devmcp-server</code> — and listed on
        the official MCP Registry, not just sitting in a repo. Nine tools across five verified domains. 168 passing
        tests, all against real subprocesses and real files, nothing mocked. Every non-obvious decision along the way
        has a written ADR explaining why, including the mistakes.
      </p>
      <p>
        That last part matters more to me than it might seem to say out loud: this wasn't "prompt an LLM, ship whatever
        it says works." Every claim in this post — the bug counts, the benchmark numbers, the screenshots — is
        something you can go run yourself, right now, against the real repo.
      </p>
      <p>
        If you're working on agent reliability, MCP tooling, or just want to talk about any of this —{' '}
        <a href="https://github.com/rudranaresh0201/mcp" target="_blank" rel="noopener noreferrer">the repo's here</a>.
      </p>
    </BlogLayout>
  );
}
