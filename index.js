const argv = require("yargs").argv

const contactsOperations = require("./contacts")

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsOperations.listContacts()
      console.table(allContacts)
      break

    case "get":
      const oneContact = await contactsOperations.getContactById(id)
      console.log(oneContact)
      break

    case "add":
      const addNewContact = await contactsOperations.addContact(
        name,
        email,
        phone
      )
      console.table(addNewContact)
      break

    case "remove":
      const removeContact = await contactsOperations.removeContact(id)
      console.table(removeContact)
      break

    default:
      console.warn("\x1B[31m Unknown action type!")
  }
}

invokeAction(argv)

// (1-й вариант)
// (async () => {
//     const allContacts = await contactsOperations.listContacts()
//     console.log(allContacts)

//     const oneContact = await contactsOperations.getContactById(3)
//     console.log(oneContact)

//   const removeContact = await contactsOperations.removeContact(4);
//   console.log(removeContact);

//   const addNewContact = await contactsOperations.addContact(
//     "Wylie Pope",
//     "est@utquamvel.net",
//     "(692) 802-2949"
//   )
//   console.log(addNewContact)
// })()
