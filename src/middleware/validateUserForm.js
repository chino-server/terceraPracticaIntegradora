export const validateUserForm = (req, res, next) => {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    next();
  };


