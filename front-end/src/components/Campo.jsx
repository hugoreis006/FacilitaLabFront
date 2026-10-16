import { useId } from 'react';

export function Campo({ label, tipo = 'text', value, onChange, erro, obrigatorio = false, placeholder, autoFocus, maxLength, disabled, lista, opcoes = [], linhas, className = '' }) {
  const id = useId();
  const classesBase = `w-full px-3 py-2 rounded-lg border bg-input text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60 disabled:cursor-not-allowed ${erro ? 'border-danger' : 'border-line'}`;
  const ariaInvalid = erro ? 'true' : undefined;

  let controle;
  if (tipo === 'select') {
    controle = (
      <select id={id} value={value} onChange={onChange} disabled={disabled} required={obrigatorio} className={classesBase} aria-invalid={ariaInvalid}>
        {placeholder && <option value="">{placeholder}</option>}
        {opcoes.map((o) => (
          <option key={o.valor} value={o.valor}>{o.rotulo}</option>
        ))}
      </select>
    );
  } else if (tipo === 'textarea') {
    controle = (
      <textarea id={id} value={value} onChange={onChange} disabled={disabled} required={obrigatorio} placeholder={placeholder} maxLength={maxLength} rows={linhas ?? 4} autoFocus={autoFocus} className={classesBase} aria-invalid={ariaInvalid} />
    );
  } else {
    controle = (
      <input id={id} type={tipo} value={value} onChange={onChange} disabled={disabled} required={obrigatorio} placeholder={placeholder} maxLength={maxLength} autoFocus={autoFocus} list={lista} className={classesBase} aria-invalid={ariaInvalid} />
    );
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}{obrigatorio && <span className="text-danger"> *</span>}
        </label>
      )}
      {controle}
      {erro && <p className="text-xs text-danger">{erro}</p>}
    </div>
  );
}