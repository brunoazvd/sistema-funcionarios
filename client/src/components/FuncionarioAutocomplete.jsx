import { useState, useEffect, useRef } from "react";
import { useFuncionarios } from "../contexts/FuncionariosContext.jsx";

const FuncionarioAutocomplete = ({
	value,
	onChange,
	name = "funcionarioId",
	required = false,
	placeholder = "Pesquisar funcionário...",
	className = "bg-indigo-50 w-full py-1 px-2",
	disabled = false,
}) => {
	const { funcionarios, loading, error } = useFuncionarios();
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedName, setSelectedName] = useState("");
	const debounceTimeout = useRef(null);
	const inputRef = useRef(null);
	const dropdownRef = useRef(null);

	// Atualiza o nome exibido quando o valor muda externamente
	useEffect(() => {
		if (value && funcionarios.length > 0) {
			const funcionario = funcionarios.find(
				(f) => f.id === parseInt(value)
			);
			if (funcionario) {
				setSelectedName(
					`${funcionario.nome} ${funcionario.sobrenome || ""}`
				);
			}
		} else if (!value) {
			setSelectedName("");
		}
	}, [value, funcionarios]);

	// Filtra funcionários com debounce
	useEffect(() => {
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}

		if (!searchTerm.trim()) {
			setFilteredFuncionarios([]);
			setShowDropdown(false);
			return;
		}

		debounceTimeout.current = setTimeout(() => {
			const normalizedSearch = searchTerm
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");

			const filtered = funcionarios
				.filter((f) => {
					const normalizedName = `${f.nome} ${f.sobrenome || ""}`
						.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "");
					return normalizedName.includes(normalizedSearch);
				})
				.slice(0, 10); // Limita a 10 resultados para melhor performance

			setFilteredFuncionarios(filtered);
			setShowDropdown(true);
		}, 300);

		return () => {
			if (debounceTimeout.current) {
				clearTimeout(debounceTimeout.current);
			}
		};
	}, [searchTerm, funcionarios]);

	// Fecha o dropdown ao clicar fora
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				inputRef.current &&
				!inputRef.current.contains(event.target)
			) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
		setSelectedName(e.target.value);
		if (!e.target.value) {
			// Se o campo for limpo, limpa também o valor selecionado
			const event = {
				target: {
					name,
					value: "",
				},
			};
			onChange(event);
		}
	};

	const handleSelectFuncionario = (funcionario) => {
		setSelectedName(`${funcionario.nome} ${funcionario.sobrenome || ""}`);
		setShowDropdown(false);

		// Simula um evento de mudança para manter compatibilidade com o componente original
		const event = {
			target: {
				name,
				value: funcionario.id,
			},
		};
		onChange(event);
	};

	if (loading) {
		return (
			<input
				className={className}
				disabled
				placeholder="Carregando funcionários..."
			/>
		);
	}

	if (error) {
		return (
			<input
				className={className}
				disabled
				placeholder="Erro ao carregar funcionários"
			/>
		);
	}

	return (
		<div className="relative">
			<input
				ref={inputRef}
				type="text"
				name={`${name}_search`}
				value={selectedName}
				onChange={handleInputChange}
				onFocus={() => searchTerm && setShowDropdown(true)}
				placeholder={placeholder}
				className={className}
				disabled={disabled}
				required={required}
				autoComplete="off"
			/>

			{/* Input oculto para manter o valor real */}
			<input type="hidden" name={name} value={value} />

			{showDropdown && filteredFuncionarios.length > 0 && (
				<div
					ref={dropdownRef}
					className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-auto"
				>
					{filteredFuncionarios.map((funcionario) => (
						<div
							key={funcionario.id}
							className="px-4 py-2 hover:bg-indigo-100 cursor-pointer text-black"
							onClick={() => handleSelectFuncionario(funcionario)}
						>
							{funcionario.nome} {funcionario.sobrenome || ""}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FuncionarioAutocomplete;
