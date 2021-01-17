import { UserType } from "../../helpers/constants";
import Login from "../common/Login";

const AdminLogin = () => <Login userType={UserType.admin} />

export default AdminLogin