/*
 * DRAFT, not routed and not linked anywhere yet. Publish after Test 1 (does a prior trained on more
 * apps give a new app a better dream?) by adding a route in App.jsx and an entry in Writing.jsx.
 *
 * Same shape as the SO-101 post: hook video, the task, the baseline, the world model, what failed,
 * what worked, what it does not show, references. Numbers below are from
 * research/dreamdesk/experiments/*_results.md as of 2026-11-08; [TEST 1] marks what is still missing.
 */
import BlogLayout from '../components/blog/BlogLayout';
import { Table, Video } from '../components/blog/Parts';

export default function BlogDreamdesk() {
  return (
    <BlogLayout title="DreamDesk: practising inside a model of an app it has never seen" date="draft" tags={['world models', 'computer use', 'planning']}>
      <Video src="demos/dreamdesk.mp4" poster="demos/dreamdesk.jpg" caption="[final video after Test 1]" />

      <h2>The task</h2>
      <p>
        [An agent is dropped into a desktop or web app it has never seen. No LLM, no instructions. It reads
        the app through the accessibility tree, inside a sandbox (bubblewrap, a private Xvfb screen), explores
        with random clicks, and learns a world model: next screen state from the current state and a click.
        Then it plans inside that model.]
      </p>

      <h2>Baselines</h2>
      <p>[Random clicking. The map: replay a graph of screens memorised while exploring.]</p>

      <h2>Does the model learn the app, or memorise it?</h2>
      <Table
        head={['result', 'value']}
        rows={[
          ['5-step prediction vs memorising', 'better on 6 / 6 apps'],
          ['speed', '153x real time'],
        ]}
      />

      <h2>Combo goals: where the map collapses</h2>
      <Table
        head={['budget, goal kind', 'random', 'map', 'dream planner']}
        rows={[
          ['100 clicks, seen', '26.7%', '39.4%', '47.2%'],
          ['100 clicks, combo', '11.5%', '4.2%', '19.8%'],
          ['300 clicks, seen', '27.8%', '47.2%', '46.7%'],
          ['300 clicks, combo', '5.8%', '0.0%', '5.8%'],
        ]}
        caption="Combo goals: screens whose parts were each seen while exploring, never together."
      />

      <h2>The dream knows when it will fail</h2>
      <p>[AUROC 0.88 over 1,770 real runs, before any real attempt; 92% of within-goal pairs ranked correctly.]</p>

      <h2>New apps</h2>
      <p>
        [Zero-shot transfer failed. A 7-app prior fine-tuned on 100 to 300 clicks beats training from scratch,
        and matches the map on real tasks. [TEST 1]: priors trained on 7, 15 and 23 apps.]
      </p>

      <h2>What this does not show</h2>
      <p>
        [Dream vs random on combo goals is +4.8 points, inside the noise. A policy trained in the dream did
        not reach goals it never practised (23% vs 24%). The model generalises better than what is built on it.]
      </p>

      <h2>References</h2>
      <p>[World Models; Dreamer; MBPO; Go-Explore for exploration; prior computer-use work.]</p>
    </BlogLayout>
  );
}
