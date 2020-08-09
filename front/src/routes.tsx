import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './Pages/Landing'
import TeacherList from './Pages/TeacherList'
import TeacherForm from './Pages/TeacherForm'
import AllTeachers from './Pages/AllTeachers'

export default function routes() {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Landing}/>
            <Route exact path='/study' component={TeacherList}/>
            <Route exact path='/teach' component={TeacherForm}/>
            <Route exact path='/teachers' component={AllTeachers}/>
        </BrowserRouter>
    )
}
