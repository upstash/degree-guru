
import Message from "./Message"

const Landing = () => {
  return (
    <div>
      <div className="p-2 px-5 border-b bg-[#F8F8F8] text-[#43403B] space-y-4">
        <p className="text-xl">Welcome to DegreeGuru – Your Gateway to Universities!</p>
        <p>
          Are you eager to explore the realms of higher education at some of the world&apos;s most prestigious institutions? Look no further! Welcome to DegreeGuru, your ultimate companion in navigating the academic landscapes of MIT, Harvard, and Stanford.
        </p>
        <h2>Here&apos;s how it works:</h2>
        <ol>
          <li>
            <strong>1. Select Your Institution:</strong> At the top of the page, you&apos;ll find a selection bar where you can choose the university you&apos;re interested in – whether it&apos;s the groundbreaking innovation hub of MIT, the historic corridors of Harvard, or the cutting-edge research powerhouse of Stanford.
          </li>
          <li>
            <strong>2. Ask Away:</strong> Once you&apos;ve selected your preferred university, simply type your question into the text field at the bottom of the page. Whether you&apos;re seeking information about programs, admissions, campus life, or anything else, DegreeGuru is here to assist you.
          </li>
          <li>
            <strong>3. Get Informed:</strong> Hit enter or click the Send button, and watch as DegreeGuru works its magic. Our bot scours the depths of the university&apos;s website to find the most relevant and up-to-date information, delivering it straight to you in a flash.
          </li>
        </ol>
        <p>
        Ready to dive in? Try out some of the example questions and answers below to get a taste of what DegreeGuru can offer. Begin your quest for knowledge today with DegreeGuru, because your academic aspirations deserve the best!
        </p>
      </div>
      <Message message={{
        role: "user",
        content: "What are some of the undergraduate programs available?"
      }}/>
      <Message message={{
        role: "bot",
        content: `
Hello! At Stanford University, there are several undergraduate programs available. Three of Stanford’s seven schools award undergraduate degrees: Humanities and Sciences; Engineering; and the Stanford Doerr School of Sustainability. Undergraduates complete at least 180 units, including major courses, writing and rhetoric requirements, and one year of a foreign language. All undergraduates also complete their Ways of Thinking / Ways of Doing general education requirements: 11 courses in 8 interdisciplinary Ways categories. You can find more information about undergraduate programs at Stanford University [here](https://facts.stanford.edu/academics/undergraduate/).
          
If you have any further questions or need more information, feel free to ask!
          `
      }}/>
      <Message message={{
        role: "user",
        content: "What can I study as a high school student with an interest in planes?"
      }}/>
      <Message message={{
        role: "bot",
        content: `
Hello,

As a high school student with an interest in planes, you have several study options at Stanford University. You can pursue Aeronautics and Astronautics as a major or minor, which emphasizes structural, aerodynamic, propulsion, and guidance and control problems of aircraft and spacecraft. Freshmen and sophomores are encouraged to follow the course plan prescribed in the [SoE Undergraduate Handbook](http://ughb.stanford.edu/) and take appropriate math, physics, and computer science courses. Additionally, you can explore the Aerospace Physics program, which involves developing a deep background in physics and mathematics and applying it to understanding the space environment and the dynamics, design, and control of space vehicles.

For more details, you can visit the following links:

[Aeronautics and Astronautics Undergraduate Major and Minor](https://aa.stanford.edu/academics-admissions/undergraduate-major-minor)

[Aerospace Physics Program](https://ughb.stanford.edu/majors-minors/engineering-physics-program)

I hope this information helps you explore your academic interests further.

Promoting knowledge, DegreeGuru
          `
      }}/>
    </div>
  )
}


export default Landing