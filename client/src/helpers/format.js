export const formatISOToDateOnly = (isoString) => {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export const formatCPF = (value) => {
    const cpfDigits = value.replace(/\D/g, '');
    return cpfDigits.slice(0, 11);
};

export const formatTelefone = (value) => {
    const phoneDigits = value.replace(/\D/g, '');
    const digits = phoneDigits.slice(0, 11);

    if (digits.length <= 2) {
        return digits;
    } else if (digits.length <= 7) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
};