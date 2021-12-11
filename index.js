const { program } = require("commander");
const contactsOperations = require('./contacts');

program
  .option("-a, --action <type>", "action type")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone")

program.parse(process.argv);
const options = program.opts();


const invokeAction = async ( {action, id, name, email, phone}) => {
  switch (action) {
    case 'list':
          const contacts = await contactsOperations.listContacts();
          console.table(contacts);
      break;

    case 'get':
          const contact = await contactsOperations.getContactById(id);
          console.log(contact);
      break;

    case 'add':
      const newContact = await contactsOperations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);