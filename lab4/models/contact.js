const fs = require('fs');
const uuid = require('uuid');
const contacts = require('../contacts.json') || [];

class Contact {

    static getContacts = async () => await contacts; 

    static getContactById = async(id) => {
        const contact = await contacts.find(c => c.id === id);
        return contact ? contact : "contact not found";
    }

    static saveChangesToFile = async() => {
        await fs.promises.writeFile('./contacts.json', JSON.stringify(contacts, null, 4));
    }

    static addContact = async(contact) => {
        const newContact = {
            id: uuid.v4(),
            name: contact.name,
            phone: contact.phone
        }
        contacts.push(newContact);
        await this.saveChangesToFile();
        return newContact;
    }

    static deleteContact = async(id) => {
        const contactIdx = contacts.findIndex(c => c.id === id);
        if(contactIdx !== -1){
            contacts.splice(contactIdx, 1);
        }
        await this.saveChangesToFile();
        return contacts;
    }

    static editContact = async(id, contact) => {
        const cont = contacts.find(c => c.id === id);
        if(cont){
            cont.name = contact.name, 
            cont.phone = contact.phone
        }
        await this.saveChangesToFile();
        return contacts;
    }
}

module.exports = Contact;