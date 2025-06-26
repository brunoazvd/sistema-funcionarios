import { useFuncionarios } from '../contexts/FuncionariosContext.jsx';

const FuncionarioSelect = ({ 
    value, 
    onChange, 
    name = "funcionarioId", 
    required = false, 
    placeholder = "Selecione um funcionário",
    className = "bg-indigo-50 w-full py-1 px-2",
    disabled = false 
}) => {
    const { funcionarios, loading, error } = useFuncionarios();

    if (loading) {
        return (
            <select 
                className={className} 
                disabled
            >
                <option>Carregando funcionários...</option>
            </select>
        );
    }

    if (error) {
        return (
            <select 
                className={className} 
                disabled
            >
                <option>Erro ao carregar funcionários</option>
            </select>
        );
    }

    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={className}
            disabled={disabled}
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {funcionarios.map((funcionario) => (
                <option key={funcionario.id} value={funcionario.id}>
                    {funcionario.nome} {funcionario.sobrenome ? `- ${funcionario.sobrenome}` : ''}
                </option>
            ))}
        </select>
    );
};

export default FuncionarioSelect;
