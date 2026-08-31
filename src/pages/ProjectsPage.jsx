import PageIntro from '../components/PageIntro';
import Projects from '../components/Projects';

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        index={2}
        total={3}
        eyebrow="projects"
        title="Things I built, and where each one falls short"
        lede="Five of them. The numbers are whatever the benchmarks actually print, and every one carries a note saying what it does not do yet, because a project page with no gaps in it is not telling you the truth."
      />
      <Projects />
    </>
  );
}
