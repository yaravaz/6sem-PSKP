const Sequelize = require('sequelize');
const sequelize = new Sequelize('VYR', 'myuser', 'myuser1234', {
    host: 'localhost',
    dialect: 'mssql'
});
const {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium} = require('./18-01m').ORM(sequelize);    

class DB {
    connection = sequelize.authenticate();
    
    getFaculties = () => {return this.connection.then(() => Faculty.findAll());}
    getPulpits = () => {return this.connection.then(() => Pulpit.findAll());}
    getSubjects = () => {return this.connection.then(() => Subject.findAll());}
    getAuditoriumstypes = () => {return this.connection.then(() => Auditorium_type.findAll());}
    getAuditoriums = () => {return this.connection.then(() => Auditorium.findAll());}

    //--------------------------------

    insertFaculty = (faculty, facultyName) => {
        return this.connection.then(() => Faculty.create({faculty:faculty, faculty_name:facultyName}));
    }
    insertPulpit = (pulpit, pulpitName, faculty) => {
        return this.connection.then(() => Pulpit.create({pulpit:pulpit, pulpit_name:pulpitName, faculty:faculty}));
    }
    insertSubject = (subject, subjectName, pulpit) => {
        return this.connection.then(() => Subject.create({subject:subject, subject_name:subjectName, pulpit:pulpit}));
    }
    insertAuditoriumtype = (auditoriumtype, auditoriumtypeName) => {
        return this.connection.then(() => Auditorium_type.create({auditorium_type:auditoriumtype, auditorium_typename:auditoriumtypeName}));
    }
    insertAuditorium = (auditorium, auditoriumName, capasity, auditoriumtype) => {
        return this.connection.then(() => Auditorium.create({auditorium:auditorium, auditorium_name:auditoriumName, auditorium_capacity:capasity, auditorium_type:auditoriumtype}));
    }

    //-------------------------------

    updateFaculty = async(faculty, facultyName) => {
        let facult = await this.connection.then(() => Faculty.findByPk(faculty));
        if(facult === null){
            throw new Error('faculty is not found');
        }
        return this.connection.then(() => {
            Faculty.update({faculty_name:facultyName}, {where: {faculty: faculty}})
        })
    }
    updatePulpit = async(pulpit, pulpitName, faculty) => {
        let pul = await this.connection.then(() => Pulpit.findByPk(pulpit));
        if(pul === null){
            throw new Error('pulpit is not found');
        }

        const facultyExists = await Faculty.findOne({ where: { faculty } });
        if (!facultyExists) {
            throw new Error('Faculty does not exist');
        }

        return this.connection.then(() => {
            Pulpit.update({pulpit_name:pulpitName, faculty: faculty}, {where:{pulpit:pulpit}})
        })
    }
    updateSubject = async(subject, subjectName, pulpit) => {
        let subj = await this.connection.then(() => Subject.findByPk(subject));

        if(subj === subject){
            throw new Error('subject is not found');
        }
        return this.connection.then(() => {
            Subject.update({subject_name:subjectName, pulpit: pulpit}, {where:{subject:subject}})
        })
    }
    updateAuditoriumtype = async (auditoriumtype, auditoriumtypeName) => {
        let auditoriumtyp = await this.connection.then(()=> Auditorium_type.findByPk(auditoriumtype));

        if(auditoriumtyp === null){
            throw new Error('auditoriumtype is not found');
        }
        return this.connection.then(() => {
            Auditorium_type.update({auditorium_typename:auditoriumtypeName}, {where:{auditorium_type:auditoriumtype}})
        })
    }
    updateAuditorium = async(auditorium, auditoriumName, capacity, auditoriumtype) => {
        let aud = await this.connection.then(()=> Auditorium.findByPk(auditorium));

        if(aud === null){
            throw new Error('auditorium is not found');
        }
        return this.connection.then(() => {
            Auditorium.update({auditorium_name:auditoriumName, capacity:capacity, auditorium_type:auditoriumtype}, {where:{auditorium:auditorium}})
        })
    }

    //-------------------------------

    deleteFaculty = async (faculty) => {
        let facult = await this.connection.then(() => Faculty.findByPk(faculty));
        
        if(facult === null){
            throw new Error('faculty is not found');
        }
        return this.connection.then(() => {Faculty.destroy({where: {faculty:faculty}})})
    }

    deletePulpit = async(pulpit) => {
        let pulp = await this.connection.then(()=> Pulpit.findByPk(pulpit));

        if(pulp === null){
            throw new Error('pulpit is not found');
        }
        return this.connection.then(() => {Pulpit.destroy({where: {pulpit:pulpit}})})
    }

    deleteSubject = async (subject) => {
        let subj = await this.connection.then(()=> Subject.findByPk(subject));

        if(subj === null){
            throw new Error('subject is not found');
        }
        return this.connection.then(() => {Subject.destroy({where:{subject:subject}})})
    }

    deleteAuditoriumtype = async (auditoriumtype) => {
        let auditoriumtyp = await this.connection.then(() => Auditorium_type.findByPk(auditoriumtype));

        if(auditoriumtyp === null){
            throw new Error('auditoriumtype is not found');
        }
        return this.connection.then(() => {Auditorium_type.destroy({where: {auditorium_type:auditoriumtype}})})
    }
    deleteAuditorium = async (auditorium) => {
        let aud = await this.connection.then(()=> Auditorium.findByPk(auditorium));
        if(aud === null){
            throw new Error('auditorium is not found');
        }
        return this.connection.then(() => {Auditorium.destroy({where: {auditorium:auditorium}})})
    }

}

exports.DB = DB;