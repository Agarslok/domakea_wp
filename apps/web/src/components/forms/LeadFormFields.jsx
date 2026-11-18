import React from 'react';
import { Link } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  CONTACT_ATTRIBUTION,
  CONTACT_START_WHEN,
  ECONOMIC_SECTORS,
  JOB_ROLES,
  SERVICE_INTEREST,
  formatServiceInterestLabel,
  formatServiceInterestShort,
  getServiceInterestByValue,
} from '@/lib/formOptions';
import { FORM_SELECT_CONTENT, FORM_SELECT_ITEM, FORM_SELECT_TRIGGER } from '@/components/forms/formSelectStyles';

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-sm text-destructive">{message}</p>;
}

function FieldBlock({ label, required, hint, children, error, fieldKey }) {
  return (
    <div className="min-w-0 space-y-2" data-form-field={fieldKey}>
      <div className="flex flex-wrap items-baseline gap-2">
        <Label className="text-sm font-semibold">
          {label}
          {required ? <span className="text-primary"> *</span> : null}
        </Label>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
      <FieldError message={error} />
    </div>
  );
}

export function RhfInput({ control, name, label, required, hint, ...inputProps }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldBlock label={label} required={required} hint={hint} error={fieldState.error?.message} fieldKey={name}>
          <Input
            {...field}
            {...inputProps}
            value={field.value ?? ''}
            className={cn('h-12 rounded-xl bg-background/80', inputProps.className)}
          />
        </FieldBlock>
      )}
    />
  );
}

export function RhfTextarea({ control, name, label, required, hint, ...props }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldBlock label={label} required={required} hint={hint} error={fieldState.error?.message} fieldKey={name}>
          <Textarea
            {...field}
            {...props}
            value={field.value ?? ''}
            className={cn('min-h-[120px] rounded-xl bg-background/80 resize-y', props.className)}
          />
        </FieldBlock>
      )}
    />
  );
}

