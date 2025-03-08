const Contact = require('../models/contact.js');

class Controller {
    static async getAllContacts(req, res) {
        const contacts = await Contact.getContacts();
        res.render('contacts', { contacts });
    }

    static async addForm(req, res) {
        const contacts = await Contact.getContacts();
        res.render('addContact', { contacts });
    }

    static async addContact(req, res) {
        const name = req.body.name;
        const phone = req.body.phone;

        if(name && phone ){
            await Contact.addContact({name, phone})
            .then (result => res.json(result))
            .catch(msg => console.log(msg));
        }
        else{
            res.end('one or more field is empty');
        }
    }

    static async editForm(req, res) {
        const contacts = await Contact.getContacts();
        const contact = await Contact.getContactById(req.params['id']);
        res.render('editContact', {contacts:contacts, contact:contact});
    } 

    static async editContact(req, res) {
        const name = req.body.name;
        const phone = req.body.phone;
        const id = req.params['id'];

        if(name && phone && id){
            await Contact.editContact(id, {name, phone})
            .then (result => res.json(result))
            .catch(msg => console.log(msg));
        }
        else{
            res.end('one or more field is empty');
        }
    } 

    static async deleteContact(req, res){
        const id = req.params['id'];

        if(id){
            await Contact.deleteContact(id)
            .then (result => res.json(result))
            .catch(msg => console.log(msg));
        }
    }
}

module.exports = Controller;