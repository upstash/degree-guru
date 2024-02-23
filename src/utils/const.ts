import { Message } from "ai/react";

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "0",
    role: "system",
    content: `**Welcome to DegreeGuru**, your ultimate companion in navigating the academic landscape of Stanford.

Here&apos;s how it works:

1. **Ask Your Question:** Simply type your question into the text field at the bottom of the page.

2. **Get Informed:** Hit enter or click the Send button, and watch as DegreeGuru works its magic.

Ready to dive in? See an example question and answer below to get a taste of what DegreeGuru can offer.`,
  },
  {
    id: "1",
    role: "user",
    content: "I am interested in aviation. What program can I study?",
  },
  {
    id: "2",
    role: "system",
    content: `Hello,
        
At Stanford University, you can study aviation through the Department of Aeronautics and Astronautics. This department offers programs in aerospace engineering, aeronautics, and astronautics. Students learn flight basics through design in AA 100: Introduction to Aeronautics and Astronautics. The department has a rich history and highly decorated faculty, making it one of the top aerospace engineering departments in the nation. You can find more information about the programs and research collaborations on the department's official website: [Department of Aeronautics and Astronautics at Stanford University](https://aa.stanford.edu/).

If you have any further questions or need more details, feel free to ask.

Promoting knowledge for all, DegreeGuru`,
  },
];
