test('responds with the user', async () => {
  const response = await fetch('https://api.example.com/user')
 
  await expect(response.json()).resolves.toEqual({
    id: 'abc-123',
    firstName: 'John',
    lastName: 'Maverick',
  })
})