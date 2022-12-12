import { TextField } from '@mui/material';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { UserInfo } from 'services/User.service';

export const UserDataFieldsTitles = {
    name: 'Имя',
    lastName: 'Фамилия',
    birthday: 'Дата рождения',
    city: 'Город',
    church: 'Церковь',
    phone: 'Телефон',
};

export function UserDataFields({ register }: { register: UseFormRegister<UserInfo> }) {
    return (
        <>
            <TextField
                {...register('name')}
                label={UserDataFieldsTitles['name']}
                variant='standard'
                required
            />
            <TextField
                {...register('lastName')}
                label={UserDataFieldsTitles['lastName']}
                variant='standard'
                required
            />
            <TextField
                {...register('birthday')}
                variant='standard'
                label={UserDataFieldsTitles['birthday']}
                type='date'
                required
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                {...register('city')}
                label={UserDataFieldsTitles['city']}
                variant='standard'
                required
            />
            <TextField
                {...register('church')}
                label={UserDataFieldsTitles['church']}
                variant='standard'
            />
            <TextField
                {...register('phone')}
                label={UserDataFieldsTitles['phone']}
                variant='standard'
                required
            />
        </>
    );
}
