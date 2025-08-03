const LoadingSpinner = ({ height }: { height: string }) => {
  return (
    <div className={`h-[${height}px] w-full flex items-center justify-center`}>
      <div className="spinner" />
    </div>
  );
};
export default LoadingSpinner;
