import RelatorioFaltasAtestados from "./RelatorioFaltasAtestados";

const RelatoriosManager = () => {
	return (
		<>
			<div className="flex flex-col md:flex-row border-b-3 border-indigo-900 pb-6 pt-4 mb-9">
				<RelatorioFaltasAtestados />
			</div>
		</>
	);
};

export default RelatoriosManager;
