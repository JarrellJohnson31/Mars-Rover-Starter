const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
// 7 tests here!
it("constructor sets position and default values for mode and generatorWatts", function() {
 let testRover = new Rover(24);
 expect(testRover.position).toBe(24);
 expect(testRover.mode).toBe("NORMAL");
 expect(testRover.generatorWatts).toBe(110);
});

it("response returned by receiveMessage contains the name of the message", function() {
message = new Message("inputName", [new Command("STATUS_CHECK")]);
expect(new Rover(24).receiveMessage(message).message).toBe("inputName");
});

it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  commandsList = [new Command("MODE_CHANGE","LOW_POWER"),new Command("STATUS_CHECK")];
  message = new Message("Test message with two commands", commandsList);
  response = new Rover(24).receiveMessage(message);
  expect(response.results.length).toBe(2);
});

it("responds correctly to the status check command", function(){
  message = new Message("name", [new Command("STATUS_CHECK")])
  response = new Rover(24).receiveMessage(message);
  expect(response.results[0].roverStatus.mode).toBe("NORMAL");
  expect(response.results[0].roverStatus.generatorWatts).toBe(110);
  expect(response.results[0].roverStatus.position).toBe(24);
});

it("responds correctly to the mode change command", function (){
  message = new Message("CHANGE MODE", [new Command("MODE_CHANGE", "LOW_POWER")]);
  rover = new Rover(24);
  response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(rover.mode).toBe("LOW_POWER");
});

it("responds with a false completed value when attempting to move in LOW_POWER mode", function (){
  message = new Message("Low Power Mode", [new Command("MOVE", 1000)]);
  rover = new Rover(24);
  rover.mode = "LOW_POWER";
  response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(false);
  expect(rover.position).toBe(24);
});

it("responds with the position for the move command", function(){
  message = new Message("Low Power Mode", [new Command("MOVE", 1000)]);
  rover = new Rover(24);
  response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(rover.position).toBe(1000);
});
});
