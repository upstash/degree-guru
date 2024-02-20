
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
        content: "I am interested in aviation. What program can I study?"
      }}/>
      <Message message={{
        role: "bot",
        content: `
Hello,

At Stanford University, you can study aviation through the Department of Aeronautics and Astronautics. This department offers programs in aerospace engineering, aeronautics, and astronautics. Students learn flight basics through design in AA 100: Introduction to Aeronautics and Astronautics. The department has a rich history and highly decorated faculty, making it one of the top aerospace engineering departments in the nation. You can find more information about the programs and research collaborations on the department's official website: [Department of Aeronautics and Astronautics at Stanford University](https://aa.stanford.edu/).

If you have any further questions or need more details, feel free to ask.

Promoting knowledge for all, DegreeGuru
          `
      }}/>
    </div>
  )
}


export default Landing