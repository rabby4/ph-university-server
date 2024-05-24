export type TUser = {
  id: string;
  password: string;
  needChangePassword: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDelete: boolean;
};
