const { Category, Organization, Task, User, UserOrg } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { createToken } = require("../helper/jwt");
const { compare } = require("../helper/bcrypt");

class CommandCenter {
  static async register(req, res, next) {
    let { name, email, password } = req.body;
    try {
      const user = await User.create({ name, email, password });
      res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    let { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        if (compare(password, user.password)) {
          const access_token = createToken({ id: user.id, email: user.email });
          res.status(200).json({
            msg: "User logged in successfully",
            access_token,
            name: user.name,
            id: user.id,
          });
        } else throw { status: 400, msg: "Wrong email/password" };
      } else throw { status: 400, msg: "User not found" };
    } catch (err) {
      next(err);
    }
  }

  static googleLogin(req, res, next) {
    const { id_token, CLIENT_ID } = req.body;
    const client = new OAuth2Client(CLIENT_ID);
    let newName = null,
      newEmail = null;

    client
      .verifyIdToken({
        idToken: id_token,
        audience: CLIENT_ID,
      })
      .then((ticket) => {
        const { name, email } = ticket.getPayload();
        newName = name;
        newEmail = email;
        return User.findOne({
          where: {
            email,
          },
        });
      })
      .then((data) => {
        if (data) {
          return data;
        } else {
          const password = Math.ceil(Math.random() * 1000) + "passwordrandom";
          return User.create({ username: newName, email: newEmail, password });
        }
      })
      .then((data) => {
        const access_token = createToken({ id: data.id, email: data.email });
        res
          .status(200)
          .json({ access_token, id: data.id, name: data.username });
      })
      .catch(next);
  }

  static async seeUser(req, res, next) {
    let { name } = req.params;
    try {
      const user = await User.findOne({ where: { name } });
      res.status(200).json({ user, msg: "User found" });
    } catch (err) {
      next(err);
    }
  }

  //CATEGORY
  static async getCategories(req, res, next) {
    let { id } = req.params;
    try {
      const categories = await Category.findAll({
        where: { organization_id: id },
      });
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    let { org_id } = req.params;
    let { name } = req.body;
    try {
      const category = await Category.create({
        name,
        organization_id: org_id,
      });
      res.status(201).json({ msg: "Category created successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    let { name } = req.params;
    let { name2 } = req.body;
    try {
      let edited = {
        name: name2,
      };
      const category = await Category.update(edited, {
        where: {
          name,
        },
      });
      res.status(200).json({ msg: "Category edited successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    let { name, org_id } = req.params;
    try {
      const deleted = await Category.destroy({
        where: {
          name,
          organization_id: org_id,
        },
      });
      res.status(200).json({ msg: "Category deleted successfully}" });
    } catch (err) {
      next(err);
    }
  }

  //TASK
  static async getTask(req, res, next) {
    let { id } = req.params;
    try {
      const task = await Task.findAll({ where: { user_id: id } });
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  static async addTask(req, res, next) {
    let { name, user_id, category_id } = req.body;
    try {
      const task = await Task.create({ name, user_id, category_id });
      res.status(201).json({ msg: "Task created successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async editTask(req, res, next) {
    let { id } = req.params;
    let { name } = req.body;
    try {
      let edited = {
        name,
      };
      const task = await Task.update(edited, {
        where: {
          id,
        },
      });
      res.status(200).json({ msg: "Task edited successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async taskNext(req, res, next) {
    let { id } = req.params;
    try {
      const search = await Task.findByPk(id);
      if (search) {
        let newCat = {
          category_id: search.category_id + 1,
        };

        const updated = await Task.update(newCat, {
          where: { id },
        });
        res.status(200).json({ msg: "Task edited successfully", updated });
      }
    } catch (err) {
      next(err);
    }
  }

  static async taskBack(req, res, next) {
    let { id } = req.params;
    try {
      const search = await Task.findByPk(id);
      if (search) {
        let newCat = {
          category_id: search.category_id - 1,
        };
        const updated = await Task.update(newCat, { where: { id } });
      }
      res.status(200).json({ msg: "Task edited successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTask(req, res, next) {
    let { id } = req.params;
    try {
      const task = await Task.destroy({ where: { id } });
      res.status(200).json({ msg: "Task deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  //ORGANIZATION
  static async getOrg(req, res, next) {
    let { id } = req.params;
    try {
      const conjunction = await UserOrg.findAll({
        where: { user_id: id },
        include: [{ model: Organization }],
      });
      res.status(200).json(conjunction);
    } catch (err) {
      next(err);
    }
  }

  static async addOrg(req, res, next) {
    let { user_id } = req.params;
    let { name } = req.body;
    try {
      const org = await Organization.create({ name });
      const userorg = await UserOrg.create({
        user_id,
        organization_id: org.id,
      });
      res.status(201).json({ msg: "Organization created successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async enterOrg(req, res, next) {
    let { id, name } = req.params;
    try {
      const user = await User.findOne({ where: { name } });
      if (user) {
        const exist = await UserOrg.findOne({
          where: {
            user_id: user.id,
            organization_id: id,
          },
        });
        if (exist) throw { status: 400, msg: "User is already a member" };
        else {
          const enter = await UserOrg.create({
            user_id: user.id,
            organization_id: id,
          });
          res.status(201).json({ msg: "User joined successfully" });
        }
      } else throw { status: 400, msg: "User not found" };
    } catch (err) {
      next(err);
    }
  }

  static async seeMember(req, res, next) {
    let { name } = req.params;
    try {
      const org = await Organization.findOne({ where: { name } });
      const member = await UserOrg.findAll({
        where: { organization_id: org.id },
        include: [{ model: User }],
      });
      res.status(200).json(member);
    } catch (err) {
      next(err);
    }
  }

  static async kickMember(req, res, next) {
    let { id, name } = req.params;
    try {
      const user = await User.findOne({ where: { name } });
      if (user) {
        const exist = await UserOrg.findOne({
          where: { user_id: user.id, organization_id: id },
        });
        if (exist) {
          const kick = await UserOrg.destroy({
            where: { user_id: user.id, organization_id: id },
          });
          res.status(200).json({ msg: "User kicked from Organization" });
        } else throw { status: 400, msg: "User is not a member" };
      } else throw { status: 400, msg: "User not found" };
    } catch (err) {
      next(err);
    }
  }

  static async editOrg(req, res, next) {
    let { name } = req.params;
    let { name2 } = req.body;
    try {
      let edited = {
        name: name2,
      };
      const org = await Organization.update(edited, {
        where: { name },
      });
      res.status(200).json({ msg: "Organization edited successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOrg(req, res, next) {
    let { name } = req.params;
    try {
      const findOrg = await Organization.findOne({ where: { name } });
      const userorg = await UserOrg.destroy({
        where: { organization_id: findOrg.id },
      });
      const org = await Organization.destroy({ where: { name } });
      res.status(200).json({ msg: "Organization deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CommandCenter;
