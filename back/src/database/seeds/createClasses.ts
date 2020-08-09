import Knex from 'knex';

import db from '../connection';
import convertHourToMinutes from '../../utils/convertHourToMinutes';
import createFakeUser, {ScheduleItem} from '../../utils/createFakeUser';

export async function seed(knex: Knex) {
    
    // 0. connect to db
    const trx = await db.transaction();

    // 1. create fake user
    let user = createFakeUser();

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
