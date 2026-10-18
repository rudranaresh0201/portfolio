import BlogLayout from '../components/blog/BlogLayout';
import CodeBlock from '../components/blog/CodeBlock';

const BASE = import.meta.env.BASE_URL;
const A = `${BASE}blog/computer-use/`;

function Figure({ src, alt }) {
  return (
    <figure className="my-6 rounded-md overflow-hidden border border-line">
      <img src={`${A}${src}`} alt={alt} className="w-full block bg-white" loading="lazy" />
      <figcaption className="px-3 py-2 font-mono text-2xs text-mute bg-raise border-t border-line">{alt}</figcaption>
    </figure>
  );
}

/* rows: [label, ...cells]; tone per cell: 'ok' | 'bad' | undefined */
function Table({ head, rows, tones = {} }) {
  const cols = `minmax(0,1.6fr) ${head.slice(1).map(() => 'minmax(0,1fr)').join(' ')}`;
  return (
    <div className="my-6 rounded-md overflow-x-auto border border-line bg-panel">
      <div className="min-w-[520px]">
        <div className="grid gap-3 px-3 py-2 border-b border-line" style={{ gridTemplateColumns: cols }}>
          {head.map((h, i) => (
            <span key={h} className={`label !text-[9px] ${i ? 'text-right' : ''}`}>{h}</span>
          ))}
        </div>
        {rows.map((r) => (
          <div key={r[0]} className="grid gap-3 px-3 py-2.5 items-baseline border-b border-line last:border-b-0"
            style={{ gridTemplateColumns: cols }}>
            <p className="text-sm text-dim leading-snug">{r[0]}</p>
            {r.slice(1).map((c, i) => (
              <span key={i} className={`text-right font-mono text-sm ${
                tones[`${r[0]}|${i}`] === 'ok' ? 'text-ok' : tones[`${r[0]}|${i}`] === 'bad' ? 'text-bad' : 'text-dim'}`}>
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogComputerUse() {
  return (
    <BlogLayout
      title="Where should an agent click? A small grounder, and when to trust the accessibility tree"
      date="2026-10-18"
      tags={['computer-use', 'gui-grounding', 'agents', 'lora']}
    >
      <figure className="my-6 rounded-md overflow-hidden border border-line">
        <video src={`${A}demo.mp4`} poster={`${A}demo-poster.jpg`} controls playsInline className="w-full block" />
        <figcaption className="px-3 py-2 font-mono text-2xs text-mute bg-raise border-t border-line">
          One prompt, three apps, cut for length and sped up; the last clip is from a Tinkercad run. Claude only
          decides; the loop, the router, the 2B grounder and the checks are mine.
        </figcaption>
      </figure>

      <h2>What computer use is</h2>
      <p>
        A computer-use agent operates software the way a person does. It looks at the screen, decides what to do,
        and moves the mouse or types. Under the hood it is a loop: take a screenshot, ask a model what to do next,
        do it, take another screenshot, repeat until the task is done. Anthropic shipped this in 2024 as a Claude
        ability, and most labs now have a version.
      </p>
      <p>
        The model never touches the computer. Your program does. It takes the screenshot, executes the click, and
        reports back. That split is the interesting part, because every hard engineering question lives on your side
        of it: how the screen is described to the model, how a decision becomes a pixel, how you know an action
        worked, and how you know the whole task worked.
      </p>

      <h2>The question every action starts with</h2>
      <p>
        Before anything else, an agent has to answer one small question again and again: <em>where on the screen is
        the thing I want?</em> Turning "click Save" into a coordinate is called <strong>GUI grounding</strong>, and
        the research on agents keeps finding that it, more than planning, is where they fail.
      </p>
      <p>There are two ways to answer it.</p>
      <p>
        <strong>Ask the app.</strong> Windows apps publish an <em>accessibility tree</em> (UI Automation), and so do
        web pages. It exists for screen readers: a list of every button and field, with a name and a rectangle. If
        the tree says there is a button called Save at (812, 44), you click (812, 44). Exact, instant, free.
      </p>
      <p>
        <strong>Look at the screen.</strong> A vision model reads the screenshot and points at Save. It works on
        anything you can see, but it can miss.
      </p>
      <p>
        The obvious design is to use the tree and fall back to vision when the tree has no answer. That is roughly
        what agent systems do today. The trouble is that trees have holes. Icon buttons ship without names. Custom
        toolkits draw their own controls. Everything inside a canvas (a spreadsheet grid, a CAD view, a whiteboard)
        is invisible to the tree. On the web, 29.6% of the top million home pages have at least one button with no
        accessible name. GIMP's main window exposes seven UI Automation elements in total.
      </p>
      <p>I wanted to know how much those holes cost, and what to do about them.</p>

      <h2>Step one: a vision model that can actually point</h2>
      <p>
        To compare the tree with vision, I first needed a vision model good enough to compare. The base model I
        could afford, Qwen2-VL-2B, hit the right element on Windows apps it had never seen 1.5% of the time. It can
        describe a screenshot. It can not point.
      </p>
      <p>
        Training a model to point needs thousands of examples of "this instruction, this exact spot". People usually
        draw those boxes by hand. I did not have to, because the accessibility tree already knows the name and the
        box of every element it does name. So the tree labels its own data: for every named button, a script writes
        an example of the form screenshot, "Click Save", centre of Save's box.
      </p>
      <p>
        A collector drove 14 Windows apps through 6 to 10 states each at two or three window sizes: 200 screenshots
        and 3,163 targets. Ten apps went to training (1,572 examples). Four apps were kept out entirely, so I could
        ask the question that matters for a real agent: does it work on software it has never seen?
      </p>
      <p>
        The training itself was LoRA on the language half of the model (rank 16), three epochs, 1,179 steps, about
        eight hours on one free Kaggle T4. The vision encoder stays frozen.
      </p>
      <p>
        Most of the work was not the training. It was finding out that the data was wrong while every check said it
        was fine. Rendering every label onto its screenshot showed that 36% of an earlier version described the
        wrong window: focus had moved mid-collection and the collector was reading my code editor's buttons under
        another app's name. Training ran in fp16 with no loss scaling, so the adapter's updates were silently
        rounding to zero while the loss looked healthy. The frozen vision tower was quietly in the backward pass,
        which made every step three times slower and ran a 16 GB GPU out of memory. The parser scored the baseline's
        answers at a box corner instead of the centre, which would have inflated the result. Each one passed the
        tests. Each one was found by looking at the actual output instead of the summary.
      </p>

      <h2>What the training bought</h2>
      <p>
        The checkpoint was chosen on a separate dev set and that choice was committed before a single test example
        was scored. Every test set was scored once. Intervals are bootstrap 95% intervals, resampled by screenshot,
        because targets on one screen are not independent.
      </p>
      <Table
        head={['test', 'before', 'after', 'gain [95% CI]']}
        rows={[
          ['Same 10 apps, new screenshots (246)', '14.2', '64.6', '+50.4 [43.0, 57.8]'],
          ['4 apps never trained on (790)', '1.5', '46.5', '+44.9 [41.1, 48.7]'],
          ['ScreenSpot-v2, public benchmark (1,272)', '19.2', '62.8', '+46.1 [42.9, 49.1]'],
        ]}
        tones={{ '4 apps never trained on (790)|1': 'ok' }}
      />
      <p>
        The gain holds on every one of the four unseen apps, and on every platform of ScreenSpot-v2, including
        phones (+57.5), although it never saw a phone. On the original ScreenSpot it scores 61.9, between SeeClick
        (53.4, a 9.6B model on about a million examples) and ShowUI-2B (75.1, the same base model on about 256K).
        Cross-paper numbers are only a rough guide, but the point is the cost: 1,572 free labels and a free GPU.
      </p>
      <Figure src="learning_curve.png" alt="Dev accuracy by training step. It was still rising at the last step." />
      <p>
        Where it misses is just as useful. Target size dominates: the smallest quarter of targets is hit 15% of the
        time, the largest two quarters about 65%. On unseen apps, half the misses land close to the right box (within 50 units on a 1,000-unit screen): the
        right area and the wrong neighbour.
      </p>
      <Figure src="size_quartiles.png" alt="Hit rate on unseen apps by target size. Small icons are the weak spot." />

      <h2>The tree does not know what it does not know</h2>
      <p>
        Now the real question. To compare the tree and vision fairly, ground truth can not come from either of them,
        so I generated web pages where I know exactly where everything is, in five situations a tree can face: the
        target has a clean name (C1), it is an icon with no name (C2), the instruction rewords its name (C3), it is
        drawn on a canvas (C4), or several buttons share its name (C5).
      </p>
      <Table
        head={['policy', 'named', 'no name', 'reworded', 'canvas', 'same name', 'mean']}
        rows={[
          ['tree (name matching)', '100', '0', '0', '0', '26.5', '25.3'],
          ['vision (my grounder)', '94', '40', '31', '99', '65', '65.8'],
          ['tree first, else vision', '100', '37.5', '29.5', '75.5', '26.5', '53.8'],
        ]}
        tones={{ 'tree first, else vision|5': 'bad', 'vision (my grounder)|5': 'ok' }}
      />
      <p>
        The tree wins one column. The obvious merge, tree first and vision when the tree has nothing, loses 12 points
        to vision alone. The reason is in the "same name" column. Asked to archive Grace Hopper's order on a page with
        three Archive buttons, a name matcher does not say "I am not sure". It returns the first Archive button,
        confidently, and vision is never asked.
      </p>
      <p>That turns out to be exact, not just a story:</p>
      <CodeBlock label="the loss of tree-first, as one identity">{`tree-first − vision = P(tree answers) × (tree precision − vision accuracy on those same items)

                     = 46.8% × (54.1% − 79.7%) = −12.0 points`}</CodeBlock>
      <p>
        The merge only loses on items where the tree answers, and it loses when the tree is less precise there than
        vision would have been. An incomplete tree keeps answering. On the ambiguous column it answers every item and
        overrides a correct vision click on half of them.
      </p>
      <Figure src="test_a_help_harm.png" alt="Help (tree right, vision wrong) and harm (tree wrong, vision right) of tree-first, per condition." />
      <p>
        The same thing happens on real Windows screens. I took the grounder's saved answers on the four unseen apps
        and re-scored them against the real UI Automation tree with the target's name blanked, or the target removed.
        Vision stays at 46.5 because it never reads the tree. Tree-first drops to 37.0, because the tree still
        answers on 25.8% of items through some other element with a similar name, and is right on 3.9% of those.
      </p>
      <Figure src="test_b.png" alt="Real Windows apps, three tree states. Tree-first (fallback) falls below vision once the target is missing. Snap and guarded are two other hybrids from the paper." />

      <h2>A gate that works</h2>
      <p>
        If the problem is that the tree never abstains, the fix is to give it a way to. An LLM reads the tree as text
        and either picks an element or says NONE. Then one rule: <strong>its pick counts only if that element has a
        name</strong>; otherwise vision decides.
      </p>
      <Table
        head={['policy (same 250 items)', 'mean click accuracy']}
        rows={[
          ['tree first, else vision', '55.2'],
          ['vision alone', '66.4'],
          ['LLM reads the tree, named picks only, else vision', '85.2'],
        ]}
        tones={{ 'LLM reads the tree, named picks only, else vision|0': 'ok', 'tree first, else vision|0': 'bad' }}
      />
      <p>
        I chose that rule on separate dev pages and scored it once. It is never below vision on any of the five
        conditions. The LLM handles rewording and ambiguity (it knows "subscribe" means the Sign up button, and which
        row Grace Hopper is in). Vision handles icons and canvases. And the same identity explains the gain: the LLM's
        named picks cover 59.2% of items and are 93.2% precise where vision is 61.5% on those items, and 0.592 × (93.2
        − 61.5) is +18.8, which is the measured gain to the decimal.
      </p>

      <h2>From a rule to an agent</h2>
      <p>
        Results on single clicks are not an agent, so I built the loop around the rule. The brain is Claude, run
        headless with every tool switched off. It only reads the screen and returns one decision as JSON. It can not
        click anything itself.
      </p>
      <CodeBlock label="what the brain is allowed to say">{`{"action": "click", "element": "e27"}                         a named element from the tree
{"action": "click", "target": "the floppy-disk save icon"}    a description, for my grounder
{"action": "drag", "target": "the LED tile", "to_x": 250, "to_y": 300}   empty canvas: its own x, y`}</CodeBlock>
      <p>
        A router applies the gate to every decision. A named element goes through the tree. A nameless element is
        refused with the reason ("no name: describe it"), so the brain describes it and my grounder finds it. Bare
        coordinates for a click are refused, so the brain can not quietly skip the research. Every action records
        which of those three placed it.
      </p>
      <p>
        Then verification. "Done" is only a claim. Plan steps have to be proved with evidence the system checks
        itself (text in the app, a fresh file, a changed screen), and a task checker reads the application's state at
        the end. A claim the checker rejects is counted as a false success instead of a pass.
      </p>
      <p>
        My laptop can not run the grounder: squeezed to 8-bit to fit in memory it hit 1 of 12 targets and wrote
        "Window 4" instead of coordinates. So it runs on the same free Kaggle GPU it was trained on, behind a tunnel,
        and the laptop calls it. On 40 held-out examples its live answers are identical, coordinate for coordinate,
        to the ones the evaluation recorded six days earlier.
      </p>

      <h2>The demo, and what it shows</h2>
      <p>
        The video at the top is one prompt: compute 3 × 0.02 in Calculator, write the result in Notepad++, then draw
        a box labelled with it in Excalidraw. Each part is told what the earlier parts found. It passed in 5 minutes
        16 seconds, and every step was proved from the apps themselves. Calculator's own text said "Display is 0.06".
      </p>
      <p>
        My favourite moment is near the end. After the label was typed, the brain tried to prove it by finding "0.06"
        on the page, and the verifier said <em>contradicted: 0.06 is not on the page as the accessibility tree reads
        it</em>. It was right. Excalidraw draws on a canvas, and the tree can not see it. The whole post in one line
        of a log.
      </p>
      <Figure src="verifier.jpg" alt="The finished box in Excalidraw. Its label is invisible to the accessibility tree, so the check had to be done another way." />

      <h2>What did not work</h2>
      <p>
        The first plan for the video was a Tinkercad circuit: a coin-cell battery lighting an LED, then the
        simulation. Tinkercad is almost entirely nameless to the tree (the parts panel is a grid of identical
        "Favorite" buttons), which makes it the perfect case for the grounder, and that part worked. It found the
        battery and LED tiles and the system verified each part landing on the board.
      </p>
      <p>Then it taught me three things over several takes:</p>
      <ul>
        <li>
          Asked for "an empty spot on the board", the grounder pointed at the toolbar every time. It learned to find
          things, and empty space is not a thing. Now empty places are the seeing brain's job and the router says so.
        </li>
        <li>
          It confused the 9V and coin-cell battery tiles, which sit side by side. Searching for the part first, the
          way a person would, removed the confusion.
        </li>
        <li>
          LED legs and the Start Simulation button in a narrow window are exactly the small targets the size chart
          above predicts it misses. The circuit got built and wired, and the run stopped one button short.
        </li>
      </ul>
      <p>
        So the circuit is the next experiment, not the demo. I would rather show a run that passed than one I had to
        explain.
      </p>

      <h2>What is next</h2>
      <ul>
        <li>The second training seed's evaluation, so the grounder numbers are not one run.</li>
        <li>Real buttons the tree can not see, boxed by hand on eight apps, to test whether a grounder trained only on named elements transfers to unnamed ones. This is the biggest open question.</li>
        <li>Whole-task comparisons: Claude pointing by itself, Claude with the router and my grounder, and a free text-only model with my grounder.</li>
      </ul>
      <p>
        Everything here, including the per-example results and the script that regenerates every number and chart, is
        in <a href="https://github.com/rudranaresh0201/computer-use" target="_blank" rel="noopener noreferrer">the repo</a>.
      </p>
    </BlogLayout>
  );
}
