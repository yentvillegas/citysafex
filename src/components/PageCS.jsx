function PageCS({children,...params}) {
    return (
    <div className="flex flex-col items-center justify-center" {...params}>
      {children}
    </div>
  );
}
export default PageCS