import ProfileCard from "./ProfileCard";
import About from "./About";
import Skill from "./Skill";
import Services from "./Services";
import Projects from "./Projects";
function Body({ typedText }) {
  return (
    <div>
      <ProfileCard typedText={typedText} />
      <About />
      <Skill />
      <Services />
      <Projects />
    </div>
  );
}

export default Body;
