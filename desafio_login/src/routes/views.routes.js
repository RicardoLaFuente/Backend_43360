import { Router } from "express";

const router = Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/", (req, res) => {
  res.render("productos", {
    user: req.session.users,
  });
});

router.get("/productos", async (req, res) => {
  res.render("productos", { title: "Productos" });
});

router.get("/carrito", async (req, res) => {
  res.render("carrito", { title: "Carrito" });
});

export default router;