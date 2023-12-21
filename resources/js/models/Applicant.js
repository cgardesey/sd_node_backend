class Applicant {
    static all(then) {
        return axios.get('/applications')
            .then(({data}) => then(data));
    }
}

export default Applicant;