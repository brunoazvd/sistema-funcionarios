import { Input } from "@base-ui-components/react/input";
import { Toast } from "@base-ui-components/react/toast";
import { useState, useEffect } from "react";
import { useLoading } from "../../contexts/LoadingContext.jsx";
import CargoSelect from "../selects/CargoSelect.jsx";
import SexoSelect from "../selects/SexoSelect.jsx";
import TipoContratoSelect from "../selects/TipoContratoSelect.jsx";

import {
  cadastrarFuncionario,
  atualizarFuncionario,
} from "../../services/api/funcionarios.js";

import {
  formatISOToDateOnly,
  formatTelefone,
  formatCPF,
} from "../../helpers/format.js";

const initialState = {
  nome: "",
  cargo: "",
  sexo: "",
  cpf: "",
  dataNascimento: "",
  dataAdmissao: "",
  email: "",
  telefone: "",
  tipoContrato: "",
  status: "ATIVO",
};

const FuncionariosForm = ({
  closeModal,
  currentFuncionario,
  clearFuncionario,
  clearResults,
  updateAction,
}) => {
  const [formData, setFormData] = useState(initialState);
  const { startLoading, stopLoading } = useLoading();
  const toastManager = Toast.useToastManager();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "telefone") {
      setFormData({
        ...formData,
        [name]: formatTelefone(value),
      });
      return;
    } else if (name === "cpf") {
      setFormData({
        ...formData,
        [name]: formatCPF(value),
      });
      return;
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const telefoneFormatado = formData.telefone
      ? formData.telefone.replace(/\D/g, "")
      : formData.telefone;
    const cpfFormatado = formData.cpf
      ? formData.cpf.replace(/\D/g, "")
      : formData.cpf;
    startLoading(10000);
    if (currentFuncionario === null) {
      const funcionario = await cadastrarFuncionario({
        nome: formData.nome,
        cargo: formData.cargo,
        sexo: formData.sexo,
        cpf: cpfFormatado,
        dataNascimento: new Date(formData.dataNascimento),
        dataAdmissao: new Date(formData.dataAdmissao),
        email: formData.email,
        telefone: telefoneFormatado,
        tipoContrato: formData.tipoContrato,
        status: formData.status,
      });
      toastManager.add({
        title: "Funcionário cadastrado com sucesso!",
        duration: 3000,
      });
      clearResults();
    } else {
      const funcionario = await atualizarFuncionario(currentFuncionario.id, {
        nome: formData.nome,
        cargo: formData.cargo,
        sexo: formData.sexo,
        cpf: cpfFormatado,
        dataNascimento: new Date(formData.dataNascimento),
        dataAdmissao: new Date(formData.dataAdmissao),
        email: formData.email,
        telefone: telefoneFormatado,
        tipoContrato: formData.tipoContrato,
        status: formData.status,
      });
      clearFuncionario();
      updateAction(funcionario);
      toastManager.add({
        title: "Funcionário atualizado com sucesso!",
        duration: 3000,
      });
    }
    stopLoading();
    closeModal();
  };

  useEffect(() => {
    if (currentFuncionario !== null) {
      const telefoneFormatado = currentFuncionario.telefone
        ? formatTelefone(currentFuncionario.telefone)
        : "";

      setFormData({
        nome: currentFuncionario.nome,
        cargo: currentFuncionario.cargo,
        sexo: currentFuncionario.sexo,
        cpf: currentFuncionario.cpf,
        dataNascimento: currentFuncionario.dataNascimento
          ? formatISOToDateOnly(currentFuncionario.dataNascimento)
          : "",
        dataAdmissao: currentFuncionario.dataAdmissao
          ? formatISOToDateOnly(currentFuncionario.dataAdmissao)
          : "",
        email: currentFuncionario.email,
        telefone: telefoneFormatado,
        tipoContrato: currentFuncionario.tipoContrato,
        status: currentFuncionario.status,
      });
    } else {
      setFormData(initialState);
    }
  }, [currentFuncionario]);

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <p className="text-center text-xl -mt-1.5 mb-3 font-bold tracking-wide">
          {currentFuncionario ? "Editar Funcionário" : "Cadastrar Funcionário"}
        </p>
        <div className="flex flex-col gap-3 mb-6">
          <div>
            <p className="font-medium mb-1">Nome:</p>
            <Input
              name="nome"
              className="bg-indigo-50 w-full px-2 py-1"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <p className="font-medium mb-1">Cargo:</p>
              <CargoSelect
                value={formData.cargo}
                handleChange={handleChange}
                name="cargo"
              />
            </div>
            <div>
              <p className="font-medium mb-1">Sexo:</p>
              <SexoSelect
                value={formData.sexo}
                handleChange={handleChange}
                name="sexo"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <p className="font-medium mb-1">E-mail:</p>
              <Input
                name="email"
                className="bg-indigo-50 w-full px-2 py-1"
                type="text"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-medium mb-1">Telefone:</p>
              <Input
                name="telefone"
                className="bg-indigo-50 w-full px-2 py-1"
                type="text"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-medium mb-1">Data de Nascimento:</p>
              <Input
                name="dataNascimento"
                className="bg-indigo-50 w-full px-2 py-1"
                type="date"
                value={formData.dataNascimento}
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-medium mb-1">Data de Admissão:</p>
              <Input
                name="dataAdmissao"
                className="bg-indigo-50 w-full px-2 py-1"
                type="date"
                value={formData.dataAdmissao}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-medium mb-1">CPF:</p>
              <Input
                name="cpf"
                className="bg-indigo-50 w-full px-2 py-1"
                type="text"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-medium mb-1">Tipo de Contrato:</p>
              <TipoContratoSelect
                value={formData.tipoContrato}
                handleChange={handleChange}
                name="tipoContrato"
              />
            </div>
          </div>
          {currentFuncionario !== null && (
            <div>
              <p className="font-medium mb-1">Status:</p>
              <select
                name="status"
                className={
                  "bg-indigo-50 w-full py-1 px-2" +
                  (formData.status === "ATIVO"
                    ? " text-green-800"
                    : " text-red-800")
                }
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ATIVO" className="text-black">
                  Ativo
                </option>
                <option value="INATIVO" className="text-black">
                  Inativo
                </option>
              </select>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-indigo-300 hover:bg-indigo-400 py-2 w-full"
        >
          {currentFuncionario ? "Editar" : "Cadastrar"}
        </button>
      </form>
    </>
  );
};

export default FuncionariosForm;
