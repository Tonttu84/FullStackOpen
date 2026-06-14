import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const testApi = async () => {
  try {
    console.log('--- TEST: GET ALL ---')
    const all = await axios.get(baseUrl)
    console.log(all.data)

    console.log('\n--- TEST: CREATE ---')
    const newPerson = {
      name: 'Test User',
      number: '123-456'
    }

    const created = await axios.post(baseUrl, newPerson)
    console.log(created.data)

    const id = created.data.id || created.data._id

    console.log('\n--- TEST: GET BY ID ---')
    const single = await axios.get(`${baseUrl}/${id}`)
    console.log(single.data)

    console.log('\n--- TEST: UPDATE ---')
    const updated = await axios.put(`${baseUrl}/${id}`, {
      ...single.data,
      number: '999-999'
    })
    console.log(updated.data)

    console.log('\n--- TEST: GET INFO ---')
    const info = await axios.get(`${baseUrl}/info`)
    console.log(info.data)

    console.log('\n--- TEST: DELETE ---')
    await axios.delete(`${baseUrl}/${id}`)
    console.log('Deleted successfully')

    console.log('\n--- TEST COMPLETE ---')

  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data)
    } else {
      console.error('Error:', error.message)
    }
  }
}

testApi()