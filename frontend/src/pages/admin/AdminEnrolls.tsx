import AddEnroll from "../../components/AddEnroll";
import ListEnrolls from "../../components/admin/ListEnrolls";

const AdminEnrolls = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <AddEnroll />
        <ListEnrolls />
      </div>
    </>
  );
};

export default AdminEnrolls;
