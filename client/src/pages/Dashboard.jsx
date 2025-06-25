import AtestadosManager from "../components/AtestadosManager";

import { Tabs } from "@base-ui-components/react/tabs";

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
				<h2 className="text-center text-5xl font-extrabold tracking-tight">
					Funcionários
				</h2>
			</Tabs.Panel>
			<Tabs.Panel value="faltas">
				<h2 className="text-center text-5xl font-extrabold tracking-tight">
					Faltas
				</h2>
			</Tabs.Panel>
			<Tabs.Panel value="atestados">
				<AtestadosManager />
			</Tabs.Panel>
		</Tabs.Root>
	</div>
);
