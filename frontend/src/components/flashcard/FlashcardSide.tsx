import React from "react";

type FlashcardSideProps = {
  content: string | undefined;
};

const FlashcardSide: React.FC<FlashcardSideProps> = ({ content }) => {
  return (
    <div className="p-20 bg-slate-100 dark:bg-dark-primary rounded-xl min-h-96 min-w-full flex justify-center items-center dark:text-white">
      <h1 className="text-5xl text-center">{content}</h1>
    </div>
  );
};

export default FlashcardSide;