export function RhfSelect({
  control,
  name,
  label,
  required,
  placeholder,
  options,
  onValueChangeExtra,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldBlock label={label} required={required} error={fieldState.error?.message} fieldKey={name}>
          <Select
            value={field.value || undefined}
            onValueChange={(v) => {
              field.onChange(v);
              field.onBlur();
              onValueChangeExtra?.(v);
            }}
          >
            <SelectTrigger className={cn(FORM_SELECT_TRIGGER, 'rounded-xl bg-background/80')}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={6} className={cn(FORM_SELECT_CONTENT, 'rounded-xl')}>
              {options.map((opt) => {
                const value = typeof opt === 'string' ? opt : opt.value;
                const text = typeof opt === 'string' ? opt : opt.label;
                return (
                  <SelectItem
                    key={value}
                    value={value}
                    className={FORM_SELECT_ITEM}
                    textValue={text}
                  >
                    {text}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FieldBlock>
      )}
    />
  );
}

export function JobRoleField({ control, watch, setValue }) {
  const role = watch('job_role');
  return (
    <div className="space-y-4">
      <RhfSelect
        control={control}
        name="job_role"
        label="Cargo"
        required
        placeholder="Selecciona tu rol"
        options={JOB_ROLES}
        onValueChangeExtra={(v) => {
          if (v !== 'Otro') setValue('job_role_other', '');
        }}
      />
      {role === 'Otro' ? (
        <RhfInput control={control} name="job_role_other" label="Especifica tu cargo" required />
      ) : null}
    </div>
  );
}

export function SectorField({ control, watch, setValue, optional }) {
  const sector = watch('economic_sector');
  return (
    <div className="space-y-4">
      <RhfSelect
        control={control}
        name="economic_sector"
        label="Nicho / sector económico"
        required={!optional}
        placeholder="Selecciona un sector"
        options={ECONOMIC_SECTORS}
        onValueChangeExtra={(v) => {
          if (v !== 'Otro') setValue('sector_other', '');
        }}
      />
      {sector === 'Otro' ? (
        <RhfInput control={control} name="sector_other" label="Especifica el sector" required />
      ) : null}
    </div>
  );
}

export function AttributionField({ control, watch, setValue }) {
  const attr = watch('attribution');
  return (
    <div className="space-y-4">
      <RhfSelect
        control={control}
        name="attribution"
        label="¿Cómo nos encontraste?"
        required
        placeholder="Selecciona una opción"
        options={CONTACT_ATTRIBUTION}
        onValueChangeExtra={(v) => {
          if (v !== 'otro') setValue('attribution_other', '');
        }}
      />
      {attr === 'otro' ? (
        <RhfInput control={control} name="attribution_other" label="Cuéntanos cómo nos encontraste" required />
      ) : null}
    </div>
  );
}

function ServiceInterestOptionLine({ opt, compact }) {
  return (
    <span className={cn('block text-left leading-snug', compact ? 'text-sm' : 'text-sm sm:text-[15px]')}>
      <span className="font-semibold text-foreground">{opt.name}</span>
      {opt.tag ? (
        <>
          <span className="text-muted-foreground"> / </span>
          <span className="font-medium text-foreground">{opt.tag}</span>
        </>
      ) : null}
      <span className="text-muted-foreground"> / </span>
      <span className={cn(compact ? 'text-muted-foreground' : 'text-foreground/90')}>{opt.hook}</span>
    </span>
  );
}

export function ServiceInterestField({ control }) {
  const narrow = useMediaQuery('(max-width: 640px)');

  return (
    <Controller
      control={control}
      name="service_interest"
      render={({ field, fieldState }) => {
        const selected = getServiceInterestByValue(field.value);
        return (
          <FieldBlock
            label="¿Qué servicio te interesa?"
            hint="Opcional"
            error={fieldState.error?.message}
            fieldKey="service_interest"
          >
            <Select
              value={field.value || undefined}
              onValueChange={(v) => {
                field.onChange(v);
                field.onBlur();
              }}
            >
              <SelectTrigger className={cn(FORM_SELECT_TRIGGER, 'rounded-xl bg-background/80')}>
                <SelectValue placeholder="Elige un servicio o diagnóstico gratuito">
                  {selected ? (
                    narrow ? (
                      <span className="block text-left text-sm leading-snug">{formatServiceInterestShort(selected)}</span>
                    ) : (
                      <ServiceInterestOptionLine opt={selected} compact />
                    )
                  ) : null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={6} className={cn(FORM_SELECT_CONTENT, 'rounded-xl')}>
                {SERVICE_INTEREST.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className={FORM_SELECT_ITEM}
                    textValue={formatServiceInterestLabel(opt)}
                  >
                    <ServiceInterestOptionLine opt={opt} compact={narrow} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldBlock>
        );
      }}
    />
  );
}

export function StartWhenField({ control }) {
  return (
    <RhfSelect
      control={control}
      name="start_when"
      label="¿Cuándo necesitarías comenzar?"
      placeholder="Selecciona un plazo (opcional)"
      options={CONTACT_START_WHEN}
    />
  );
}

export function PrivacyConsentField({ control }) {
  return (
    <Controller
      control={control}
      name="privacy_accepted"
      render={({ field, fieldState }) => (
        <div
          data-form-field="privacy_accepted"
          className={cn(
            'rounded-2xl border bg-primary/5 p-4 sm:p-5',
            fieldState.error ? 'border-destructive/60 ring-1 ring-destructive/20' : 'border-primary/20',
          )}
        >
          <div className="flex gap-3 sm:gap-4">
            <Checkbox
              id="privacy_accepted"
              checked={Boolean(field.value)}
              onCheckedChange={(checked) => {
                field.onChange(checked === true);
                field.onBlur();
              }}
              className="mt-1 h-5 w-5 shrink-0"
            />
            <div className="min-w-0 flex-1 space-y-1.5">
              <Label htmlFor="privacy_accepted" className="cursor-pointer text-sm leading-relaxed font-normal">
                He leído y acepto la{' '}
                <Link to="/politica-privacidad" className="font-semibold text-primary underline-offset-2 hover:underline">
                  Política de Tratamiento de Datos Personales
                </Link>
                . Autorizo el tratamiento de mis datos para los fines indicados.
                <span className="text-primary"> *</span>
              </Label>
              <FieldError message={fieldState.error?.message} />
            </div>
          </div>
        </div>
      )}
    />
  );
}