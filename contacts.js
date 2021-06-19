const { v4 } = require("uuid")
const path = require("path")
const fs = require("fs").promises

const contactsPath = path.join(__dirname, "db", "contacts.json")

// // TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const file = await fs.readFile(contactsPath)
    const data = JSON.parse(file)
    return data
  } catch (error) {
    throw error
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contact = contacts.find((item) => item.id === contactId)
    return contact
  } catch (error) {
    throw error
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const newContacts = contacts.filter((item) => item.id !== contactId)
    const contactsStr = JSON.stringify(newContacts)
    await fs.writeFile(contactsPath, contactsStr)
    return newContacts
  } catch (error) {
    throw error
  }
}

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    }

    const contacts = await listContacts()
    const newContacts = [...contacts, newContact]
    const contactStr = JSON.stringify(newContacts)
    await fs.writeFile(contactsPath, contactStr)
    return newContacts
  } catch (error) {
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
