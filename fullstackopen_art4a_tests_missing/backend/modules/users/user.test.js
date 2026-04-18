
test('dummy', () => {
  expect(true).toBe(true)
})
// Also, implement tests that ensure invalid users are not created and that an invalid add user operation returns a suitable status code 
// and error message.

// NB if you decide to define tests on multiple files, you should note that by default each test file is executed in its own process
// (see Test execution model in the documentation). The consequence of this is that different test files are executed at the same time.
//  Since the tests share the same database, simultaneous execution may cause problems, which can be avoided by executing
//  the tests with the option --test-concurrency=1, i.e. defining them to be executed sequentially.