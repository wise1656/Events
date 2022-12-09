import { TextField } from '@mui/material';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { UserInfo } from 'services/User.service';


export function UserDataFields({ register }: { register: UseFormRegister<UserInfo>; }) {
    return <>
        <TextField {...register('name')} label='Имя' variant='standard' required />
        <TextField {...register('lastName')} label='Фамилия' variant='standard' required />
        <TextField
            {...register('birthday')}
            variant='standard'
            label='Дата рождения'
            type='date'
            required
            InputLabelProps={{
                shrink: true,
            }} />
        <TextField {...register('city')} label='Город' variant='standard' required />
        <TextField {...register('church')} label='Церковь' variant='standard' />
        <TextField {...register('phone')} label='Телефон' variant='standard' required/>
    </>;
}
