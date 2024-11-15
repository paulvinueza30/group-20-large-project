type ErrorFeedbackProps = {
  message: string;
};

const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ message }) => (
  <div className="fixed bottom-10 right-10 border-b-4 border-red-500 bg-slate-100 h-32 flex p-10 rounded-xl">
    <h1 className="text-2xl font-semibold self-center">
      Feedback error: {message}
    </h1>
  </div>
);

export default ErrorFeedback;
