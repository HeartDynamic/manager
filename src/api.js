import axios from 'axios'
import Cookies from 'js-cookie'

export const instance = axios.create({
    // baseURL: 'https://api.likeyun.net',
    baseURL: 'http://192.168.0.104:8080/step',
    // baseURL: 'http://192.168.0.120:80',
})
if (Cookies.get('token')) {
    instance.defaults.headers.common['Authorization'] = 'Basic ' + Cookies.get('token')
}

const request = {
    get: async (url, data) => {
        try {
            const res = await instance.get(url, {
                params: data,
            })
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    post: async (url, data) => {
        try {
            const res = await instance.post(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    put: async (url, data) => {
        try {
            const res = await instance.put(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    del: async (url, data) => {
        try {
            const res = await instance.delete(url, { data })
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
}

const auth = {
    userInfo: () => request.get('/user-info'),
    logOut: () => request.del('/logout'),
    passwordReset: data => request.put('/password-reset', data),
    getCaptcha: () => request.get('/captchas/base64'),
    getTeachingList: data => request.get('/teaching-lists', data),
    editTeaching: data => request.put(`/teachings/${data.id}`, data),
    addTeaching: data => request.post(`/teachings`, data),
    getTeacherList: data => request.get('/teacher-lists', data),
    editTeacher: data => request.put(`/teachers/${data.id}`, data),
    addTeacher: data => request.post(`/teachers`, data),
    getSubject: () => request.get(`/subjects`),
    getTeamList: data => request.get('/team-lists', data),
    editTeam: data => request.put(`/teams/${data.id}`, data),
    addTeam: data => request.post(`/teams`, data),
    getStudentList: data => request.get('/student-lists', data),
    editStudent: data => request.put(`/students/${data.id}`, data),
    addStudent: data => request.post(`/students`, data),
    getCoursesTime: () => request.get('/courses/times'),
    editCoursesTime: data => request.put(`/courses/times/${data.id}`, data),
    addCoursesTimes: data => request.post(`/courses/times/create`, data),
    deleteCoursesTimes: data => request.del(`/courses/times/delete/${data.id}`),
    getTeachingTaskList: data => request.get(`/teachingtask-list`, data),
    addTeachingTaskCreate: data => request.post(`/teachingtask/create`, data),
    editTeachingTaskUpdate: data => request.put(`/teachingtask/update`, data),
    deleteTeachingTaskDelete: data => request.del(`/teachingtask/delete`, data),
    getTeamAll: () => request.get(`/team-all`),
    getCourseClasstimes: data => request.get(`/course-classtimes`, data),
    addCourse: data => request.post(`/courses`, data),
    editCourse: data => request.put(`/courses/update`, data),
    editCourseTimeState: data => request.put(`/courses/times/state/${data.id}`),
    addCourseDetailCreate: data => request.post(`/courses/detail/create`, data),
    editCourseDetail: data => request.put(`/courses/detail/update`, data),
    deleteCourseDetail: data => request.del(`/courses/detail/${data.courseDetailId}`, data),
}

export default {
    auth,
}
