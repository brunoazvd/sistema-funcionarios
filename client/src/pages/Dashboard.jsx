import AtestadosManager from "../components/Atestados/AtestadosManager";
import FaltasManager from "../components/Faltas/FaltasManager";
import FuncionariosManager from "../components/Funcionarios/FuncionariosManager";
import ToastList from "../components/ToastList";
import { Tabs } from "@base-ui-components/react/tabs";
import { Toast } from "@base-ui-components/react/toast";

export const Dashboard = () => (
	<div className="flex max-w-6xl mx-auto w-full flex-col">
		<Tabs.Root defaultValue="funcionarios">
			<Tabs.List className="relative z-0 flex items-center justify-center gap-9 shadow-[inset_0_-3px] shadow-indigo-900 text-xl py-6 px-6">
				<Tabs.Tab
					className="border-0 px-2 font-medium text-indigo-200 outline-none select-none data-[selected]:text-indigo-500"
					value="funcionarios"
				>
					Funcionários
				</Tabs.Tab>
				<Tabs.Tab
					className="border-0 px-2 font-medium text-indigo-200 outline-none select-none data-[selected]:text-indigo-500"
					value="faltas"
				>
					Faltas
				</Tabs.Tab>
				<Tabs.Tab
					className="border-0 px-2 font-medium text-indigo-200 outline-none select-none data-[selected]:text-indigo-500"
					value="atestados"
				>
					Atestados
				</Tabs.Tab>
				<Tabs.Indicator className="absolute top-1/2 left-0 z-[-1] h-8 w-[var(--active-tab-width)] -translate-y-1/2 translate-x-[var(--active-tab-left)] bg-indigo-50 transition-all duration-400 ease-in-out" />
			</Tabs.List>
			<Tabs.Panel value="funcionarios">
				<FuncionariosManager />
			</Tabs.Panel>
			<Tabs.Panel value="faltas">
				<FaltasManager />
			</Tabs.Panel>
			<Tabs.Panel value="atestados">
				<AtestadosManager />
			</Tabs.Panel>
		</Tabs.Root>
		<Toast.Portal>
			<Toast.Viewport className="fixed top-auto right-[1rem] bottom-[1rem] mx-auto flex w-[250px] sm:right-[2rem] sm:bottom-[2rem] sm:w-[300px]">
				<ToastList />
			</Toast.Viewport>
		</Toast.Portal>
	</div>
);
