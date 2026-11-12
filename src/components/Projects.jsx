import { Link } from 'react-router-dom';

export const PROJECTS = [
  {
    id: 'squint',
    cat: 'rl',
    name: 'Long-horizon visual RL',
    period: '2026',
    status: 'building',
    line: 'Visual RL on an SO-101 arm from 16x16 pixels, on a free Kaggle GPU. Now pushing it to long tasks without demos.',
    body: [
      'Squint is a fast visual RL method: SAC with a distributional critic, 1024 simulated arms in parallel on the GPU, and a 16x16 wrist-camera image as input. The paper uses a 3090. I got it running on a free Kaggle T4, which took fixing the Vulkan driver setup and switching off bf16. ReachCube and LiftCube both reach 100%.',
      'Then I added my own tasks. LangLift puts a cube and a can on the table and an instruction says which one to lift: 100%. On StackCube I found why a discount of 0.99 fails: the returns go past the critic\'s fixed value range and get clamped. Widening the range took it from 12% to 100%.',
      'Then PlaceBoth, a 200-step task with two objects and one bin, four times Squint\'s horizon. From pixels alone the policy places the first object and then stalls: a single 16x16 frame does not show what it has already done. Told its stage, and trained with a reverse curriculum, it finishes the whole task 81 to 94% of the time on two seeds.',
      'Now I am testing whether memory can replace that hint: a GRU, and past-token prediction, trained with online RL on PlaceBoth and on the MIKASA-Robo memory benchmark.',
    ],
    metrics: [
      ['ReachCube, LiftCube on a free T4', '100%'],
      ['LangLift (instruction picks the object)', '100%'],
      ['StackCube at discount 0.99', '12% to 100% with a wider value range'],
      ['PlaceBoth (200 steps, 2 objects), pixels only', '0%, stalls after the first object'],
      ['PlaceBoth, told its stage', '81 to 94%, 2 seeds'],
    ],
    note: 'PlaceBoth is solved only with the stage given to the policy; the memory runs that try to remove it are in progress. Everything here is one or two seeds on a free GPU.',
    stack: ['Python', 'PyTorch', 'ManiSkill3', 'SAC', 'C51', 'Kaggle T4'],
    links: [],
    demo: true,
    thumb: { src: 'demos/squint.jpg', alt: 'LangLift: the wrist view and the arm lifting the object it was told to' },
  },
  {
    id: 'so101',
    cat: 'rl',
    name: 'SO-101 world model',
    period: '2026',
    status: 'shipped',
    line: "Trained a robot arm inside a learned world model. It learned to cheat the model. I caught it, fixed it, and got real picks on 2 of 3 seeds.",
    body: [
      'The baseline is plain SAC in MuJoCo: twin critics, entropy tuning, observation normalisation, and a staged reward for reaching, grasping (both jaws touching and actually squeezing) and lifting. It picks up a randomly placed box in 100% of test episodes, on two seeds.',
      'The world model is an ensemble of five MLPs trained on 172k recorded transitions to predict how the 41-number state changes for a given action. The reward is computed exactly from the predicted state, with no learned reward head, so any gap between the dream and reality comes from dynamics error alone. A fresh SAC policy trains only on rollouts from this model, MBPO-style, and every evaluation happens in real MuJoCo.',
      'Short 5-step rollouts never learned, and the same recipe also failed when run in the real simulator, which pinned that failure on the horizon rather than on the model. At 50 steps the policy found an exploit: it hovered about 16 cm from the box while the predicted contact signals drifted upward, the model counted a grasp, and the imagined box rose 50 cm. Real success stayed at 0%.',
      'Three fixes together: an online loop that feeds a few real episodes back into the model and into SAC\'s replay buffer, a penalty on ensemble disagreement, and a physics check that a grasp needs the claw within 6 cm of the box (the largest real grasp distance in the data was 5.1 cm). With them, the policy trained in the dream picks the box in real physics on 2 of 3 seeds, peaking at 60%.',
    ],
    metrics: [
      ['SAC in MuJoCo', '100% pick success, 2 seeds'],
      ['dream, no fixes', 'model says grasped 100%, real 0%'],
      ['dream + fixes', 'real picks on 2 of 3 seeds, best 60%'],
      ['rollout horizon, real physics', '5 fails, 20 reaches 85%, 50 reaches 95%'],
    ],
    note: 'Not solved. Real success swings up and down during training and one seed never picks, most likely because the penalised dream turns pessimistic and the policy unlearns a strategy that works. The model\'s training data also came from policies that were already trained, so this does not yet show that a world model saves real steps. That needs a model built from random play alone, with every real step counted.',
    stack: ['Python', 'MuJoCo', 'Gymnasium', 'Stable-Baselines3', 'PyTorch', 'SAC', 'MBPO'],
    links: [{ label: 'github', href: 'https://github.com/rudranaresh0201/so101-world-model' }],
    demo: true,
    blog: '/blog/so101',
    thumb: { src: 'demos/so101.jpg', alt: 'The world model and reality side by side' },
  },
  {
    id: 'computer-use',
    cat: 'agents',
    name: 'computer-use',
    period: '2026',
    status: 'shipped',
    line: "A computer-use agent where Claude decides what to do and a 2B model I trained finds where to click.",
    body: [
      'Every action an agent takes starts with one question: where on the screen is the thing I want? The accessibility tree answers it exactly when the target is there and named, and agents usually trust it first and fall back to vision. I measured that design on generated apps and on real Windows screens with ground truth from neither source. Once the tree has holes it is worse than vision alone, and the loss has an exact form: how often the tree answers, times how much less precise it is than vision on those same items.',
      'The vision side is Qwen2-VL-2B with LoRA, trained on 1,572 targets the Windows accessibility tree labels for free, on one free Kaggle T4. A gate that trusts the tree only when the element an LLM picks has a name keeps the tree on named targets and hands everything else to the grounder.',
      'The agent is built around that rule. Claude runs headless with its tools off and returns one decision as JSON. A router applies the gate, my grounder places nameless targets from a GPU behind a tunnel, and every step has to be proved from the app itself, so a wrong "done" is counted as a false success instead of a pass. One prompt drove Calculator, Notepad++ and Excalidraw end to end.',
    ],
    metrics: [
      ['unseen apps', '1.5% to 46.5% after training'],
      ['ScreenSpot-v2', '19.2 to 62.8'],
      ['tree first, else vision', '12 points below vision alone'],
      ['named-pick gate', '85.2% vs 66.4% for vision'],
      ['tests', '417'],
    ],
    note: 'The useful part was the failures. 36 percent of an early dataset was labels from the wrong window, found only by drawing the boxes on the screenshots. In the Tinkercad demo the grounder pointed every "empty spot on the board" at the toolbar, because it learned to find things and empty space is not a thing, so empty places are now the brain\'s job. The circuit run is the next experiment, not the demo.',
    stack: ['Python', 'PyTorch', 'LoRA', 'Qwen2-VL', 'LangGraph', 'Claude', 'Windows UIA', 'Playwright', 'Electron'],
    links: [{ label: 'github', href: 'https://github.com/rudranaresh0201/computer-use' }],
    shots: [{
      src: 'shots/computer-use-demo.jpg',
      alt: 'The finished Excalidraw box labelled 0.06 beside the agent window',
      caption: 'The end of a three-app run. The label is drawn on a canvas the accessibility tree cannot see, so the verifier rejected the first proof and the step had to be checked another way.',
    }],
    blog: '/blog/computer-use',
  },
  {
    id: 'dreamdesk',
    cat: 'agents',
    name: 'DreamDesk',
    period: '2026',
    status: 'shipped',
    line: "An agent that explores an app it has never seen, learns a world model of it, and plans inside that. No LLM.",
    body: [
      'The agent reads the app through its accessibility tree rather than pixels, inside a sandbox (bubblewrap and a private Xvfb screen) so that random clicking cannot reach real files. It explores with random clicks, and the world model is trained only on what those clicks did.',
      'The model generalises past what it saw. On 6 of 6 apps it predicts 5 steps ahead better than memorising, at 153 times real speed. On combo goals, screens whose parts it saw while exploring but never together, planning in the dream beats replaying a map of memorised screens by 11.5 points. Before a single real attempt, the dream also predicts which tasks a policy will fail.',
      'On apps held out of training, zero-shot transfer failed. A prior trained on 7 apps and fine-tuned on 100 to 300 clicks of the new app learns it better than a model trained from scratch, and then does real tasks about as well as the map, and better than random from 300 clicks on.',
      'Test 1 asked whether a prior trained on more apps (7, 15 or 23) gives a new app a better model. Every prior beat training from scratch on all 8 held-out apps, but 23 apps over 7 narrowly missed the pre-registered bar. More web apps in the prior helped new web apps and did nothing for new desktop apps.',
    ],
    metrics: [
      ['world model vs memorising', 'better on 6 / 6 apps, 153x real speed'],
      ['combo goals, dream vs map', '19.8% vs 4.2% at 100 clicks'],
      ['forecasting real failure', 'AUROC 0.88 over 1,770 real runs'],
      ['held-out apps', 'prior + 300 clicks: matches map, beats random'],
      ['prior vs scratch, 8 new apps', 'better on 8 / 8'],
      ['23-app vs 7-app prior (Test 1)', '+0.052, interval -0.010 to +0.119: narrowly no'],
    ],
    note: 'On combo goals the dream beats random by only 4.8 points, which is inside the noise. A policy trained in the dream did not reach goals it never practised (23% vs 24% for random). So far the world model generalises better than anything built on top of it.',
    stack: ['Python', 'PyTorch', 'AT-SPI', 'Xvfb', 'bubblewrap', 'Kaggle'],
    links: [{ label: 'github', href: 'https://github.com/rudranaresh0201/dreamdesk' }],
    demo: true,
    blog: '/blog/dreamdesk',
    thumb: { src: 'demos/dreamdesk.jpg', alt: 'DreamDesk exploring an app' },
  },
  {
    id: 'verimcp',
    cat: 'agents',
    name: 'verimcp + devmcp',
    period: '2026',
    status: 'shipped',
    line: "A proxy that checks whether an MCP tool call really did what it claims. On PyPI and the MCP Registry.",
    body: [
      'MCP gives a host no way to tell a real success from a claimed one. isError: false means the tool did not crash, nothing more. verimcp sits between host and backend as a transparent stdio proxy and forwards everything unchanged, except that for calls it knows how to check, it independently re-derives the outcome and compares. A write gets hashed back off disk, a commit gets re-read out of the git log, a CI step gets re-run if it is safe to re-run. When the two disagree, the claimed success is rewritten into a real error before the model ever sees it.',
      'There is a second problem underneath: MCP has no idea what a retry is. Resend a tools/call after a timeout and the backend just runs it again, which for a commit or a charge is not a no-op. The proxy answers a repeated call from cache, but only if that exact call was independently verified true earlier in the session. A key match with nothing verified behind it is a miss, not a dedupe.',
      'devmcp is the backend it gets proven against, deliberately built across the full protocol surface (tools, resources, prompts, roots, sampling) and across git, CI, filesystem, SQLite and Docker, because a proxy is only as convincing as what you can show it catching. The two ship separately and neither imports the other, so verimcp fronts any MCP backend, including the official mcp-server-git.',
    ],
    metrics: [
      ['unprotected agent believes', '14 / 14 fabricated results'],
      ['verimcp disproves', '11 / 14, and names the 3 it cannot'],
      ['duplicate side effects', '5 / 5 down to 0 / 5'],
      ['tests', '138, real subprocess pipes, no mocks'],
    ],
    next: 'Currently extending the same idea past MCP to A2A, so an agent handing another agent a finished task gets checked the same way a tool call does. A2A renamed its state enum between v0.3 and v1.0 and both are deployed in the wild, so the first piece reads a Task across both generations and treats an unfamiliar state as unknown rather than crashing a working conversation.',
    note: 'The benchmark prints 79 percent rather than a round 100 on purpose. Three of the fourteen exploit gaps that are real and documented, like a hash-exists check that cannot prove this call is what created the hash. A tool scoring perfectly on a benchmark it wrote itself is the thing worth being suspicious of.',
    stack: ['Python', 'MCP', 'JSON-RPC', 'OpenTelemetry', 'Docker', 'pytest'],
    links: [
      { label: 'github', href: 'https://github.com/rudranaresh0201/mcp' },
      { label: 'pypi', href: 'https://pypi.org/project/verimcp/', live: true },
      { label: 'mcp registry', href: 'https://registry.modelcontextprotocol.io/?search=rudranaresh0201', live: true },
    ],
    shots: [{
      src: 'shots/verimcp-console.jpg',
      alt: 'The verimcp console mid-run, five calls marked disproven',
      caption: 'The console tailing a real run. Five of nine calls claimed a success that never happened; the inspector shows the claim beside what re-deriving it actually found.',
    }],
    blog: '/blog/verimcp',
  },
  {
    id: 'aria',
    cat: 'agents',
    name: 'Aria',
    period: '2026',
    status: 'shipped',
    line: "A multi-agent assistant with RAG, where every write waits for your approval.",
    body: [
      'A planner routes work across 15 specialist agents (Gmail, GitHub, Calendar, code execution, data analysis) behind an orchestrate, synthesise, critique pipeline. Anything that writes to the outside world pauses at an approval card first, so nothing sends or commits on the model deciding it should.',
      'Retrieval runs HyDE query expansion, BM25 and dense vectors fused and then reranked, with a similarity floor that returns nothing rather than inventing something when no relevant context exists. Vector store, memory and OAuth credentials are isolated per user. Executed code runs in a Docker sandbox with no network.',
    ],
    metrics: [
      ['agents', '15 specialists behind one planner'],
      ['security', 'found and fixed a JWT flaw allowing forged tokens'],
    ],
    shots: [{
      src: 'shots/aria-answer.jpg',
      alt: 'Aria answering a question with evidence and insights panels',
      caption: 'One answer, with the evidence it was drawn from and the confidence beside it, so a claim can be traced back to the document that supports it rather than taken on faith.',
    }],
    note: 'Repo is private for now, so there is nothing to link yet.',
    stack: ['LangGraph', 'FastAPI', 'React', 'ChromaDB', 'Docker'],
    links: [],
  },
  {
    id: 'prguard',
    cat: 'agents',
    name: 'PRGuard',
    period: '2026',
    status: 'shipped',
    line: "A PR review agent that reads the whole repo, not just the diff.",
    body: [
      'An 8 node LangGraph pipeline: triage, security, docs, bug detection, API change detection, critical file audit. Because it indexes the repo at function level rather than reading the diff alone, it can flag an architecture violation or logic that already exists elsewhere, which is exactly the class of problem a diff hides by definition.',
      'Alongside it, Aftershock: a signed notice board so a library can warn dependent repos about a breaking change, and they can verify the notice offline with Ed25519. It is deployed, but free hosting has no persistent disk, so the signing key changes on every cold start. The mechanism works; it needs a mounted disk to be useful.',
    ],
    metrics: [
      ['on a 16 issue suite', '100% recall, 94.12% precision'],
      ['languages covered', 'Python, Solidity, Bash, Dockerfile'],
    ],
    stack: ['LangGraph', 'FastAPI', 'ChromaDB', 'Ed25519', 'PyGitHub'],
    shots: [{
      src: 'shots/prguard-routes.jpg',
      alt: 'The deployed API listing its governance and cross-repo routes',
      caption: 'The deployed surface, in three groups. The agent answers questions about an indexed codebase, governance takes the GitHub webhook and the manual trigger that starts a review, and cross-repo is Aftershock: announce a breaking change, fetch the public key, verify a notice.',
    }],
    links: [
      { label: 'live api', href: 'https://governance-agent.onrender.com/docs', live: true },
      { label: 'signing key', href: 'https://governance-agent.onrender.com/cross-repo/pubkey', live: true },
      { label: 'github', href: 'https://github.com/rudranaresh0201/PRGuard' },
    ],
  },
  {
    id: 'cliniq',
    cat: 'agents',
    name: 'ClinIQ',
    period: '2026',
    status: 'shipped',
    line: "Clinical decision support that has to show its evidence.",
    body: [
      'Takes symptoms, age, medications and location, and runs them through a nine stage pipeline: emergency red flag check first, then a cached-answer lookup over PubMedBERT vectors, first-principles clinical reasoning, a plan for which tools to call, and only then retrieval against real PubMed literature and OpenFDA drug data. Answers stream to the browser over SSE so you watch the stages resolve instead of waiting on a spinner.',
      'Two parts I would actually defend. The evaluator scores whether the evidence it just fetched is sufficient, and if it is not, it rewrites the query and fetches again, which is roughly what a clinician does when a broad search comes back useless. And after synthesis, a faithfulness pass checks every claim against the abstracts actually retrieved on that run, so a fluent sentence with no source behind it gets flagged rather than shipped.',
      'Retrieval is reranked against India-specific epidemiology, seasonal and state level, because base rates are most of diagnosis and a model trained on largely Western literature carries the wrong ones.',
    ],
    metrics: [
      ['pipeline', '9 stages, evidence checked between them'],
      ['sources', 'PubMed and OpenFDA, live, not a scraped dump'],
    ],
    note: 'The honest gap: this one has no test suite and I have not published evaluation numbers for it, so unlike the projects above it is argued on how it is built rather than on a score. It runs on a free instance, so the first request after fifteen idle minutes takes about a minute to wake.',
    stack: ['FastAPI', 'React', 'TypeScript', 'ChromaDB', 'Supabase', 'Docker', 'SSE'],
    shots: [
      {
        src: 'shots/cliniq-patient-os.jpg',
        alt: 'The ClinIQ patient view: recovery score, risk band and agent activity',
        caption: 'The patient view after a real query. A recovery score and risk band over a seven day window, a monitoring plan with checkpoints, and the agents that produced it logged as they finish.',
      },
      {
        src: 'shots/cliniq-timeline.jpg',
        alt: 'The case timeline listing which agent produced each entry',
        caption: 'The same case as a timeline, with each entry tagged by the agent that wrote it: symptom extractor, clinical reasoner, India epidemiology reranker.',
      },
    ],
    links: [
      { label: 'live demo', href: 'https://cliniq-opal.vercel.app', live: true },
      { label: 'api', href: 'https://cliniq-backend-lwon.onrender.com/docs', live: true },
      { label: 'github', href: 'https://github.com/rudranaresh0201/Cliniq' },
    ],
  },
];

