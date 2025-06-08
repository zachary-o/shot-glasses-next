const PageTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="text-[42px] font-bold text-[var(--color-black)] mb-4 md:mb-10">
      {text}
    </h2>
  );
};

export default PageTitle;
