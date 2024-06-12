const { Router } = require("express");
const TurmaController = require("../controllers/turmaController.js");
const validaPermissoes = require("../middlewares/permissaoMiddleware.js");

const router = Router();

router
  .get("/turmas", validaPermissoes(["*"]), TurmaController.getAll)
  .get("/turmas/:id", validaPermissoes(["*"]), TurmaController.getById)
  .get(
    "/turmas/oficinas/:idOficina",
    validaPermissoes(["*"]),
    TurmaController.getAllByOficina
  )
  .post("/turmas", validaPermissoes(["admin", "lider", "prof"]), TurmaController.create)
  .put(
    "/turmas/:id",
    validaPermissoes(["lider", "prof"]),
    TurmaController.update
  )
  .delete(
    "/turmas/:id",
    validaPermissoes(["lider"]),
    TurmaController.delete
  );

module.exports = router;
