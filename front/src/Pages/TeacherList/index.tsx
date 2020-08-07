import React, {useState, FormEvent} from 'react';

import api from '../../services/api';
import Input from '../../components/Input';
import Select from '../../components/Select';
import PageHader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import './styles.css';

const TeacherList = () => {

    const [classes, setClasses] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekday] = useState('');
    const [time, setTime] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setClasses(response.data);
    }

    return (
        <div id='page-teacher-list' className='container'>
            <PageHader title='These are the available teachers.'>
                <form id="search-teachers" onSubmit={handleSubmit}>
                    <Select 
                        name="subject" 
                        label="subject"
                        value={subject}
                        onChange={event => { setSubject(event.target.value) }}
                        options={[
                            {value: 'art', label: 'art'},
                            {value: 'biology', label: 'biology'},
                            {value: 'science', label: 'science'},
                            {value: 'geography', label: 'geography'},
                            {value: 'chemistry', label: 'chemistry'},
                            {value: 'mathematics', label: 'mathematics'},
                            {value: 'geometry', label: 'geometry'},
                            {value: 'physics', label: 'physics'},
                            {value: 'english', label: 'english'},
                            {value: 'german', label: 'german'}
                          ]}
                    />
                    <Select 
                        name="week-day" 
                        label="week day"
                        value={week_day}
                        onChange={event => { setWeekday(event.target.value) }}
                        options={[
                            {value: '0', label: 'sunday'},
                            {value: '1', label: 'monday'},
                            {value: '2', label: 'tuesday'},
                            {value: '3', label: 'wednesday'},
                            {value: '4', label: 'thursday'},
                            {value: '5', label: 'friday'},
                            {value: '6', label: 'saturday'},
                        ]}
                    />
                    <Input 
                        name="time" 
                        label="time"
                        type="time"
                        value={time}
                        onChange={event => { setTime(event.target.value) }}
                    />
                    <button type="submit">Search</button>
                </form>
            </PageHader>

            <main>
                {
                    classes.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher}/>)
                }
            </main>
        </div>
    )
}

export default TeacherList;
