const { Admin } = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
// JWT_SECRET="chave_secreta_da_sapataria" -- lá no arquivo .env


exports.getUsers = async (req, res) => {
  try {
    const todosUsers = await Admin.findMany();
    res.status(200).json(todosUsers);
  } catch (error) {
    console.error("erro ao buscar os usuários:", error);
    res.status(500).json({ error: "Erro ao buscar os usuários" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userById = await Admin.findUnique({
      where: { id: String(id) },
      //coloquei aqui como string, por conta do UUID
    });
    if (userById) {
      res.status(200).json(userById);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("erro ao buscar o usuário:", error);
    res.status(500).json({ error: "Erro ao buscar o usuário" });
  }
};

//tinha tentado fazer a função com req, res, mas não deu certo, fiz uma chamada de função assíncrona normal.
const verifyUserByEmail = async (email) => {
  try {
    const userByEmail = await Admin.findUnique({
      where: {email},
    });
    if (userByEmail) {
        return {status: 200, message: "Usuário encontrado", data: userByEmail};
    } else {
        return {status: 404, message: "Usuário não encontrado"};
    }
  } catch (error) {
    console.error("erro ao buscar o usuário:", error);
    return {status: 500, message: "Erro ao buscar o usuário"};
  } 
//   finally {
//     await prisma.$disconnect();
//   };
};

exports.createUser = async (req, res) => {
  const { name, email, password, image } = req.body;

  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds)
      const novoUser = await Admin.create({
        data: {
          name,
          email,
          password: hashPassword,
          image,
        },
      });
      res.status(201).json({"O usuário foi criado!": novoUser});
    } catch (error) {
    console.error("erro ao adicionar usuário:", error);
    res.status(400).json({ error: "Erro ao adicionar usuário" });
  }
};  

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, image } = req.body;
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const userEditado = await Admin.update({
      where: { id: String(id) },
      data: {
        name,
        email,
        password: hashPassword,
        image,
      },
    });
    res.status(200).json(userEditado);
    console.log(userEditado);
  } catch (error) {
    console.log
    console.error("erro ao atualizar o usuário:", error);
    res.status(404).json({ error: "Erro ao atualizar o usuário" });
  }
};

exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        await Admin.delete({
            where: {id: String(id)},
        });
        res.status(204).send();
    } catch (error) {
        console.error('erro ao deletar o usuário:', error);
        res.status(404).json({error: 'Usuário não encontrado'})
    }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!req.body || !email || !password) {
    res.status(404).json({ error: "Invalid request body" });
  }
  try {
    const verifyUser = await verifyUserByEmail(email);
    // console.log(verifyUser.data.password);

    const verifyPassword = await bcrypt.compare(
      password,
      verifyUser.data.password
    );
    console.log("Senha verificada", verifyPassword);
    // console.log(checarSenha);
    // await bcrypt.compare(senha_hash, verifyUser[0].hashPassword)
    if (verifyPassword) {
      const user = verifyUser.data;

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      // console.log(payload);

      const token = jwt.sign(payload, jwtSecret, { expiresIn: "2h" });
      // console.log(token)

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
        res.status(404).json({ error: "Usuário ou senha inválidos, verifique as informações e tente novamente mais tarde" });
    }
  } catch (error) {
    console.error("erro ao fazer login:", error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};
