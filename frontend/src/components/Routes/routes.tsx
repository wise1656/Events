import { Messages } from 'pages/Messages/Messages';
import { Profile } from 'pages/Profile/Profile';
import { Timetable } from 'pages/Timetable/Timetable';
import { Event } from '../../pages/Event/Event';
import { EventList } from '../../pages/EventList/EventList';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/Person';
import { ReactElement } from 'react';
import { selectCurrentEventId } from 'redux/UiSlice';
import { store } from 'redux/store';

interface RouteData {
    url: string;
    component: () => ReactElement;
    menuIcon: ReactElement;
    menuTitle: string;
    isDisabled?: () => boolean;
}

// TODO: встроить это непосредственно в роутер и меню, облегчения от такой реализации нет, а проблемы есть
export const RoutesData: RouteData[] = [
    {
        url: '/eventlist',
        component: () => <EventList />,
        menuIcon: <DateRangeIcon />,
        menuTitle: 'События',
    },
    {
        url: '/event',
        component: () => <Event />,
        menuIcon: <Diversity1Icon />,
        menuTitle: 'Событие',
        isDisabled: () => selectCurrentEventId(store.getState()) == null        
    },
    // {
    //     url: '/timetable',
    //     component: () => <Timetable />,
    //     menuIcon: <ViewTimelineIcon />,
    //     menuTitle: 'Расписание',
    // },
    // {
    //     url: '/messages',
    //     component: () => <Messages />,
    //     menuIcon: <CommentIcon />,
    //     menuTitle: 'Сообщения',
    // },
    {
        url: '/userinfo',
        component: () => <Profile />,
        menuIcon: <PersonIcon />,
        menuTitle: 'Инфо',
    },
];
