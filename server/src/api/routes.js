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
router.get("/api/funcionarios/:id", FuncionarioController.buscarFuncionarioPorId);
router.get("/api/funcionarios", FuncionarioController.buscarFuncionarios);
router.put("/api/funcionarios/:id", FuncionarioController.atualizarFuncionario);
router.delete("/api/funcionarios/:id", FuncionarioController.deletarFuncionario);

// Faltas
router.post("/api/faltas/novo", FaltaController.criarFalta);
router.get("/api/faltas/buscar/:id", FaltaController.buscarPorFuncionario);
router.put("/api/faltas/:id", FaltaController.atualizarFalta);
router.delete("/api/faltas/:id", FaltaController.deletarFalta);

// Atestados
router.post("/api/atestados/novo", AtestadoController.criarAtestado);
router.get("/api/atestados/buscar/:id", AtestadoController.buscarPorFuncionario);
router.put("/api/atestados/:id", AtestadoController.atualizarAtestado);
router.delete("/api/atestados/:id", AtestadoController.deletarAtestado);


export default router