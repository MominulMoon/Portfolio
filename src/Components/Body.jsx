import ProfileCard from "./ProfileCard";
import About from "./About";
import Skill from "./Skill";
import Stats from "./Stats";
import Services from "./Services";
import Projects from "./Projects";
/**
 * Body
 * Acts as an orchestrator for the main portfolio sections.
 * Passes the `scrollReveal` and `buttonAction` hooks down sequentially to all
 * inner child components so they can register their own animations and events.
 */
function Body({ typedText, scrollReveal, buttonAction }) {
  return (
    <div className="body-3d-space">
      {/* Hero + introduction */}
      <ProfileCard
        typedText={typedText}
        scrollReveal={scrollReveal}
        buttonAction={buttonAction}
      />
      {/* Core portfolio sections */}
      <About scrollReveal={scrollReveal} buttonAction={buttonAction} />
      <Skill scrollReveal={scrollReveal} />
      <Stats scrollReveal={scrollReveal} />
      <Services scrollReveal={scrollReveal} />
      <Projects scrollReveal={scrollReveal} />
    </div>
  );
}

export default Body;
