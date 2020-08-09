import Knex from 'knex';

import db from '../connection';
import convertHourToMinutes from '../../utils/convertHourToMinutes';

let user = {
    name: "Domenique Silva",
    avatar: "https://github.com/domssilva.png",
    whatsapp: "35235973925",
    bio: "Physics is awesome!",
    subject: "physics",
    cost: 120,
    schedule: [
        {
            week_day:"6",
            from:"10:00",
            to:"13:00"
        }
    ]
};

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export async function seed(knex: Knex) {

    // 1. connect to db
    const trx = await db.transaction();

    //2. insert user 
    const insertedUsersIds = await trx('users').insert({
        name: user.name,
        avatar: user.avatar,
        whatsapp: user.whatsapp,
        bio: user.bio,
    });

    //3. insert class
    const user_id = insertedUsersIds[0];
    const insertedClassesId = await trx('classes').insert({
        user_id,
        subject: user.subject,
        cost: user.cost,
    });

    // 4. insert class_schedule
    const class_id = insertedClassesId[0];
    const classSchedule = user.schedule.map(scheduleItem => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
    });

    await trx('class_schedule').insert(classSchedule)
    await trx.commit();
}
