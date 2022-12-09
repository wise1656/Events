import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SxProps,
    Theme
} from '@mui/material';
import { Controller } from 'react-hook-form';

interface MySelectProps {
    name: string;
    label: string;
    options: string[];
    optionsLabels?: string[];
    required?: boolean;
    control;
    sx?: SxProps<Theme>;
}

export function MySelect({ name, label, required, control, options: optionsKeys, optionsLabels: optionsValues, sx }: MySelectProps) {
    return (
        <FormControl key={name} sx={sx}>
            <InputLabel variant='standard' required={required}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={(rend) => (
                    <Select
                        {...rend.field}
                        label={label}
                        value={rend.field.value || ''}
                        size='small'
                        variant='standard'
                        required={required}
                    >
                        <MenuItem value={''} disabled></MenuItem>
                        {optionsKeys.map((t, i) => (
                            <MenuItem key={t} value={t}>
                                {optionsValues?.[i] ?? t}
                            </MenuItem>
                        ))}
                    </Select>
                )} />
        </FormControl>
    );
}
