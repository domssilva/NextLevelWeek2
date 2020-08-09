import faker from 'faker';

const fakeUsers = [];
const fakeUsersQtd = 10;

interface user {
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    subject: string,
    cost: number,
    schedule: [{
        week_day: number,
        from: string,
        to: string,
    }]
}

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

export default function createFakeUser(): object {
    let user = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        avatar: faker.image.people(),
        whatsapp: faker.phone.phoneNumber(),
        bio: faker.lorem.paragraph(),
        subject: getRandomSubject(),
        cost: 120,
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