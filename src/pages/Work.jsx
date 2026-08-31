import PageIntro from '../components/PageIntro';
import Experience from '../components/Experience';

export default function Work() {
  return (
    <>
      <PageIntro
        index={1}
        total={3}
        eyebrow="work"
        title="Three internships, the first still going"
        lede="Ops automation at a sports brand, testing and backend for an Australian client, and production RAG on a live document product. Written out in full, because the interesting part of each was a specific thing that broke."
      />
      <Experience />
    </>
  );
}
