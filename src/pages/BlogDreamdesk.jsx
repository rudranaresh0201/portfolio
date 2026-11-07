import BlogLayout from '../components/blog/BlogLayout';
import { Figure, Table, Video } from '../components/blog/Parts';

const F = 'blog/dreamdesk/';

export default function BlogDreamdesk() {
  return (
    <BlogLayout
      title="DreamDesk: an agent that learns a model of an app it has never seen"
      date="2026-11-08"
      tags={['world models', 'computer use', 'planning', 'pre-registered']}
    >
      <Video
        src="demos/dreamdesk.mp4"
        poster="demos/dreamdesk.jpg"
        caption="Real footage from the sandbox. The agent explores an app with random clicks, then gets a task it never saw. The map of memorised screens against planning in the learned model, and the results."
      />

      <p>
        Most computer-use agents today ask a large language model what to click, every step. I wanted to
        try the other end: a small agent dropped into an app it has never seen, with no LLM, no
        instructions and no human. It clicks around, learns a model of how the app responds, and then
        practises or plans inside that model before doing real tasks.
      </p>
      <p>
        This is the same idea as my <a href="#/blog/so101">SO-101 world model</a>, but where it matters
        more. For a robot arm someone can write a physics simulator. For an arbitrary app nobody can, so a
        learned model is the only simulator you will ever have.
      </p>
      <p>
        Short version: the model learns real structure in apps, beyond what it saw. Getting that to turn
        into better real behaviour is much harder, and most of my tests of that failed. Every experiment
        below was written down before it ran (what I would measure, and what would count as passing), and
        the results are reported whether they passed or not.
      </p>

      <h2>The setup</h2>
      <p>
        The agent works on real GNOME desktop apps (calculator, files, clocks, text editor, a log viewer
        and others) and on 21 small web apps I built. Each runs inside a sandbox, bubblewrap plus a private
        Xvfb screen, so random clicking cannot touch my real files or desktop. The agent does not see
        pixels. It reads the app's accessibility tree, the list of buttons, fields and labels the operating
        system exposes for screen readers, and its actions are pressing an element, focusing it, or typing
        one of a few short strings.
      </p>
      <p>Everything is compared against two baselines that turned out to be hard to beat:</p>
      <ul>
        <li><strong>Memo:</strong> predict that what happened last time in this exact situation will happen again.</li>
        <li><strong>The map:</strong> a graph of every screen seen while exploring, and a shortest-path search through it to reach a goal.</li>
      </ul>

      <h2>Exploring: random clicking was as good as being clever</h2>
      <p>
        I first tried a novelty-seeking explorer that, on each screen, picks the action it has tried least.
        Across 10 apps, 5 seeds each, it found more distinct screens than random clicking in 4 of 10 apps;
        the pass mark was 6. Random was higher in 3 and they tied in 3. So the rest of the project uses
        random clicking, 500 clicks per recording.
      </p>

      <h2>The world model learns more than it saw</h2>
      <p>
        The model is an ensemble of five small networks. Given the current screen (as a set of elements) and
        an action, each predicts which elements will disappear and which will appear. I score it with delta
        F1: how well the predicted changes match the real ones, 5 steps ahead, on situations it never saw
        while exploring. That last part is the point. On situations it did see, memorising is enough.
      </p>
      <Figure
        src={`${F}fig_wm.png`}
        caption="On the test recording, in situations the exploration never reached. The model beats memorising in all 6 apps with enough such situations, by +0.22 on average (interval +0.20 to +0.24). It runs 153 times faster than real clicking."
      />

      <h2>A policy trained in the dream: it learns, but only what it practised</h2>
      <p>
        Next I trained a policy entirely inside the model and tested it in the real apps on 294 goals (a
        goal is a screen to reach). On goals it had happened to practise in the dream it reached 86%,
        against 64% for random clicking. On goals it never practised: 23.4% against 23.5%. No difference.
        The pre-registered test needed both, so it failed. And the plain map beat it overall, 59.9% to 39.0%.
      </p>
      <p>
        One thing did work here. Before a single real attempt, the policy's success rate in the dream
        predicted which real tasks it would fail: AUROC 0.88 over 1,770 real runs, and for the same goal it
        picked the run that succeeds 92% of the time. The model is an honest judge even where the policy
        trained in it is weak.
      </p>

      <h2>Planning in the dream: combo goals</h2>
      <p>
        So I dropped the trained policy and planned directly in the model: search a few steps ahead for
        clicks that lead to the goal. The question was where planning beats the map. The map can only reach
        screens it has seen. So I made combo goals: screens whose parts each appeared while exploring, but
        never together on one screen. In the video's example the goal is a Files screen showing three
        elements at once, "Filter Search Results", "Grid View" and "Open Personal Folder": exploring had
        shown it each of them, never all three together.
      </p>
      <Figure
        src={`${F}fig_combo.png`}
        caption="Files app, sealed test recording. On combo goals the map collapses to 4.2% and planning in the dream reaches 19.8%, +11.5 points over the map (interval +5.5 to +18.8, pooled over both budgets)."
      />
      <p>
        That is the clearest sign that the model generalises: it composes pieces it saw separately. But
        against random clicking the gain on combo goals is +4.8 points with an interval from −2.4 to +12.7,
        so I cannot claim it beats random there, and with 300 clicks of exploring there were too few combo
        goals left to say much.
      </p>

      <h2>New apps: zero-shot fails, a prior helps</h2>
      <p>
        The real test of "drop it into an app it has never seen" is a model trained on other apps. Trained
        on 7 apps and used on 3 new ones with no further training, it beat Copy everywhere but memorising
        nowhere. Knowing this app mattered more than knowing apps in general.
      </p>
      <p>
        Fine-tuning that 7-app prior on the new app's first 100 to 300 clicks worked well: it beat a model
        trained from scratch on the same clicks in all 3 apps, with the worst fine-tuned seed above the best
        scratch seed, and at 300 clicks it also beat memorising. The prior was worth more than ten times the data: scratch at
        1,000 clicks was below fine-tuned at 100 in every app.
      </p>
      <p>
        Better predictions did not fully become better tasks, though. On those 3 new apps, planning with the
        fine-tuned model did real tasks about as well as the map (+2.2 points at 300 clicks, interval −5.1 to
        +9.1), better than random from 300 clicks on, and no better than random at 100.
      </p>

      <h2>Test 1: does a prior trained on more apps help?</h2>
      <p>
        If 7 apps help, do 15 or 23 help more? I trained priors on 7 desktop apps, on those plus 8 web apps,
        and on those plus 16 web apps, three seeds each, and fine-tuned each on 8 held-out apps (3 desktop, 5
        web) after 100 and after 300 clicks. 9 priors, 192 fine-tuned and scratch models, each scored once.
      </p>
      <Figure
        src={`${F}fig_scale.png`}
        caption="Every prior beats training from scratch in all 8 apps. On web apps more web apps in the prior keep helping; on desktop apps they don't, and disk-usage gets worse."
      />
      <Table
        head={['comparison, 100 clicks', 'difference', '95% interval']}
        rows={[
          ['23 apps vs 7, all 8 apps (the test)', '+0.052', '−0.010 to +0.119'],
          ['23 apps vs 7, 3 desktop apps', '−0.019', '−0.100 to +0.028'],
          ['23 apps vs 7, 5 web apps (not pre-registered)', '+0.094', '+0.029 to +0.173'],
          ['7-app prior vs scratch, all 8 apps', '+0.084', '+0.049 to +0.129'],
        ]}
        caption="Delta F1, 5 steps ahead, mean of 3 seeds, bootstrap over apps. The pre-registered test needed the lower bound above zero. It missed by 0.010."
      />
      <p>
        So the pre-registered answer is no, narrowly. The direction is positive, but one app (web-quiz,
        +0.238) carries much of it, and 8 apps make for a wide interval. What the per-app numbers suggest,
        and I am reading a subset here, not a tested hypothesis: more apps of the same kind help, and more
        apps of a different kind don't. Adding web apps to the prior helps new web apps, and does nothing
        for new desktop apps, which all got the same 7 desktop apps in every prior.
      </p>

      <h2>What this does not show</h2>
      <ul>
        <li>
          <strong>Better predictions are not better tasks yet.</strong> Across real-task tests, planning in the
          model ties the map. Only on combo goals does it clearly beat it.
        </li>
        <li>
          <strong>Policies trained in the dream don't generalise.</strong> 23.4% vs 23.5% on goals they never
          practised.
        </li>
        <li>
          <strong>It is small.</strong> 10 desktop apps, 21 web apps I wrote myself, short goals, and one model
          recipe that I did not tune for larger priors.
        </li>
        <li><strong>Test 1 measured predictions only.</strong> No real tasks were run with the larger priors.</li>
      </ul>

      <h2>What I learned</h2>
      <p>
        Writing the test down before running it changed what I believe. Without it, I would have reported
        the pilot's +17 points for planning over the map; the pre-registered run on fresh goals gave +2.2.
        And Test 1's +0.052 would have read as a win.
      </p>
      <p>
        Pick baselines that are hard to beat. Memorising and the map are simple and they won or tied more
        often than the learned model did. Any result that only beats random clicking says little.
      </p>
      <p>
        A world model can be the most useful part of an agent even when nothing built on it works yet: it
        predicts unseen situations, composes what it saw, and tells you in advance which tasks will fail.
      </p>

      <h2>Next</h2>
      <p>
        Test 1 says the next prior needs more desktop apps, not more web apps. After that, run real tasks with
        the larger priors, since predictions alone have not been enough so far.
      </p>
      <p>
        Code, pre-registrations and every results file are on{' '}
        <a href="https://github.com/rudranaresh0201/dreamdesk" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>

      <h2>References</h2>
      <ul>
        <li>
          Ha, Schmidhuber. <a href="https://worldmodels.github.io" target="_blank" rel="noopener noreferrer">World Models</a>. 2018.
        </li>
        <li>
          Hafner et al. <a href="https://arxiv.org/abs/2301.04104" target="_blank" rel="noopener noreferrer">Mastering Diverse Domains through World Models (DreamerV3)</a>. 2023.
        </li>
        <li>
          Janner et al. <a href="https://arxiv.org/abs/1906.08253" target="_blank" rel="noopener noreferrer">When to Trust Your Model: Model-Based Policy Optimization</a>. NeurIPS 2019.
        </li>
        <li>
          Ecoffet et al. <a href="https://arxiv.org/abs/1901.10995" target="_blank" rel="noopener noreferrer">Go-Explore</a>. 2019. A map of visited states, closest in spirit to my map baseline.
        </li>
      </ul>
    </BlogLayout>
  );
}
