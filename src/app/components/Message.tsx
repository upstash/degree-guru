import Markdown from 'markdown-to-jsx'

interface MessageProps {
  message: {
    role: string;
    content: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const containerClass = message.role === 'user' ? 'bg-[#e7e7e9] text-[##FAFAFA]' : 'bg-[#F8F8F8] text-[#43403B]';
  const iconClass = message.role === 'user' ? 'h-7 w-7' : 'h-6 w-6 mr-3 m-1'
  const icon = message.role === 'user' ? '/icon-user.png' : '/favicon.ico';

  return (
    <div className={`flex items-start p-2 border-b text-sm w-full ${containerClass}`}>
      <img src={icon} className={`${iconClass} mx-2`} alt="Icon" />
      <Markdown className={"pr-9 py-1 space-y-2"}>
        {message.content}
      </Markdown>
    </div>
  );
};

export default Message;
