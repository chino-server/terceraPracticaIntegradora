import UsersDB_DTO from "../DAL/DTOs/usersDB.dto.js";

export const getCurrentSession = (req, res) => {
  if (!req.user) {
    res.status(401).json("Session expired");
    return;
  }
  const userLogin = new UsersDB_DTO(req.user);
  res.json(userLogin);
};
