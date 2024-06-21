import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  id: '0001',
  email: 'mdrabbybd474@gmail.com',
  password: config.super_admin_password,
  needChangePassword: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDelete: false,
};
const seedSuperAdmin = async () => {
  // when database is connect, we will check is there any user who is super admin
  const isSuperAdmin = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdmin) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
