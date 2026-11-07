import { Link } from 'react-router-dom';
import BlogLayout from '../components/blog/BlogLayout';
import { Figure, Table, Video } from '../components/blog/Parts';

export default function BlogJourney() {
  return (
    <BlogLayout
      title="Computer use, three ways: pointing, plumbing, and an agent with no LLM"
      date="2026-11-08"
      tags={['computer use', 'gui grounding', 'world models', 'accessibility trees']}
    >
      <Video
        src="demos/dreamdesk.mp4"
        poster="demos/dreamdesk.jpg"
        caption="DreamDesk, the latest of the three: an agent explores an app with random clicks, learns a model of it, and plans inside that model. No LLM anywhere in the loop."
      />

      <p>
        Lately I have been working on one question from three sides: how does a program use
        software the way a person does? First I trained a small vision model to point at buttons and built
        an agent around it, with Claude making every decision. Then, at my internship, I measured the
        operating-system plumbing an agent depends on. Then I built an agent that uses no LLM at all.
      </p>
      <p>
        Two of the three have their own longer write-ups with all the numbers. This is the short version of
        each, and why I moved from one to the next.
      </p>

      <h2>1. Pointing: a 2B grounder and an agent around it</h2>
      <p>
        Every action starts with the same small question: where on the screen is the thing I want? Apps
        publish an accessibility tree, a list of buttons with names and boxes, but trees have holes. Icon
        buttons have no names, canvases are invisible to the tree.
      </p>
      <p>
        So I trained Qwen2-VL-2B to point, with labels the accessibility tree wrote for free and a free Kaggle
        GPU. On four Windows apps it never trained on, it went from 1.5% to 46.5% of clicks on target. Then I
        measured the usual design, "trust the tree, fall back to vision", and found it is worse than vision
        alone: an incomplete tree never says "I don't know", it confidently returns the wrong button.
        Letting an LLM read the tree and only trusting its pick when the element has a name brought click
        accuracy to 85.2%, against 66.4% for vision alone.
      </p>
      <Figure
        src="blog/computer-use/test_b.png"
        caption="Real Windows apps with the target's name blanked or removed from the tree. Trusting the tree first falls below vision alone once the tree has holes."
      />
      <p>
        I built the agent around that rule: Claude reads the screen and returns one decision, a router sends
        it to the tree or to my grounder, and a checker reads the app's state to prove each step. It did a
        three-app task (Calculator, Notepad++, Excalidraw) end to end in 5 minutes 16 seconds.
      </p>
      <p>
        It worked, but every step was a call to a large model, plus a GPU behind a tunnel for the grounder.
        That is slow and costs money on every step, even on an app the agent has used many times before.
        That is why part 3 has no LLM.
      </p>
      <p>
        <Link to="/blog/computer-use">Full write-up: where should an agent click?</Link>
      </p>

      <h2>2. Plumbing: measuring what an agent assumes about the OS</h2>
      <p>
        At Everyday Habit I work on a computer-use agent that learns a desktop workflow by watching someone do
        it once, then replays it on its own. Its spec was written by reasoning about how Windows, Linux and
        macOS behave. My job is to check those assumptions on real machines: each experiment takes one,
        measures it, and ends in a findings file that goes back into the spec. Ten so far, on Windows and Linux.
        The details stay with the company, but a few measured facts show what kind of thing goes wrong:
      </p>
      <ul>
        <li>
          Everyday apps have 46 to 198 accessibility-tree nodes, not the 500 to 5,000 the spec assumed. But
          reading them one property at a time takes 64 to 511 ms, 3 to 25 times the spec's figure.
        </li>
        <li>
          Every clickable GTK4 button sits deeper than the planned depth-8 cap, so that pruning would have cut
          all of them off.
        </li>
        <li>
          On Windows, a window on a hidden desktop can be photographed with PrintWindow, while Windows Graphics
          Capture refuses. Calculator and Settings cannot be driven through UI Automation while the screen is
          locked, minimised or on another desktop.
        </li>
      </ul>
      <p>
        None of these is about the model. They are about the layer under it. The accessibility tree is also
        what DreamDesk reads, through Linux's AT-SPI.
      </p>

      <h2>3. No LLM: DreamDesk</h2>
      <p>
        Part 1 asked a large model what to do at every step. DreamDesk asks the opposite question: can a small
        agent, dropped into an app it has never seen, learn how that app responds by clicking around, and then
        plan inside what it learned, with no LLM calls at all?
      </p>
      <p>
        The agent clicks randomly inside a sandbox, and a small ensemble learns to predict what changes on the
        screen after each action. It runs 153 times faster than real clicking, so practising in it is cheap.
        It predicts situations it never saw better than memorising does, in all 6 apps tested. It composes
        what it saw: on goals whose parts appeared separately but never together, planning in the model
        reached 19.8% against 4.2% for a map of memorised screens.
      </p>
      <Figure
        src="blog/dreamdesk/fig_combo.png"
        caption="Files app. On combo goals, screens whose parts were only ever seen apart, the map collapses and planning in the learned model holds up."
      />
      <p>
        But on ordinary tasks in new apps it only ties the map, and a policy trained entirely
        inside the model did not generalise to goals it never practised. Pre-training on other apps helps
        a lot (it beat training from scratch in 8 of 8 new apps), but 23 apps against 7 narrowly failed to
        be significantly better. Every test was written down before it ran.
      </p>
      <p>
        <Link to="/blog/dreamdesk">Full write-up: DreamDesk</Link>
      </p>

      <h2>The three side by side</h2>
      <Table
        head={['', 'grounder agent', 'DreamDesk']}
        rows={[
          ['who decides', 'Claude, every step', 'a planner in a learned model'],
          ['cost per step', 'an LLM call plus a GPU', 'a small network, no LLM'],
          ['needs to know the app first', 'no', 'yes: 100 to 1,000 clicks of exploring'],
          ['best result', '85.2% of clicks on target', '19.8% vs 4.2% on combo goals'],
          ['where it falls short', 'small targets, empty space', 'ties the map on ordinary tasks'],
        ]}
        caption="Part 2 is not in the table because it is not an agent. It is what both of them stand on."
      />

      <h2>Where this leaves me</h2>
      <p>
        The LLM agent is the one that does real tasks today. DreamDesk costs far less per step and its model
        learns real structure in apps, but so far that has not turned into better tasks than a plain map.
      </p>
    </BlogLayout>
  );
}
