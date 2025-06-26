import Router from 'express';

import FuncionarioController from './controllers/FuncionarioController.js';
import FaltaController from './controllers/FaltaController.js';
import AtestadoController from './controllers/AtestadoController.js';

const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    });
});

// Funcionários
router.get("/api/funcionarios", FuncionarioController.buscarTodos);
router.get("/api/funcionarios/:id", FuncionarioController.buscarPorId);
router.post("/api/funcionarios/novo", FuncionarioController.criarFuncionario);
router.put("/api/funcionarios/:id", FuncionarioController.atualizarFuncionario);
router.delete("/api/funcionarios/:id", FuncionarioController.deletarFuncionario);

// Faltas
router.get("/api/faltas/funcionario/:id", FaltaController.buscarPorFuncionario);
router.get("/api/faltas/pesquisar", FaltaController.pesquisar);
router.get("/api/faltas/id/:id", FaltaController.buscarPorId);
router.get("/api/faltas/todos", FaltaController.buscarTodos);
router.post("/api/faltas/novo", FaltaController.criarFalta);
router.put("/api/faltas/:id", FaltaController.atualizarFalta);
router.delete("/api/faltas/:id", FaltaController.deletarFalta);

// Atestados
router.get("/api/atestados/funcionario/:id", AtestadoController.buscarPorFuncionario);
router.get("/api/atestados/pesquisar", AtestadoController.pesquisar);
router.get("/api/atestados/id/:id", AtestadoController.buscarPorId);
router.get("/api/atestados/todos", AtestadoController.buscarTodos);
router.post("/api/atestados/novo", AtestadoController.criarAtestado);
router.put("/api/atestados/:id", AtestadoController.atualizarAtestado);
router.delete("/api/atestados/:id", AtestadoController.deletarAtestado);

export default router