export const CATEGORIES = [
  { id: 'rl', title: 'RL & world models' },
  { id: 'agents', title: 'Agents & computer use' },
];

/* What is in progress and has no page yet. Shown as plain rows under RL. */
const UPCOMING = [
  {
    name: 'Memory for long tasks',
    line: 'Can a policy work out which stage of a task it is in from its own history, without being told?',
  },
  {
    name: 'World-model hallucination',
    line: 'Catching a world model when it makes things up, before the policy learns to exploit it.',
  },
];

function Row({ p, n }) {
  const img = p.thumb || p.shots?.[0];
  return (
    <li>
      <Link
        to={`/projects/${p.id}`}
        className="row group grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr_7.5rem] gap-x-3 sm:gap-x-5 items-center py-5 sm:py-6 px-2 sm:px-3 -mx-2 sm:-mx-3"
      >
        <span className="label self-start pt-1.5">{String(n).padStart(2, '0')}</span>
        <div className="min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="display text-2xl sm:text-[1.75rem] text-fg">{p.name}</h3>
            <span className="arrow text-faint text-lg leading-none" aria-hidden="true">&#8599;</span>
            {p.status === 'building' && (
              <span className="label !text-accent inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent live-dot" aria-hidden="true" />
                in progress
              </span>
            )}
          </div>
          <p className="text-dim text-[15px] leading-relaxed mt-1.5 max-w-2xl">{p.line}</p>
        </div>
        {img && (
          <div className="frame hidden sm:block aspect-[16/10] border border-line">
            <img
              src={`${import.meta.env.BASE_URL}${img.src}`}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition duration-300"
            />
          </div>
        )}
      </Link>
    </li>
  );
}

export default function Projects() {
  let n = 0;
  return (
    <div className="space-y-14">
      {CATEGORIES.map((c) => {
        const items = PROJECTS.filter((p) => p.cat === c.id);
        return (
          <div key={c.id}>
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="label !text-fg">{c.title}</h3>
              <span className="label">{items.length}</span>
            </div>
            <ul className="border-b border-line">
              {items.map((p) => <Row key={p.id} p={p} n={++n} />)}
              {c.id === 'rl' && UPCOMING.map((u) => (
                <li key={u.name} className="rowline grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-3 sm:gap-x-5 py-5 px-2 sm:px-3 -mx-2 sm:-mx-3">
                  <span className="label pt-1.5">next</span>
                  <div>
                    <h3 className="display text-2xl sm:text-[1.75rem] text-mute">{u.name}</h3>
                    <p className="text-mute text-[15px] leading-relaxed mt-1.5 max-w-2xl">{u.line}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
