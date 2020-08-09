import faker from 'faker';

export interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
}

interface User {
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    subject: string,
    cost: number,
    schedule: ScheduleItem[],
}

export default function createFakeUser(): User {

    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function getRandomSubject() {
        const subjects = [
            'art',
            'biology',
            'science',
            'geography',
            'chemistry',
            'mathematics',
            'geometry',
            'physics',
            'english',
            'german',
        ];
        
        return subjects[getRandomNumber(0, subjects.length - 1)];
    }

    let user = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        avatar: faker.image.people(),
        whatsapp: faker.phone.phoneNumber(),
        bio: faker.lorem.paragraph(),
        subject: getRandomSubject(),
        cost: getRandomNumber(20, 200),
        schedule: [
            {
                week_day: getRandomNumber(0, 6),
                from: `${getRandomNumber(1, 12)}:${getRandomNumber(0, 59)}`,
                to: `${getRandomNumber(1, 12)}:${getRandomNumber(0, 59)}`
            }
        ]
    };

    return user;
}
