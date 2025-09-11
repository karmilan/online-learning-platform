import NavBar from "./NavBar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default PublicLayout;
