import { UserType } from "../../helpers/constants";
import Register from "../common/Register";

const AdminRegister = () => <Register userType={UserType.admin} />

export default AdminRegister