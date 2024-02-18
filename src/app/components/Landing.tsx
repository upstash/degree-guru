
import Message from "./Message"

const Landing = () => {
  return (
    <div>
      <div className="text-sm p-2 px-5 border-b bg-[#F8F8F8] text-[#43403B] space-y-2">
        <p>
          Welcome to DegreeGuru, your ultimate companion in navigating the academic landscapes of MIT, Harvard, and Stanford.
        </p>
        <h2>Here&apos;s how it works:</h2>
        <ol>
          <li>
            <strong>1. Select Your Institution:</strong> At the top of the page, you&apos;ll find a selection bar where you can choose the university you&apos;re interested in.
          </li>
          <li>
            <strong>2. Ask Away:</strong> Once you&apos;ve selected your preferred university, simply type your question into the text field at the bottom of the page.
          </li>
          <li>
            <strong>3. Get Informed:</strong> Hit enter or click the Send button, and watch as DegreeGuru works its magic.
          </li>
        </ol>
        <p>
        Ready to dive in? See an example question and answer below to get a taste of what DegreeGuru can offer.
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
    </div>
  )
}


export default Landing