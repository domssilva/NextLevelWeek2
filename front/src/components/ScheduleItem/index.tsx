import React from 'react';

import Input from '../Input';
import Select from '../Select';

const ScheduleItem = () => {
    return (
        <div className="schedule-item">
            <Select 
                name="week_day" 
                label="week day"
                options={[
                    {value: '0', label: 'monday'},
                    {value: '1', label: 'tuesday'},
                    {value: '2', label: 'wednesday'},
                    {value: '3', label: 'thursday'},
                    {value: '4', label: 'friday'},
                    {value: '5', label: 'saturday'},
                    {value: '6', label: 'sunday'}
                ]}
            />
            <Input name="from" label="from" type="time"/>
            <Input name="to" label="to" type="time"/>
        </div>
    )
}

export default ScheduleItem;
