import React, { useState, useEffect } from 'react'

import PageHeader from '../../components/PageHeader'

import api from '../../services/api'
import TeacherItem from '../../components/TeacherItem'

import './styles.css'

const AllTeachers: React.FC = () => {

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        api
            .get('teachers')
            .then(res => {
                console.log(res.data)
                setTeachers(res.data)
            })

    }, [])

    return (
        <div id='page-teacher-list' className='container'>
            <PageHeader title="All Proffys" description="Check out all our amazing teachers!"/>

            <div className="allteachers">
                {
                    teachers.map(teacher => <TeacherItem teacher={teacher} key={teacher.id}/>)
                }
            </div>
        </div>
    )
}

export default AllTeachers
