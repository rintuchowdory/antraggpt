export const validations = {
  required: (value: string): string | null =>
    !value || value.trim() === '' ? 'required' : null,

  date: (value: string): string | null => {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? 'invalidDate' : null;
  },
};
