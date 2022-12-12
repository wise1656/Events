import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { MainButton } from 'components/Button/Button';
import { useParams } from 'react-router-dom';
import { selectEvent, useGetSubscribersQuery } from 'redux/ApiQuery';
import DownloadIcon from '@mui/icons-material/Download';
import { ExportToCsv } from 'export-to-csv';
import { useSelector } from 'react-redux';
import { UserDataFieldsTitles } from 'components/UserDataFields';
import { ShortDateFormat } from 'helpers/DateFormat';
import { useEffect } from 'react';

export function Subscribed() {
    const { id } = useParams();
    const event = useSelector(selectEvent(id));
    const { data, refetch } = useGetSubscribersQuery(id);
    useEffect(() => {
        refetch();
    }, [])

    if (!data) return null;

    const keys = data.flatMap((o) => Object.keys(o)).filter((k) => k != '_id' && k != 'eventId');
    const headers = keys.filter((elem, i) => keys.indexOf(elem) === i);
    const headersNames = headers.map((h) => UserDataFieldsTitles[h] ?? h);

    const download = () => {
        const csvExporter = new ExportToCsv({
            title: event.title,
            headers: headersNames,
            showLabels: true,
            filename: `Список участников ${event.title}`,
        });
        const values = data.map((record) => Object.fromEntries(headers.map((h) => [h, record[h]])));
        csvExporter.generateCsv(values);
    };

    return (
        <>
            <Stack direction='row' alignItems='center'>
                <Typography sx={{ p: 3 }} variant='h6'>
                    Записалось: {data.length}
                </Typography>
                <MainButton onClick={download} startIcon={<DownloadIcon />}>
                    Скачать
                </MainButton>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            {headersNames.map((h) => (
                                <TableCell key={h}>{h}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {headers
                                    .map((h) => row[h])
                                    .map(cell => convertToViewFormat(cell))
                                    .map((cell) => (
                                        <TableCell align='right'>{cell}</TableCell>
                                    ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

function convertToViewFormat(value) {
    if (typeof value === 'boolean') 
        return value ? 'Да' : 'Нет';
    // дата
    if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}/.test(value))
        return ShortDateFormat(value);
    return value;
}


    