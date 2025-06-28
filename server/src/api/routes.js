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
router.post("/api/funcionarios/novo", FuncionarioController.criarFuncionario);
router.put("/api/funcionarios/:id", FuncionarioController.atualizarFuncionario);
router.delete("/api/funcionarios/:id", FuncionarioController.deletarFuncionario);
router.get("/api/funcionarios/id/:id", FuncionarioController.buscarPorId);
router.get("/api/funcionarios", FuncionarioController.buscarTodos);
router.post("/api/funcionarios/pesquisar", FuncionarioController.pesquisar);

// Faltas
router.post("/api/faltas/novo", FaltaController.criarFalta);
router.delete("/api/faltas/:id", FaltaController.deletarFalta);
router.put("/api/faltas/:id", FaltaController.atualizarFalta);
router.get("/api/faltas/id/:id", FaltaController.buscarPorId);
router.get("/api/faltas/todos", FaltaController.buscarTodos);
router.get("/api/faltas/funcionario/:id", FaltaController.buscarPorFuncionario);
router.post("/api/faltas/pesquisar", FaltaController.pesquisar);

// Atestados
router.post("/api/atestados/novo", AtestadoController.criarAtestado);
router.delete("/api/atestados/:id", AtestadoController.deletarAtestado);
router.put("/api/atestados/:id", AtestadoController.atualizarAtestado);
router.get("/api/atestados/id/:id", AtestadoController.buscarPorId);
router.get("/api/atestados/todos", AtestadoController.buscarTodos);
router.get("/api/atestados/funcionario/:id", AtestadoController.buscarPorFuncionario);
router.post("/api/atestados/pesquisar", AtestadoController.pesquisar);

export default router