import BlogLayout from '../components/blog/BlogLayout';
import CodeBlock from '../components/blog/CodeBlock';
import { Figure, Table, Video } from '../components/blog/Parts';

const F = 'blog/so101/';

export default function BlogSo101() {
  return (
    <BlogLayout
      title="Training a robot arm inside a world model, and catching it cheating"
      date="2026-11-08"
      tags={['reinforcement learning', 'world models', 'MuJoCo', 'SAC']}
    >
      <Video
        src="demos/so101.mp4"
        poster="demos/so101.jpg"
        caption="First, the arm trained normally in MuJoCo. Then the cheat: on the left, what the world model predicts (tinted blue); on the right, what MuJoCo actually does. Same policy, same box. Last, a policy trained mostly in the model, after the fixes, picking for real."
      />

      <p>
        In the middle clip, the world model is sure the arm grabbed the box and lifted it 49 cm. In MuJoCo
        the claw never got closer than 17 cm and the box never moved. The policy had learned to score
        points in the model's version of physics, not in the real one.
      </p>
      <p>
        This post is how I got there, why it happened, and what it took to get a policy trained mostly
        inside the model to pick the box for real. That last part works on 2 of 3 seeds and it is
        unstable, and I will show exactly where.
      </p>

      <h2>The task</h2>
      <p>
        The robot is an SO-101, a cheap open-source arm with five joints and a gripper. I use the MuJoCo
        model from DeepMind's MuJoCo Menagerie. A 3 cm box is placed at random, 15 to 30 cm in front of
        the arm and up to 12 cm to either side. Every step, the policy sees 41 numbers (joint angles and
        speeds, where the claw and box are, which way the gripper points, and one contact flag per jaw)
        and outputs six small changes to the joint targets. A step is 0.05 s and an episode is 150 steps,
        7.5 seconds. Success means the box is held and lifted at least 5 cm.
      </p>
      <p>
        I don't have a physical arm. Here MuJoCo plays the part of reality, which turns out to be useful:
        I can measure exactly how wrong the learned model is, at every step.
      </p>

      <h2>Step 1: SAC learns to pick the box</h2>
      <p>
        The learner is SAC (soft actor-critic). An actor picks actions; two critics estimate how good an
        action is, and the smaller of the two estimates is used, so the policy does not chase a critic's
        overestimate. An entropy bonus keeps the actions varied early on, which is how it explores.
      </p>
      <p>
        My first reward paid for reaching the box, pointing the gripper down, and a bonus while
        "grasping", which I defined as both jaws touching the box. After 200k steps the arm touched the
        box in every test episode and lifted it 0.4 cm. Success: 0%. Touching was paid, touching is easier
        than lifting, so the policy touched. This is specification gaming in its most ordinary form: the
        reward said one thing and I meant another.
      </p>
      <p>
        The fix was to make the reward say what I meant. A grasp now needs both jaws touching and the
        gripper actually squeezing: the gripper joint is held more than 0.05 rad wider than the motor is
        commanding, which only happens when something is between the jaws. And lifting became worth far
        more than holding:
      </p>
      <CodeBlock label="reward per step">{`reward = reach + 0.5 * down + grasped * (0.5 + 6 * lift)
# reach: 1 - tanh(5 * claw-to-box distance)    lift: box height / 8 cm, capped at 1`}</CodeBlock>
      <Figure
        src={`${F}fig_baseline.png`}
        caption="Pick success on 20 box positions the policy never trained on, every 25k steps. With the first reward the arm touches the box but never lifts it. With the second it reaches 100% by 400k steps. A second seed also reached 100%."
      />
      <p>
        That is the baseline: plain SAC, every step simulated by MuJoCo, about 400k steps to solve the task.
      </p>

      <h2>Step 2: a world model of the arm</h2>
      <p>
        A world model is a learned function: given the current state and an action, predict the next
        state. If it is accurate enough, a policy can practise on predicted steps instead of real ones.
        On a real robot that matters, because every real step costs time and wear. Here MuJoCo stands in
        for the real robot, and the world model stands in for what you would learn from it.
      </p>
      <p>
        I recorded 172,500 steps from a mix of policies: random actions, an early policy, and the solved
        policy with different amounts of noise added. The mix is deliberate. A model that has only seen
        clean successes knows nothing about missing the box or knocking it.
      </p>
      <p>
        The model is an ensemble of five small networks (4 layers of 256 units), each trained on its own
        resample of the data, each predicting how the 41 numbers change. Their average is the prediction
        and their disagreement is a rough measure of how unsure the model is. There is no learned reward:
        the reward is computed from the predicted state with the same formula as above, so any gap
        between the model and reality comes from the predicted physics alone.
      </p>
      <Table
        head={['steps predicted ahead', '1', '5', '20', '50']}
        rows={[
          ['claw position error', '0.1 cm', '0.5 cm', '0.7 cm', '1.5 cm'],
          ['box position error', '0.0 cm', '0.0 cm', '0.4 cm', '1.8 cm'],
        ]}
        caption="Open-loop error on held-out episodes: the model is fed real actions and its own predictions, with no correction from reality. The contact flags were the worst-predicted part, which matters later."
      />
      <p>
        To train in it I followed MBPO (Janner et al., 2019): start short imagined rollouts from real
        states, use a random ensemble member at each step, and let SAC learn from those rollouts. Every
        25k steps I took the policy out of the model and tested it in MuJoCo on the same 20 boxes as the
        baseline.
      </p>

      <h2>Wrong turn 1: short dreams never learned</h2>
      <p>
        MBPO keeps rollouts short so prediction errors do not pile up. I used 5 steps. After 300k steps
        the policy had never touched the box in MuJoCo. Adding a penalty for model disagreement (MOPO,
        Yu et al., 2020) did not help, and neither did feeding real episodes back into the model.
      </p>
      <p>
        The failure looked like exploitation. The policy slammed most joints to their limits (58% of its
        actions were saturated) and drove the arm into states the model had never seen, where its errors
        were 10 to 100 times larger and the five networks disagreed about 15 times more. But a simple
        check did not fit that story: from real starting states, five imagined steps matched reality
        closely (claw-to-box distance 24.8 cm imagined, 25.0 cm real). The policy was not learning to
        reach even inside the model.
      </p>
      <p>
        So I ran the swap test: the identical recipe, 5-step episodes starting from the same recorded
        states, but with MuJoCo instead of the model. If it learned, the model was to blame. It did not
        learn either. Then I changed only the episode length:
      </p>
      <Figure
        src={`${F}fig_horizon.png`}
        caption="The short-episode recipe in real MuJoCo, one seed per length. 5 steps never learns. 20 steps is slow (85% at 300k). 50 steps is fast (95%). Full 150-step episodes from recorded starts reach 70 to 90%."
      />
      <p>
        The model was mostly innocent. With 5-step episodes, the payoff for lifting arrives too late to be
        reached inside one episode, and has to be passed back through the critic's own estimates across
        many separate short episodes. My guess is that this chain is too fragile to carry it; I have not
        proven the mechanism. MBPO was shown on locomotion, where reward arrives every step. A pick task
        pays off late, and the short horizon that protects you from model error also hides the reward.
      </p>

      <h2>Wrong turn 2: long dreams, and the cheat</h2>
      <p>
        With 50-step rollouts in the model, things changed within 100k steps. The model reported the box
        grasped in every test episode and lifted 50 to 64 cm. In MuJoCo: 0%.
      </p>
      <Figure
        src={`${F}fig_exploit.png`}
        caption="Median best lift over 20 test boxes. The model's version of the episode against MuJoCo's, for the same policy and the same boxes."
      />
      <p>Tracing one episode shows how.</p>
      <Figure
        src={`${F}fig_cheat.png`}
        caption="The first test box, step by step. The shaded band is where the model starts counting a grasp. The model's claw stops about 17 cm from the box; its contact signal for both jaws jumps from 0 to 0.9 anyway, and from then on its box rises. In MuJoCo the claw backs off to 22 cm and the box stays put."
      />
      <p>
        The contact flags are 0 or 1 in reality, but the model predicts them as ordinary numbers, and the
        reward counts a jaw as touching above 0.5. They were also the hardest thing for the model to
        predict. Far from the box, in a region with little data, the policy found actions that push both
        predicted flags over the line while the gripper is squeezing. My reading of what follows: in the
        training data, both jaws touching and squeezing always came with the box moving with the claw,
        so once the model believes in the grasp, it moves the box too. The policy did not need to
        understand any of this. SAC just finds the actions where predicted reward is highest, and these
        were they.
      </p>
      <p>
        Ha and Schmidhuber reported the same kind of thing in World Models (2018): an agent trained in its
        learned model of VizDoom found a way to stop the monsters from firing, which only worked in the
        model. They made the model noisier so the trick stopped paying.
      </p>
      <p>
        I tried the obvious cut first: end an imagined rollout once the five networks disagree too much.
        A strict cutoff shrank rollouts to about 8 steps, which put me back in the short-horizon failure.
        A looser one still let the policy cheat (imagined lifts up to 98 cm).
      </p>

      <h2>Closing the loophole</h2>
      <p>Three changes, used together:</p>
      <ol>
        <li>
          <strong>A trickle of real data.</strong> Every 5k imagined steps, the current policy runs 4 real
          episodes (600 real steps). They go into the model's training data, with half of each update
          batch drawn from these recent episodes so they actually move it, and into SAC's replay buffer,
          so the critic also sees true rewards. Half the imagined rollouts start from the policy's own
          real states. On its own this shrank the cheat (imagined lifts under 9 cm) but real success
          stayed at 0%.
        </li>
        <li>
          <strong>A penalty for uncertainty.</strong> Reward minus the ensemble's disagreement, as in MOPO.
        </li>
        <li>
          <strong>A rule from physics.</strong> A grasp only counts if the claw is within 6 cm of the box.
          Across 91,000 real grasps in the data, the largest distance was 5.1 cm, so this rule changes no
          real reward at all. It only removes grasps that cannot happen.
        </li>
      </ol>
      <Figure
        src={`${F}fig_fixes.png`}
        caption="Real pick success of policies trained mostly in the model, tested in MuJoCo every 25k imagined steps."
      />
      <Table
        head={['run', 'best real success', 'at 300k']}
        rows={[
          ['all three fixes, seed 0', '30%', '0%'],
          ['all three fixes, seed 1', '60%', '60%'],
          ['all three fixes, seed 2', '5%', '0%'],
          ['without the 6 cm rule', '10%', '10%'],
          ['plain SAC in MuJoCo (baseline)', '100%', '100%'],
        ]}
        caption="Each fixed run used about 36,000 real steps in the loop, on top of the 172,500 recorded steps the model started from."
      />
      <p>
        These are the first policies trained mostly inside the model that pick the box in MuJoCo. Without
        the 6 cm rule the loop and penalty alone stay near zero.
      </p>

      <h2>What this does not show</h2>
      <ul>
        <li>
          <strong>It is not stable.</strong> Seed 1 went 50%, then down to 15%, then up to 60%. My
          hypothesis is that the penalty makes the model too pessimistic: at 200k steps seed 1 succeeded
          15% of the time in MuJoCo but 0% in the model, so training pushes it away from a strategy that
          works. I have not tested this.
        </li>
        <li><strong>It depends on the seed.</strong> One of three runs never picks.</li>
        <li>
          <strong>It does not show that a world model saves real steps.</strong> The model's data came from
          policies that had already needed hundreds of thousands of real steps to train. A fair test needs
          a model built from random play only, with every real step counted, against SAC's roughly 400k.
        </li>
        <li>
          <strong>It is small.</strong> One task, a state vector rather than camera images, and one seed per
          horizon in the sweep.
        </li>
      </ul>

      <h2>What I would tell myself at the start</h2>
      <p>
        Test the recipe in the real environment before blaming the model. The swap test took one night
        and turned "the model is being exploited" into "the horizon is too short", which was the actual
        problem at that point.
      </p>
      <p>
        Watch what the model believes, not only the reward. Drawing the imagined episode next to the real
        one found the cheat within minutes; the reward curves alone just looked like progress.
      </p>
      <p>
        Count real steps from day one, honestly, including the data the model was built from. It is easy to
        report a big saving that is not there.
      </p>

      <h2>Next</h2>
      <p>
        The fair test: a model built from random play alone, every real step counted, against plain SAC.
        After that, learning from camera images instead of a hand-picked state, which is where world models
        like Dreamer (Hafner et al.) earn their keep.
      </p>
      <p>
        The code, logs-to-figures script and the video script are on{' '}
        <a href="https://github.com/rudranaresh0201/so101-world-model" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>

      <h2>References</h2>
      <ul>
        <li>
          Janner, Fu, Zhang, Levine. <a href="https://arxiv.org/abs/1906.08253" target="_blank" rel="noopener noreferrer">When to Trust Your Model: Model-Based Policy Optimization</a>. NeurIPS 2019.
        </li>
        <li>
          Yu et al. <a href="https://arxiv.org/abs/2005.13239" target="_blank" rel="noopener noreferrer">MOPO: Model-based Offline Policy Optimization</a>. NeurIPS 2020.
        </li>
        <li>
          Ha, Schmidhuber. <a href="https://worldmodels.github.io" target="_blank" rel="noopener noreferrer">World Models</a>. 2018.
        </li>
        <li>
          Haarnoja et al. <a href="https://arxiv.org/abs/1801.01290" target="_blank" rel="noopener noreferrer">Soft Actor-Critic</a>. ICML 2018.
        </li>
        <li>
          Krakovna et al. <a href="https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/" target="_blank" rel="noopener noreferrer">Specification gaming: the flip side of AI ingenuity</a>. DeepMind, 2020.
        </li>
        <li>
          Hafner et al. <a href="https://arxiv.org/abs/2301.04104" target="_blank" rel="noopener noreferrer">Mastering Diverse Domains through World Models (DreamerV3)</a>. 2023.
        </li>
        <li>
          <a href="https://github.com/google-deepmind/mujoco_menagerie" target="_blank" rel="noopener noreferrer">MuJoCo Menagerie</a>, for the SO-101 model.
        </li>
      </ul>
    </BlogLayout>
  );
}
