import PageIntro from '../components/PageIntro';
import Writing from '../components/Writing';

export default function WritingPage() {
  return (
    <>
      <PageIntro
        index={3}
        total={3}
        eyebrow="writing"
        title="Long form, when it earns the space"
        lede="Mostly write-ups of something that took a while to understand, with the wrong turns left in."
      />
      <Writing />
    </>
  );
}
