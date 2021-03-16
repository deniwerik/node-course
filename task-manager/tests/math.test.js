const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('Should calculate total with tip', function() {
  const total = calculateTip(10, .3)
  expect(total).toBe(13)
});

test('Should calculate total with default tip', function() {
  const total = calculateTip(10)
  expect(total).toBe(12.5)
});

test('Should convert 32F to 0 C', function() {
  const tempCelcius = fahrenheitToCelsius(32)
  expect(tempCelcius).toBe(0)
});

test('Should convert 0 C to 32 F', function() {
  const tempFahrenheit = celsiusToFahrenheit(0)
  expect(tempFahrenheit).toBe(32)
});

/*test('async test demo', function(assert) {
  setTimeout(()=>{
    expect(1).toBe(2)
    assert()
  },2000)
});*/

test('Should add two numbers', function(assert) {
  add(2,3).then((sum)=>{
    expect(sum).toBe(5)
    assert()
  })
});

test('should add two numbers async await',  async function() {
  const sum = await add(10,22)
  expect(sum).toBe(32)
});