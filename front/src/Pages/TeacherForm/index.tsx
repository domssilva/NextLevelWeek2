import React, {useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import PageHeader from '../../components/PageHeader';
import ScheduleItem from '../../components/ScheduleItem';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string,
};

export default function TeacherForm() {

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
      { week_day: 0, from: '', to: ''}
  ]);

  const history = useHistory();

  function addNewScheduleItem(newSchedule: ScheduleItem) {
    setScheduleItems(
      scheduleItems.concat(newSchedule)
    );
  }

  function setScheduleItemValue(pos: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === pos) {
        return { ...scheduleItem, [field]: value };
      }
      return { ...scheduleItem };
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    })
    .then(() => {
      alert('Success on register. Welcome aboard!');
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
      alert('Something went wrong :(');
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="We are glad you are willing to share your knowledge!"
        description="The first step is to sign up."
      />

       <main>
          <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Your data</legend>

                <Input 
                  name="full name" 
                  label="name" 
                  value={name}
                  onChange={(event) => {setName(event.target.value)}}
                />
                <Input 
                  name="avatar" 
                  label="avatar" 
                  value={avatar}
                  onChange={(event) => {setAvatar(event.target.value)}}
                />
                <Input 
                  name="whatsapp" 
                  label="whatsapp" 
                  value={whatsapp}
                  onChange={(event) => {setWhatsapp(event.target.value)}}
                  />
            </fieldset>

            <fieldset>
              <Textarea 
                name="bio" 
                label="bio"
                value={bio}
                onChange={(event) => {setBio(event.target.value)}}
              />
            </fieldset>

            <fieldset>
                <legend>About the lesson</legend>

                <Select 
                  name="subject" 
                  label="subject"
                  value={subject}
                  onChange={(event) => {setSubject(event.target.value)}}
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
                <Input 
                  name="cost" 
                  label="Cost per hour"
                  value={cost}
                  onChange={(event) => {setCost(event.target.value)}}
                />
            </fieldset>

            <fieldset>
              <legend>Time Schedule</legend>
              <button type="button" onClick={() => addNewScheduleItem({ week_day: 0, from: '8:00 AM', to: '6:00 PM'})}>
                + New
              </button>

              {
                scheduleItems.map((scheduleItem, index) => (
                    <div className="schedule-item">
                      <Select 
                        name="week_day" 
                        label="week day"
                        value={scheduleItem.week_day}
                        onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
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
                        name="from" 
                        label="from" 
                        type="time"
                        value={scheduleItem.from}
                        onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                      />
                      <Input 
                        name="to" 
                        label="to" 
                        type="time"
                        value={scheduleItem.to}
                        onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                      />
                    </div>
                ))
              }
            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="warning"/>
                important! <br/>
                Fill every field
              </p>
              <button type="submit">
                Register
              </button>
            </footer>
          </form>
        </main>
    </div>
  );
}