import EditIcon from "../icons/EditIcon.jsx";
import DeleteIcon from "../icons/DeleteIcon.jsx";
import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import { useState } from "react";

const AtestadosResults = ({ results, deleteAction, setModalContent }) => {
  const [deleteId, setDeleteId] = useState(null);

  return (
    results.length > 0 && (
      <>
        <AlertDialog.Root>
          <table className="text-black table-auto text-left">
            <thead className="bg-indigo-500 text-indigo-50">
              <tr>
                <th className="p-2 w-2/10">Funcionário</th>
                <th className="p-2 w-1/10">Data</th>
                <th className="p-2 w-1/10">Tipo</th>
                <th className="p-2 w-1/10">Dias</th>
                <th className="p-2 w-2/10">Observação</th>
                <th className="p-2 w-1/10">Ações</th>
              </tr>
            </thead>
            <tbody>
              {results.map((atestado, index) => {
                return (
                  <tr key={index} className="bg-indigo-50">
                    <td className="px-2 py-1">{atestado.funcionario.nome}</td>
                    <td className="px-2 py-1">
                      {new Date(atestado.data).toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                      })}
                    </td>
                    <td className="px-2 py-1">
                      {atestado.tipo === "COMPARECIMENTO"
                        ? "Comparecimento"
                        : "Atestado Médico"}
                    </td>
                    <td className="px-2 py-1">
                      {atestado.dias === 0 ? "" : atestado.dias}
                    </td>
                    <td className="px-2 py-1">
                      {atestado.observacao ? atestado.observacao : ""}
                    </td>
                    <td className="px-2 py-1">
                      <button
                        className="mr-4 cursor-pointer hover:text-green-600"
                        type="button"
                        onClick={() => setModalContent(atestado)}
                      >
                        <EditIcon />
                      </button>
                      <AlertDialog.Trigger
                        className="mr-4 cursor-pointer hover:text-red-600"
                        onClick={() => setDeleteId(atestado.id)}
                      >
                        <DeleteIcon />
                      </AlertDialog.Trigger>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50" />
            <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-sm max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
              <AlertDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
                Excluir Atestado?
              </AlertDialog.Title>
              <AlertDialog.Description className="mb-6 text-base text-gray-600">
                Você não pode desfazer esta ação!
              </AlertDialog.Description>
              <div className="flex gap-4">
                <AlertDialog.Close className="flex h-8 items-center justify-center bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-200 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                  Cancelar
                </AlertDialog.Close>
                <AlertDialog.Close
                  onClick={() => deleteAction(deleteId)}
                  className="flex h-8 items-center justify-center text-red-800 bg-gray-50 px-3.5 text-base font-medium hover:text-gray-900 hover:bg-red-400 focus-visible:-outline-offset-1 focus-visible:outline-red-800 active:bg-gray-100"
                >
                  Excluir
                </AlertDialog.Close>
              </div>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </>
    )
  );
};

export default AtestadosResults;
