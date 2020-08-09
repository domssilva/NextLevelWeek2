import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {
    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    subject: string,
    whatsapp: string,
}

interface TeacherItemProps {
    teacher: Teacher,
    info?: Boolean,
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, info }) => {

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>
                {teacher.bio}
            </p>

            {
                info && (
                    <footer>
                        <p>
                            Price/hour
                            <strong>{teacher.cost}</strong>
                        </p>
                        <a href={`https://wa.me/${teacher.whatsapp}`} target="_blank">
                            <img src={whatsappIcon} alt="whatsapp"/>
                            Get in touch
                        </a>
                    </footer>
                )
            }
        </article>
    )
}

export default TeacherItem;
