import ProfileCard from "./ProfileCard";
import About from "./About";
import Skill from "./Skill";
import Services from "./Services";
import Projects from "./Projects";
function Body({ typedText, scrollReveal, buttonAction }) {
  return (
    <div>
      <ProfileCard typedText={typedText} scrollReveal={scrollReveal} buttonAction={buttonAction} />
      <About scrollReveal={scrollReveal} buttonAction={buttonAction} />
      <Skill scrollReveal={scrollReveal} />
      <Services scrollReveal={scrollReveal} />
      <Projects scrollReveal={scrollReveal} />
    </div>
  );
}

export default Body;
